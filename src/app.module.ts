import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module.js';
import { OrdersModule } from './orders/orders.module.js';
import { NastModule } from './transports/nast.module.js';
import { AuthModule } from './auth/auth.module.js';

@Module({
  imports: [ProductsModule, OrdersModule, NastModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
