import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};
@Schema(options) // schema 데코레이션으로 스키마 정의
export class Cat extends Document {
  @Prop({
    required: true, // 꼭 필요, default는 false
    unique: true, // 유니크 해야함
  })
  @IsEmail() //  class-validator
  @IsNotEmpty() //  class-validator
  email: string;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop()
  @IsString()
  imgUrl: string;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
