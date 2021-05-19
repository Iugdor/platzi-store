import { Injectable } from '@nestjs/common';

import { DatabaseService } from 'src/database/database.service';
import { FilterDto } from 'src/common/filter-dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from '../entities/order.entity';
import { CreateOrderDto } from '../dtos/order.dto';

@Injectable()
export class OrdersService extends DatabaseService<
  Order,
  CreateOrderDto,
  FilterDto
> {
  constructor(@InjectModel(Order.name) orderModel: Model<Order>) {
    super(orderModel);
  }

  async removeProduct(id: string, productId: string) {
    const order = await this.findOne(id);
    order.products.pull(productId);
    return order.save();
  }

  async addProducts(id: string, productsIds: string[]) {
    console.log(productsIds);
    const order = await this.findOne(id);
    order.products.addToSet(productsIds);
    return order.save();
  }
}
