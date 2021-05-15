import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './controllers/products.controller';
import { CategoriesController } from './controllers/categories.controller';
import { UsersController } from './controllers/users.controller';
import { CustomerController } from './controllers/customers.controller';
import { BrandController } from './controllers/brands.controller';
import { OrdersController } from './controllers/orders.controller';
import { ProductsService } from './services/products.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    ProductsController,
    CategoriesController,
    UsersController,
    CustomerController,
    BrandController,
    OrdersController,
  ],
  providers: [AppService, ProductsService],
})
export class AppModule {}
