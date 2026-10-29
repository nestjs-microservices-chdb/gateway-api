import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module.js';
import { OrdersModule } from './orders/orders.module.js';
import { NastModule } from './transports/nast.module.js';

@Module({
  imports: [ProductsModule, OrdersModule, NastModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
