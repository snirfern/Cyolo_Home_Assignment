import fs from 'fs';
import path from 'path';
import {Readable} from 'stream';
import crypto from 'crypto';
import {Response} from 'express';
import logger from '../logger/logger';
import {InvalidFile} from '../../domain/errrors/errors';

const writeFileAsync = async (fileStream: Readable, fileName: string, folder: string): Promise<void> => {
    const targetPath = path.join(folder, fileName);
    await fs.promises.mkdir(folder, {recursive: true});

    const writeStream = fs.createWriteStream(targetPath);

    return new Promise((resolve, reject) => {
        fileStream
            .pipe(writeStream)
            .on('finish', () => resolve())
            .on('error', (error: any) => {
                logger.info(`Write stream error:\n${error}`)
                reject()
            });
    });
};

const getFileStreamFromDisk = async (filePath: string): Promise<fs.ReadStream | null> => {
    try {
        await fs.promises.access(filePath, fs.constants.F_OK);
        return fs.createReadStream(filePath);
    } catch (error) {
        logger.error('Error fetching file:\n' + (error as Error).message);
        return null;
    }
};

const serveFileToClient = async (filePath: string, fileType: string, res: Response) => {
    const fileStream = await getFileStreamFromDisk(filePath);
    if (!fileStream) {
        throw new InvalidFile('File not found');
    }
    res.contentType(`image/${fileType}`);
    fileStream.pipe(res);
    return;
};

const generateHash = (str: string, length: number = 32): string => {
    return crypto.createHash('md5').update(str).digest('hex').slice(0, length);
};
const extractFileType = (fileName: string): string => {
    return fileName.slice(fileName.lastIndexOf('.') + 1).toLowerCase();
}
export {writeFileAsync, generateHash, serveFileToClient, extractFileType};
