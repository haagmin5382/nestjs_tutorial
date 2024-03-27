import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // NestExpressApplication으로 nest뿐만 아니라 express의 모듈도 사용한다.
  app.useGlobalPipes(new ValidationPipe()); // class validation 등록
  app.useGlobalFilters(new HttpExceptionFilter()); // global filter 사용
  app.use(
    ['/docs', '/docs-json'],
    expressBasicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
      },
    }),
  ); // swagger에 아무나 접근하면 안되기 때문에 암호를 걸어둔다.

  const config = new DocumentBuilder()
    .setTitle('C.I.C')
    .setDescription('cat')
    .setVersion('1.0.0')
    .build(); // swagger 설정

  app.useStaticAssets(path.join(__dirname, './common', 'uploads'), {
    prefix: '/media',
  }); // express의 파일 업로드 기능을 사용한다. NestFactory에 NestExpressApplication를 작성한 이유다.

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
