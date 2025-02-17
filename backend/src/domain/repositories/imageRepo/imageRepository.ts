import { IImageRepository } from './interface';
import { ImageDal } from '../../../infrastructure/dal/imageDal';
import { IImage } from '../../entities/IImage';

export class ImageRepository implements IImageRepository {
  private imageDal: ImageDal;

  constructor() {
    this.imageDal = new ImageDal();
  }

  async saveImage(newImage: IImage): Promise<IImage> {
    return this.imageDal.create(newImage);
  }

  async findImage(id: string): Promise<any> {}
}
