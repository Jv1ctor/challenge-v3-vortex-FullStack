import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const configService = app.get(ConfigService);

  const port = configService.get<number>('PORT', 3000);
  const urlWeb = configService.get<string>('URL_WEB');

  app.enableCors({
    origin: urlWeb ? urlWeb.split(',') : [],
    credentials: true,
  });
  await app.listen(port, '0.0.0.0');
}
bootstrap();
