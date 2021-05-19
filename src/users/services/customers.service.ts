import { Injectable } from '@nestjs/common';

import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto } from '../dtos/customer.dto';
import { DatabaseService } from 'src/database/database.service';
import { FilterDto } from 'src/common/filter-dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CustomersService extends DatabaseService<
  Customer,
  CreateCustomerDto,
  FilterDto
> {
  constructor(@InjectModel(Customer.name) customerModel: Model<Customer>) {
    super(customerModel);
  }
}
