import { getCorsConfig } from '@config/cors.config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from 'src/external/config/config.service';
import { AppModule } from './app.module';
import { configSwagger } from './configs/swagger.config';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = ConfigService.getInt('PORT') ?? 3000;

  app.enableCors(getCorsConfig());
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());

  configSwagger(app, 'docs');

  await app.listen(PORT);

  Logger.log(
    `Server is in ${ConfigService.get('NODE_ENV')} mode`,
    'NestApplication',
  );
  Logger.log(`Server is listening on ${PORT}`, 'NestApplication');
}

bootstrap();
