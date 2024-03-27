import {
  Body,
  UploadedFile,
  UploadedFiles,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Controller, Get, Post, Put } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { CatsService } from '../services/cats.service';
import { CatRequestDto } from '../dto/cats.request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyCatDto } from '../dto/cat.dto';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/utils/multer.options';
import { Cat } from '../cats.schema';

@Controller('cats')
@UseInterceptors(SuccessInterceptor) // api 요청 성공 시 작동
@UseFilters(HttpExceptionFilter) // api 요청 실패 시 작동
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService, // DI , cats.module에서 Authmodule을 import 해야 사용가능
  ) {}

  @ApiOperation({ summary: '현재 고양이 가져오기' }) // swagger 요약
  @ApiResponse({
    status: 500,
    description: 'Server Error',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @UseGuards(JwtAuthGuard) // jwtAuthGuard 사용(guard를 만나 인증처리)
  @Get()
  // getCurrentCat(@Req() req) {
  //   return req.user;
  // }
  getCurrentCat(@CurrentUser() cat) {
    return cat.readOnlyData; // === req.user (custom decorator)
  }

  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({
    status: 500,
    description: 'Server Error',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: ReadOnlyCatDto, // response로 성공했을 때 받을 값
  })
  @Post()
  async signUp(@Body() body: CatRequestDto) {
    return await this.catsService.signUp(body);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  logIn(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogIn(data);
  }

  // @ApiOperation({ summary: '로그아웃' })
  // @Post('logout')

  // logOut() {
  //   return 'logout';
  // } => 필요없음, 프론트 입장에서 jwt를 제거하면 그게 로그아웃이다.

  @ApiOperation({ summary: '고양이 이미지 업로드' })
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FilesInterceptor('image', 10, multerOptions('cats'))) // frontend key값,folder, max count
  uploadFile(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @CurrentUser() cat: Cat,
  ) {
    console.log('files', files);
    return this.catsService.uploadImg(cat, files);
  }

  @ApiOperation({ summary: '모든 고양이 가져오기' })
  @Get('all')
  getAllCat() {
    return this.catsService.getAllCat();
  }
}
