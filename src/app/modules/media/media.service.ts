import {
  BadGatewayException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { UploadApiResponse } from 'cloudinary';
import { CloudinaryProvider } from './providers/cloudinary.provider';
import { unlink } from 'fs/promises';
import { toSecuredUrls } from './mapper/media.mapper';
@Injectable()
export class MediaService {
  private logger: Logger;

  constructor(private cloudinaryProvider: CloudinaryProvider) {
    this.logger = new Logger(MediaService.name);
  }

  public async uploadImages(files: Array<Express.Multer.File>) {
    const uploadProcess = this.getUploadProcess(files);

    let uploadedResults: UploadApiResponse[];
    try {
      uploadedResults = await uploadProcess;
    } catch (error) {
      this.logger.error(error);
      await this.handleUploadErrorProcess(error, files);
    }

    return toSecuredUrls(uploadedResults);
  }

  private getUploadProcess(files: Array<Express.Multer.File>) {
    return Promise.all(
      files.map((file) => {
        return this.cloudinaryProvider.uploadByFilename(file.path);
      }),
    );
  }

  private cleanupProcess(files: Array<Express.Multer.File>) {
    return Promise.all(
      files.map((file) => {
        return unlink(file.path);
      }),
    );
  }

  private async handleUploadErrorProcess(
    error,
    files: Array<Express.Multer.File>,
  ) {
    await this.cleanupProcess(files);
    if (error.http_code === HttpStatus.UNAUTHORIZED) {
      throw new InternalServerErrorException(
        'Server got wrong config cloudinary',
      );
    } else {
      throw new BadGatewayException(
        'Upload process failed due to cloudinary provider got problem',
      );
    }
  }
}
