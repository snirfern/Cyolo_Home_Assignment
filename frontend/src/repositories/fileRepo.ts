import ApiGateway from '../api/ApiGateway';

class FileRepository {
    private apiGateway: ApiGateway;

    constructor() {
        this.apiGateway = new ApiGateway(`${process.env.REACT_APP_API_URL}/api`);
    }

    async uploadFile(file: File, expiration: number): Promise<string> {
        const formData = new FormData();
        formData.append('file', file);

        return await this.apiGateway.put<string>(
            `/v1/saveImage/${file.name}`,
            formData,
            {retention: expiration},
            {ContentType: 'multipart/form-data'}
        );
    }
}

export default FileRepository;
