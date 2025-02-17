import { IBaseDal } from './interface';
import ImageModel from '../framework/db/models/Image';
import { IImage } from '../../domain/entities/IImage';

export class ImageDal implements IBaseDal<IImage, IImage> {
  async create(newImage: Omit<IImage, 'id'>): Promise<IImage> {
    return (await ImageModel.create(newImage)) as IImage;
  }

  async findByField(field: string, value: string): Promise<IImage | null> {
    return (await ImageModel.findOne({
      where: { [field]: value },
      rejectOnEmpty: false
    })) as IImage;
  }
}

export default ImageDal;
