import { CatsService } from './cats.service';
import { Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {} // service를 dependency injection

  @Get()
  getAllCat() {
    return 'all cat';
  }

  // cats/:id
  @Get('/:id')
  getOneCat() {
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
