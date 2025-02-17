import ImageService from '../../../../src/domain/services/imageService';
import { ImageRepository } from '../../../../src/domain/repositories/imageRepo/imageRepository';
import CacheHelper from '../../../../src/infrastructure/utils/cacheHelper';
import { generateHash, writeFileAsync } from '../../../../src/infrastructure/utils/filesUtils';
import { Readable } from 'stream';
import { convertToSeconds } from '../../../../src/infrastructure/utils/utils';

jest.mock('../../../../src/infrastructure/utils/filesUtils', () => ({
  generateHash: jest.fn(),
  writeFileAsync: jest.fn()
}));

jest.mock('../../../../src/infrastructure/utils/cacheHelper', () => {
  const mockCacheInstance = {
    setValue: jest.fn(),
    getValue: jest.fn()
  };
  return {
    __esModule: true,
    default: jest.fn(() => mockCacheInstance)
  };
});

jest.mock('../../../../src/domain/repositories/imageRepo/imageRepository', () => {
  return {
    ImageRepository: jest.fn().mockImplementation(() => {
      return {
        saveImage: jest.fn().mockResolvedValue(true),
        findImage: jest.fn()
      };
    })
  };
});
describe('ImageService', () => {
  let imageService: ImageService;
  let mockImageRepository: jest.Mocked<ImageRepository>;
  let mockCache: jest.Mocked<CacheHelper>;

  beforeEach(() => {
    mockImageRepository = new ImageRepository() as jest.Mocked<ImageRepository>;

    mockCache = new CacheHelper({
      host: 'mock_host',
      port: 123
    }) as jest.Mocked<CacheHelper>;

    imageService = new ImageService(mockImageRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Save new image', () => {
    it('should save image and return correct URL', async () => {
      const mockFileStream = new Readable();
      const mockFolder = '/uploads';
      const mockOriginalName = 'image.png';
      const mockFileType = 'png';
      const mockRetention = '30';
      const mockNewFileId = '1234567890abcdef';
      const expectedUrl = `${process.env.HOST}/api/v1/image/${mockNewFileId}`;

      (generateHash as jest.Mock).mockReturnValue(mockNewFileId);

      (writeFileAsync as jest.Mock).mockResolvedValue(undefined);

      const mockImage = {
        fileId: mockNewFileId,
        fileName: mockOriginalName,
        retention: convertToSeconds(mockRetention)
      };

      mockImageRepository.saveImage.mockResolvedValue(mockImage);

      mockCache.setValue.mockResolvedValue(undefined);

      const result = await imageService.saveImage(
        mockFileStream,
        mockFolder,
        mockOriginalName,
        mockFileType,
        convertToSeconds(mockRetention)
      );

      expect(writeFileAsync).toHaveBeenCalledWith(mockFileStream, `${mockNewFileId}.${mockFileType}`, mockFolder);
      expect(mockImageRepository.saveImage).toHaveBeenCalledWith({
        fileId: mockNewFileId,
        fileName: mockOriginalName,
        retention: Number(convertToSeconds(mockRetention))
      });
      expect(mockCache.setValue).toHaveBeenCalledWith(
        mockNewFileId,
        JSON.stringify({
          filePath: `${mockFolder}/${mockNewFileId}.${mockFileType}`,
          fileType: mockFileType
        }),
        convertToSeconds(mockRetention.toString())
      );
      expect(result).toBe(expectedUrl);
    });
  });

  describe('getImage', () => {
    it('should return the image if it is valid', async () => {
      const fileId = 'mockFileId';
      const mockFile = {
        filePath: 'uploads/images/mockFileId.jpg',
        fileType: 'jpg'
      };

      mockCache.getValue.mockResolvedValue(mockFile);

      const result = await imageService.getImage(fileId);

      expect(mockCache.getValue).toHaveBeenCalledWith(fileId);
      expect(result).toEqual(mockFile);
    });

    it('should return null if the image is not valid', async () => {
      const fileId = 'invalidFileId';

      mockCache.getValue.mockResolvedValue(null);

      const result = await imageService.getImage(fileId);

      expect(mockCache.getValue).toHaveBeenCalledWith(fileId);
      expect(result).toBeNull();
    });
  });
});
