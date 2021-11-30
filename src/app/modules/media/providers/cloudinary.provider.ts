import { ConfigService } from '@external/config/config.service';
import { Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary';
import { DEFAULT_CLOUDINARY_FOLDER } from '../constants';

@Injectable()
export class CloudinaryProvider {
  private provider: typeof v2.uploader;

  constructor() {
    v2.config({
      cloud_name: ConfigService.get('CLOUDINARY_NAME'),
      api_key: ConfigService.get('CLOUDINARY_API_KEY'),
      api_secret: ConfigService.get('CLOUDINARY_SECRET'),
      secure: true,
    });
    this.provider = v2.uploader;
  }

  public uploadByFilename(
    filename: string,
    folder = DEFAULT_CLOUDINARY_FOLDER,
  ) {
    return this.provider.upload(filename, { folder });
  }
}
