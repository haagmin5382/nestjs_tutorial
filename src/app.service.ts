import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    // business logic

    return 'Hello World!'; // res.send() 없이 return으로 가능
  }
}
