import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Header의 token에서 추출
      secretOrKey: 'secret', // key, 유출되면 안됨, AuthModule의 JwtModule.register의 secret와 맞춰줘야한다.
      igonoreExpiration: false, // 만료되는 기간
    });
  }
  // async validate(payload) {}
}
