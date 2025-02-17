interface Image {}

export interface IImageRepository {
  saveImage(image: Image): Promise<any>;

  findImage(image: Image): Promise<any>;
}
