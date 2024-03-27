import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './cats.schema';
import { Model } from 'mongoose';
import { CatRequestDto } from './dto/cats.request.dto';

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async existsByEmail(email: string) {
    try {
      const result = await this.catModel.exists({ email });
      return result;
    } catch {
      throw new HttpException('db error', 400);
    }
  }
  async create(cat: CatRequestDto) {
    return await this.catModel.create(cat);
  }

  async findAll() {
    return await this.catModel.find();
  }
  async findCatByEmail(email: string) {
    const cat = await this.catModel.findOne({ email });
    return cat;
  }

  async findCatByIdWithoutPassword(catId: string) {
    const cat = await this.catModel.findById(catId).select('-password'); // select로 password를 제외(-,마이너스)하고 가져온다. 보안상 이유로 가져오지 않는다.
    return cat;
  }
  async findByIdAndUpdateImg(id: string, fileName: string) {
    const cat = await this.catModel.findById(id);
    cat.imgUrl = `http://localhost:8000/media/${fileName}`;
    const newCat = await cat.save();
    return newCat.readOnlyData;
  }
}
