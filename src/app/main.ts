import { getCorsConfig } from '@config/cors.config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from 'src/external/config/config.service';
import { AppModule } from './app.module';
import { configSwagger } from './configs/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = ConfigService.getInt('PORT') ?? 3000;

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors(getCorsConfig());

  configSwagger(app, 'docs');

  await app.listen(PORT);

  Logger.log(
    `Server is in ${ConfigService.get('NODE_ENV')} mode`,
    'NestApplication',
  );
  Logger.log(`Server is listening on ${PORT}`, 'NestApplication');
}

bootstrap();
