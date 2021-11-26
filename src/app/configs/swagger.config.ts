import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function configSwagger(app: INestApplication, documentPath: string) {
  const initialDocument = new DocumentBuilder()
    .setTitle('Dsc dut API')
    .setDescription('Dsc dut API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, initialDocument);
  SwaggerModule.setup(documentPath, app, document);
}
