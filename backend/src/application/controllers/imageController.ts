import { NextFunction, Request, Response } from 'express';
import ImageService from '../../domain/services/imageService';
import { Readable } from 'stream';
import path from 'path';
import logger from '../../infrastructure/logger/logger';
import { serveFileToClient } from '../../infrastructure/utils/filesUtils';
import { InvalidFile } from '../../domain/errrors/errors';
import { convertToSeconds } from '../../infrastructure/utils/utils';

const filesFolder = path.join(__dirname, '../../../uploads/images');

const Busboy = require('busboy');

export class ImageController {
  private imageService: ImageService;

  constructor(imageService: ImageService) {
    this.imageService = imageService;
  }

  async saveImage(req: Request, res: Response, next: NextFunction): Promise<void> {
    const busboy = new Busboy({ headers: req.headers });
    const fields: Record<string, string> = {};

    const onField = (fieldName: string, value: string) => {
      fields[fieldName] = value;
    };

    const onFile = async (fieldName: string, fileStream: Readable) => {
      try {
        const newFileLink = await this.imageService.saveImage(
          fileStream,
          filesFolder,
          fields.fileName,
          fields.fileType,
          convertToSeconds(fields.retention)
        );

        res.status(200).json(newFileLink);
      } catch (error) {
        logger.error(`Failed to save new image with the following error:\n${(error as Error).message}`);
        next(error);
      }
    };

    const onFinish = () => {
      logger.info(`File upload completed successfully. File name: ${fields.fileName}`);
    };

    busboy.on('field', onField);
    busboy.on('file', onFile);
    busboy.on('finish', onFinish);

    req.pipe(busboy);
  }

  async getImage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const file = await this.imageService.getImage(req.params.id);
      if (!file) {
        throw new InvalidFile(`file id ${req.params.id} is invalid`);
      }

      await serveFileToClient(file.filePath, file.fileType, res);
    } catch (error) {
      logger.error(`Requested image is not available: ${(error as Error).message}`);
      next(error);
    }
  }
}
