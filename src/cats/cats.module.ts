import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsController } from './cats.controller';
import { Cat, CatSchema } from './cats.schema';
import { CatsService } from './cats.service';
import { CatsRepository } from './cats.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
    forwardRef(() => AuthModule), // 순환 모듈 문제 (CatsModule에서 AuthModule imports, AuthModule에서 CatsModule imports)
  ], // schema 등록
  controllers: [CatsController],
  providers: [CatsService, CatsRepository],
  exports: [CatsService, CatsRepository],
  // exports => 외부 모듈에서 사용할 수 있게함, provider는 캡슐화되어있기 때문에 다른 모듈에서 공개적으로 사용할 수 있게 하려면 export에다 넣어야한다.
})
export class CatsModule {}
