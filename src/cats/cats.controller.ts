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
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/http-exception.filter';

@Controller('cats')
@UseFilters(HttpExceptionFilter) // 모두에 쓰인다면 controller 위에다가 쓴다.
export class CatsController {
  constructor(private readonly catsService: CatsService) {} // service를 dependency injection

  @Get()
  // @UseFilters(HttpExceptionFilter)
  getAllCat() {
    throw new HttpException('api is broken', 401); // === throw new Error("")

    // return 'all cat';
  }

  // cats/:id
  @Get('/:id')
  getOneCat(@Param('id', ParseIntPipe) param: number) {
    console.log(param); // 123
    console.log(typeof param); // string
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
