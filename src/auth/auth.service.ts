import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatsRepository } from 'src/cats/cats.repository';
import { LoginRequestDto } from './dto/login.request.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly catsRepository: CatsRepository, // cat 데이터베이스를 사용해야하기 때문에 종속성 주입을 한다.
    private jwtService: JwtService, // jwtService를 인젝션 받는다. (auth.module에서 JwtModule에서 제공해주는 공급자)
  ) {}
  async jwtLogIn(data: LoginRequestDto) {
    const { email, password } = data;

    // 해당하는 이메일이 있는지
    const cat = await this.catsRepository.findCatByEmail(email);

    if (!cat) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요');
    }

    // password가 일치하는지
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      cat.password,
    );

    if (!isPasswordValidated) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요');
    }

    const payload = { email: email, sub: cat.id }; // sub는 토큰 제목

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
