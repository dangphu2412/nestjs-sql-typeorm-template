import { ConfigService } from '@external/config/config.service';
import { Injectable } from '@nestjs/common';
import aws, { S3 } from 'aws-sdk';

@Injectable()
export class S3Provider {
  private provider: S3;
  private bucketName: string;
  private urlExpires: number;

  constructor() {
    aws.config.update({
      accessKeyId: ConfigService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: ConfigService.get('AWS_SECRET_ACCESS_KEY'),
      region: ConfigService.get('AWS_REGION'),
    });
    this.bucketName = ConfigService.get('AWS_BUCKET_NAME');
    this.urlExpires = ConfigService.getInt('AWS_EXPIRES');
    this.provider = new aws.S3();
  }

  public getSignedUrl(key: string, type: string) {
    return this.provider.getSignedUrlPromise('putObject', {
      Bucket: this.bucketName,
      Key: key,
      ContentType: type,
      ACL: 'public-read',
      Expires: this.urlExpires,
    });
  }
}
