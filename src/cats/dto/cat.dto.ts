import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

export class ReadOnlyCatDto extends PickType(Cat, ['email', 'name'] as const) {
  // extends를 통해 class Cat의 속성들을 상속 받는다.
  // PickType을 통해 Cat이라는 class에서 필요한 부분만 가져올 수 있다.

  // Cat에 없는 id만 추가해서 작성했음
  @ApiProperty({
    example: '3214012',
    description: 'id',
  })
  id: string;
}
