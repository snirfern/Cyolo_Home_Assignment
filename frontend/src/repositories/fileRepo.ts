import ApiGateway from '../api/ApiGateway';

class FileRepository {
  private apiGateway: ApiGateway;

  constructor() {
    this.apiGateway = new ApiGateway(`${process.env.REACT_APP_API_URL}/api`);
  }

  async uploadFile(file: File, expiration: number): Promise<any> {
    const formData = new FormData();
    formData.append('retention', expiration.toString());
    formData.append('fileType', file.type.split('/')[1]);
    formData.append('fileName', file.name);
    formData.append('file', file);

    return await this.apiGateway.put(
      '/v1/saveImage',
      formData,
      {},
      { ContentType: 'multipart/form-data' }
    );
  }
}

export default FileRepository;
