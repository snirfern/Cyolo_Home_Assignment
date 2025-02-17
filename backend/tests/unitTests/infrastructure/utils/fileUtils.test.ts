import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';
import { Response } from 'express';
import { generateHash, serveFileToClient, writeFileAsync } from '../../../../src/infrastructure/utils/filesUtils';
import { InvalidFile } from '../../../../src/domain/errrors/errors';

const TEST_DIR = path.join(__dirname, 'test-files');

beforeAll(() => {
  fs.mkdirSync(TEST_DIR, { recursive: true });
});

describe('File Utils', () => {
  it('should write a file successfully', async () => {
    const filePath = path.join(TEST_DIR, 'test.txt');
    const testContent = 'Hello, world!';
    const stream = Readable.from([testContent]);

    await writeFileAsync(stream, 'test.txt', TEST_DIR);
    expect(fs.existsSync(filePath)).toBe(true);

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    expect(fileContent).toBe(testContent);
  });

  it('should serve a file successfully', async () => {});
  it('should throw InvalidFile error if file is not found', async () => {
    const mockResponse: Partial<Response> = {
      contentType: jest.fn(),
      pipe: jest.fn()
    };

    await expect(serveFileToClient('nonexistent.png', 'png', mockResponse as Response)).rejects.toThrow(InvalidFile);
  });
  it('should generate a hash of a string', () => {
    const hash = generateHash('test123', 16);
    expect(hash).toHaveLength(16);
  });
});
