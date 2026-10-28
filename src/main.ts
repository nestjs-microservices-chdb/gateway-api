import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module.js';
import { RpcCustomExceptionFilter } from './common/index.js';

import { envs } from './config/index.js';

async function bootstrap() {

  const logger = new Logger('Main-gateway');

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  app.useGlobalFilters(new RpcCustomExceptionFilter());

  app.setGlobalPrefix('api');

  await app.listen(envs.port ?? 3000);

  logger.log(`Server running on port ${envs.port ?? 3000}`);
}
await bootstrap();
