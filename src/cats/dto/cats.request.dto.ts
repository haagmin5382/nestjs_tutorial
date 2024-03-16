import { PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

// export class CatRequestDto {
//   @ApiProperty({
//     example: 'cheesecat@catmail.com',
//   })
//   @IsEmail()
//   @IsNotEmpty()
//   email: string;

//   @ApiProperty({
//     example: 'your_password',
//   })
//   @IsString()
//   @IsNotEmpty()
//   password: string;

//   @ApiProperty({
//     example: 'cheese',
//   })
//   @IsString()
//   @IsNotEmpty()
//   name: string;
// } 재사용성 떨어짐

export class CatRequestDto extends PickType(Cat, [
  'email',
  'name',
  'password',
] as const) {
  // extends를 통해 class Cat의 속성들을 상속 받는다.
  // PickType을 통해 Cat이라는 class에서 필요한 부분만 가져올 수 있다.
}
