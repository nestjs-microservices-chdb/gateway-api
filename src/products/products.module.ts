import { Module } from '@nestjs/common';

import { ProductsController } from './products.controller.js';

import { NastModule } from '../transports/nast.module.js';

@Module({
  controllers: [ProductsController],
  providers: [],
  imports: [NastModule]
})
export class ProductsModule { }
