import { NextFunction, Request, Response } from 'express';
import ImageService from '../../../../src/domain/services/imageService';
import { ImageController } from '../../../../src/application/controllers/imageController';
import { serveFileToClient } from '../../../../src/infrastructure/utils/filesUtils';
import { InvalidFile } from '../../../../src/domain/errrors/errors';

jest.mock('../../../../src/infrastructure/utils/filesUtils', () => ({
  serveFileToClient: jest.fn()
}));
describe('ImageController', () => {
  let mockImageService: jest.Mocked<ImageService>;
  let imageController: ImageController;
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockImageService = {
      saveImage: jest.fn(),
      getImage: jest.fn()
    } as unknown as jest.Mocked<ImageService>;

    imageController = new ImageController(mockImageService);

    mockReq = {
      params: { id: '123' },
      headers: { 'content-type': 'multipart/form-data' },
      pipe: jest.fn()
    };

    mockRes = {
      json: jest.fn()
    };

    mockNext = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('saveImage', () => {
    it('should save image successfully', async () => {});
  });
  describe('getImage', () => {
    it('should serve the image if valid', async () => {
      const mockFile = {
        filePath: '/uploads/image.jpg',
        fileType: 'image/jpeg'
      };
      mockImageService.getImage.mockResolvedValue(mockFile);

      await imageController.getImage(mockReq as Request, mockRes as Response, mockNext);

      expect(mockImageService.getImage).toHaveBeenCalledWith('123');
      expect(serveFileToClient).toHaveBeenCalledWith(mockFile.filePath, mockFile.fileType, mockRes);
    });

    it('should handle invalid file and call next with error', async () => {
      const error = new InvalidFile('file id 123 is invalid');
      mockImageService.getImage.mockResolvedValue(null);

      await imageController.getImage(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });
});
