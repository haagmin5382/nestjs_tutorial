import { CatsService } from './cats/cats.service';
import { Body, Controller, Get, Param, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // controller의 목적은 애플리케이션의 요청을 수신하는 것
  // AppController는 소비자
  // AppService는 제품으로 공급자(provider)로 취급될 수 있다. 공급자는 종속성으로 주입될 수 있다.
  constructor(
    private readonly appService: AppService,
    private readonly catsService: CatsService,
  ) {}

  @Get()
  getHello(): string {
    return this.catsService.hiCatSeviceProduct();
  }
}
