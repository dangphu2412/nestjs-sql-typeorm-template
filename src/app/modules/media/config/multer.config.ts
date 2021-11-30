import { Injectable, UnsupportedMediaTypeException } from '@nestjs/common';
import {
  MulterOptionsFactory,
  MulterModuleOptions,
} from '@nestjs/platform-express';
import { extname } from 'path';
import { ALLOW_MIMETYPE, UPLOAD_DIR } from '../constants';

@Injectable()
export class MulterConfig implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    return {
      dest: UPLOAD_DIR,
      fileFilter: (req, file, cb) => {
        if (file.mimetype.match(ALLOW_MIMETYPE)) {
          return cb(null, true);
        }
        return cb(
          new UnsupportedMediaTypeException(
            `Unsupported file type ${extname(file.originalname)}`,
          ),
          false,
        );
      },
      // Other options
    };
  }
}
