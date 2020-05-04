import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomLogger } from './3_shared/services/custom-logger.service';
import * as compression from 'compression';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new CustomLogger(),
  });
  app.use(compression());//compressao de dados para reduç~çao de tráfego
  await app.listen(3000);
}
bootstrap();