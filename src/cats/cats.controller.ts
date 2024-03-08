import { CatsService } from './cats.service';
import {
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { PositiveIntPipe } from 'src/common/pipes/positiveInt.pipe';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { Successnterceptor } from 'src/common/interceptors/success.interceptor';

@Controller('cats')
@UseInterceptors(Successnterceptor) // Interceptor 의존성 주입
@UseFilters(HttpExceptionFilter) // 모두에 쓰인다면 controller 위에다가 쓴다.
export class CatsController {
  constructor(private readonly catsService: CatsService) {} // service를 dependency injection

  @Get()
  // @UseFilters(HttpExceptionFilter)
  getAllCat() {
    // throw new HttpException('api is broken', 401); // === throw new Error("")

    return { cats: `get all cat` };
  }

  // cats/:id
  @Get('/:id')
  getOneCat(@Param('id', ParseIntPipe, PositiveIntPipe) param: number) {
    console.log(param);
    return 'one cat';
  }

  @Post()
  createCat() {
    return 'create cat';
  }

  @Put()
  updateCat() {
    return 'update cat';
  }
  @Patch()
  updatePartialCat() {
    return 'update';
  }

  @Delete()
  deleteCat() {
    return 'delete Cat';
  }
}
