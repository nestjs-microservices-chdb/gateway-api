import { Request } from "express";
import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

import { NATS_SERVICE } from "../../config/services.js";
import { firstValueFrom } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeaders(request);
    if (!token) {
      throw new UnauthorizedException()
    }
    try {
      const { user, token: newToken } = await firstValueFrom(
        this.client.send('auth.verify.user', token)
      )

      request['user'] = user;
      request['token'] = newToken;
    } catch (error) {
      console.log(error)
      throw new UnauthorizedException()
    }
    return true
  }

  private extractTokenFromHeaders(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined
  }

}