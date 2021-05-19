import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FilterDto } from 'src/common/filter-dto';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService extends DatabaseService<
  User,
  CreateUserDto,
  FilterDto
> {
  constructor(@InjectModel(User.name) productModel: Model<User>) {
    super(productModel);
  }
}
