import { Module } from '@nestjs/common';

import { OrdersController } from './orders.controller.js';

import { NastModule } from '../transports/nast.module.js';

@Module({
  controllers: [OrdersController],
  providers: [],
  imports: [NastModule]
})

export class OrdersModule { }
