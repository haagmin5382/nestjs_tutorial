import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  hiCatSeviceProduct() {
    return 'hello cat!';
  }
}
