import { Injectable, HttpException } from '@nestjs/common';
import { CatRequestDto } from '../dto/cats.request.dto';
import * as bcrypt from 'bcrypt';
import { CatsRepository } from '../cats.repository';
import { Cat } from '../cats.schema';

@Injectable()
export class CatsService {
  // constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}
  constructor(private readonly catsRepository: CatsRepository) {}

  async getAllCat() {
    const allCat = await this.catsRepository.findAll();
    const readOnlyCats = allCat.map((cat) => cat.readOnlyData);
    return readOnlyCats;
  }
  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;
    // 유효성 검사
    const isCatExist = await this.catsRepository.existsByEmail(email);

    if (isCatExist) {
      throw new HttpException('이미 존재하는 고양이 입니다.', 403);
    }
    // password 암호화
    const hashedPassword = await bcrypt.hash(password, 10); // password hash

    // db에 저장
    const cat = await this.catsRepository.create({
      email,
      name,
      password: hashedPassword,
    });
    return cat.readOnlyData; // virtual field를 통해 프론트로 필요한 데이터만 전송
  }
  async uploadImg(cat: Cat, files: Express.Multer.File[]) {
    const fileName = `cats/${files[0].filename}`;

    const newCat = await this.catsRepository.findByIdAndUpdateImg(
      cat.id,
      fileName,
    );
    return newCat;
  }
}
