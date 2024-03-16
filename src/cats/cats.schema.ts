import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

const options: SchemaOptions = {
  timestamps: true, // createdAt, updatedAt 자동 생성
};
@Schema(options) // schema 데코레이션으로 스키마 정의
export class Cat extends Document {
  @ApiProperty({
    example: 'cheesecat@catmail.com',
    description: 'email',
    required: true,
  })
  @Prop({
    required: true, // 꼭 필요, default는 false
    unique: true, // 유니크 해야함
  })
  @IsEmail() //  class-validator
  @IsNotEmpty() //  class-validator
  email: string;

  @ApiProperty({
    example: 'cheese',
    description: 'name',
    required: true,
  })
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'your_password',
  })
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop()
  @IsString()
  imgUrl: string;

  readonly readOnlyData: { id: string; email: string; name: string };
}

export const CatSchema = SchemaFactory.createForClass(Cat);

CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
  };
});
