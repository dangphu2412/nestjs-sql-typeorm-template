import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { MulterModule } from '@nestjs/platform-express/multer';
import { MulterConfig } from './config/multer.config';

@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: MulterConfig,
    }),
  ],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
