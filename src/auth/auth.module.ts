import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { NastModule } from '../transports/nast.module.js';

@Module({
  controllers: [AuthController],
  imports: [NastModule]
})
export class AuthModule { }
