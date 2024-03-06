import { HttpExceptionFilter } from 'src/http-exception.filter';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter()); // global filter 사용
  await app.listen(8000);
}
bootstrap();
