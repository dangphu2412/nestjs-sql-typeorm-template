import { ConfigService } from '@external/config/config.service';
import { Injectable } from '@nestjs/common';
import aws from 'aws-sdk';

@Injectable()
export class S3Provider {
  private provider;
  private bucketName: string;
  private expirations: number;

  constructor() {
    aws.config.update({
      accessKeyId: ConfigService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: ConfigService.get('AWS_SECRET_ACCESS_KEY'),
      region: ConfigService.get('AWS_REGION'),
    });
    this.bucketName = ConfigService.get('AWS_BUCKET_NAME');
    this.expirations = ConfigService.getInt('AWS_EXPIRATIONS');
    this.provider = new aws.S3();
  }
}
