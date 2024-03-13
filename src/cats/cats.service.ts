import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './cats.schema';
import { CatRequestDto } from './dto/cats.request.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}
  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;
    // 유효성 검사
    const isCatExist = await this.catModel.exists({ email });

    if (isCatExist) {
      throw new HttpException('이미 존재하는 고양이 입니다.', 403);
    }
    // password 암호화
    const hashedPassword = await bcrypt.hash(password, 10); // password hash

    // db에 저장
    const cat = await this.catModel.create({
      email,
      name,
      password: hashedPassword,
    });
    return cat.readOnlyData; // virtual field를 통해 프론트로 필요한 데이터만 전송
  }
}
