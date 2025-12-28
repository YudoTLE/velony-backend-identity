import { Global, Module } from '@nestjs/common';

import { S3ImageService } from './s3-image.service';
import { S3Service } from './s3.service';

@Global()
@Module({
  providers: [S3Service, S3ImageService],
  exports: [S3Service, S3ImageService],
})
export class S3Module {}
