import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // allows nestjs to strip all properties sent in a request
  // that was now allowed via decorators
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // for security
    }),
  );
  await app.listen(process.env.PORT);
}
bootstrap();
