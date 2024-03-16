import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // class validation 등록
  app.useGlobalFilters(new HttpExceptionFilter()); // global filter 사용
  const config = new DocumentBuilder()
    .setTitle('C.I.C')
    .setDescription('cat')
    .setVersion('1.0.0')
    .build(); // swagger 설정

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config); // swagger 생성
  SwaggerModule.setup('docs', app, document); // swagger 등록

  // cors error 해결
  app.enableCors({
    origin: true, // 모든 주소에서 요청을 보낼 수 있기 때문에 개발이 끝나면 url으로 작성한다.
    credentials: true,
  });

  const PORT = process.env.PORT;
  await app.listen(PORT);
}
bootstrap();
