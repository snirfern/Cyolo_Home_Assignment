import {ImageRepository} from '../repositories/imageRepo/imageRepository';
import {generateHash, writeFileAsync} from '../../infrastructure/utils/filesUtils';
import CacheHelper from '../../infrastructure/utils/cacheHelper';
import config from '../../config/config';
import {Readable} from 'stream';
import {IImage} from '../entities/IImage';
import path from "path";

export interface File {
    filePath: string;
    fileType: string;
}

class ImageService {
    private imageRepository: ImageRepository;
    private cache: CacheHelper;

    constructor(imageRepository: ImageRepository) {
        this.imageRepository = imageRepository;
        this.cache = new CacheHelper(config.dataSources.redis.dbConfig);
    }

    async saveImage(
        fileStream: Readable,
        folder: string,
        originalName: string,
        fileType: string,
        retention: number = 60
    ): Promise<string> {

        const newFileId = generateHash(process.env.HOST + new Date().valueOf().toString(), 20);
        await writeFileAsync(fileStream, newFileId + '.' + fileType, folder);

        const newImage: IImage = {
            fileId: newFileId,
            fileName: originalName,
            retention: retention
        };

        await this.imageRepository.saveImage(newImage);
        const newValue = JSON.stringify({
            filePath: path.join(folder, `${newFileId}.${fileType}`),
            fileType: fileType
        });
        await this.cache.setValue(newFileId, newValue, retention);
        return `${process.env.HOST}/api/v1/image/${newFileId}`;
    }

    async getImage(id: string): Promise<File | null> {
        return await this.cache.getValue<File>(id);
    }
}

export default ImageService;
