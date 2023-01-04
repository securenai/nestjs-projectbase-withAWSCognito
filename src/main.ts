import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

// for rendering html
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // allows nestjs to strip all properties sent in a request
  // that was now allowed via decorators
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // for security
    }),
  );

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  await app.listen(process.env.PORT);
}

bootstrap();
