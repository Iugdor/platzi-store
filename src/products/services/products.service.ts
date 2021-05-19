import { Injectable } from '@nestjs/common';

import { Product } from './../entities/product.entity';
import { CreateProductDto, FilterProductsDto } from '../dtos/products.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProductsService extends DatabaseService<
  Product,
  CreateProductDto,
  FilterProductsDto
> {
  constructor(@InjectModel(Product.name) productModel: Model<Product>) {
    super(productModel);
  }
}
