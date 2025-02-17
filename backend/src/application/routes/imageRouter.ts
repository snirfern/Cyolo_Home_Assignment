import { NextFunction, Request, Response, Router } from 'express';
import { ImageController } from '../controllers/imageController';
import ImageService from '../../domain/services/imageService';
import { ImageRepository } from '../../domain/repositories/imageRepo/imageRepository';

const imageRouter = Router();
const imageRepository = new ImageRepository();
const imageService = new ImageService(imageRepository);
const imageController = new ImageController(imageService);

imageRouter.put('/v1/saveImage', (req: Request, res: Response, next: NextFunction) =>
  imageController.saveImage(req, res, next)
);
imageRouter.get('/v1/image/:id', (req: Request, res: Response, next: NextFunction) =>
  imageController.getImage(req, res, next)
);

export default imageRouter;
