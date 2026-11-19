import { Body, Controller, Get, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

import { AuthGuard } from './guards/auth.guard.js';
import { Token, User } from './decorators/index.js';

import { LoginUserDto, RegisterUserDto } from './dto/index.js';
import { NATS_SERVICE } from '../config/index.js';
import { type CurrentUser } from './interfaces/user.interface.js';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) { }

  @Post('register')
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.client.send('auth.register.user', registerUserDto).pipe(
      catchError((error) => { throw new RpcException(error) })
    );
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.client.send('auth.login.user', loginUserDto).pipe(
      catchError((error) => { throw new RpcException(error) })
    );
  }

  @UseGuards(AuthGuard)
  @Get('verify')
  verifyUser(@User() user: CurrentUser, @Token() token: string) {
    return {
      user,
      token
    }
    // return this.client.send('auth.verify.user', {}).pipe(
    //   catchError((error) => { throw new RpcException(error) })
    // );
  }
}
