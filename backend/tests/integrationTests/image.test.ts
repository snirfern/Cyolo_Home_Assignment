import request from 'supertest';
import express, {Express} from 'express';
import errorHandler from '../../src/application/middleware/errorHandler';
import imageRouter from '../../src/application/routes/imageRouter';
import FormData from 'form-data';
import {delay} from '../utils';

let app: Express;
beforeAll(async () => {
    app = express();
    app.use(express.json());
    app.use('/api', imageRouter);
    app.use(errorHandler);
});
const mockFileBuffer = Buffer.from('mock image data');

const formData = new FormData();

formData.append('file', mockFileBuffer, {
    filename: 'image.jpg',
    contentType: 'image/jpeg'
});
describe('Image Integration Tests', () => {
    it('should save image, get new image url,get image, check image expired after retention time', async () => {


        const saveFileResponse = await request(app)
            .put('/api/v1/saveImage/image.jpeg')
            .query({retention: 0.05})
            .set('Content-Type', `multipart/form-data; boundary=${formData.getBoundary()}`)
            .send(formData.getBuffer());

        expect(saveFileResponse.status).toBe(200);

        const newFileId = saveFileResponse.body.slice(35);

        const response = await request(app).get(`/api/v1/image/${newFileId}`).expect(200);

        expect(response.headers['content-type']).toBe('image/jpeg');
        expect(response.body).toBeDefined();

        await delay(5);

        await request(app).get(`/api/v1/image/${newFileId}`).expect(404);
    });


    it('should return 404 for invalid image ID', async () => {
        const response = await request(app).get('/api/v1/image/999').expect(404);

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('file id 999 is invalid');
    });
});
