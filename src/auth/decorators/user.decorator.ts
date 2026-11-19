import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";
import { type CurrentUser } from "../interfaces/user.interface.js";

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {

    const request = ctx.switchToHttp().getRequest();

    if (!request.user) {
      throw new InternalServerErrorException('User not found in request (AuthGuard called)')
    }

    return request.user as CurrentUser;
  }
)