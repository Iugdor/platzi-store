import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FilterDto } from 'src/common/filter-dto';
import { DatabaseService } from 'src/database/database.service';
import { CreateBrandDto } from '../dtos/brand.dto';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class BrandsService extends DatabaseService<
  Brand,
  CreateBrandDto,
  FilterDto
> {
  constructor(@InjectModel(Brand.name) brandModel: Model<Brand>) {
    super(brandModel);
  }
}
