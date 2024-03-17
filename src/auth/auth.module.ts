import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { CatsModule } from 'src/cats/cats.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1y' },
    }),
    forwardRef(() => CatsModule), // 순환 모듈 문제 (CatsModule에서 AuthModule imports, AuthModule에서 CatsModule imports)
    // CatsModule, // providers에 집어넣지 않고 module자체를 import , cats module의 export 된 것을 사용할 수 있다.
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService], // cats.controller에서 사용해야하기 때문에 exports 해준다.
})
export class AuthModule {}
