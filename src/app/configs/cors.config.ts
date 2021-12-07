import { ConfigService } from '@external/config/config.service';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export function getCorsConfig(): CorsOptions {
  const allowOrigins: string[] | string = ConfigService.getOptional('CORS')
    ? ConfigService.getOptional('CORS').split(',')
    : '*';

  return {
    origin: allowOrigins,
  };
}
