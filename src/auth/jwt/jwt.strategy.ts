import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Payload } from './jwt.payload';
import { CatsRepository } from 'src/cats/cats.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly catsRepository: CatsRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Header의 token에서 추출
      secretOrKey: 'secret', // key, 유출되면 안됨, AuthModule의 JwtModule.register의 secret와 맞춰줘야한다.
      igonoreExpiration: false, // 만료되는 기간
    }); // jwt에 대한 설정
  }
  async validate(payload: Payload) {
    const cat = await this.catsRepository.findCatByIdWithoutPassword(
      payload.sub,
    );
    if (cat) {
      return cat; // request.user
    } else {
      throw new UnauthorizedException('접근 오류');
    }
  }
}
