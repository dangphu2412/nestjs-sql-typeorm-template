import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserCredential } from '../types/user-cred.interface';

export const AuthContext = createParamDecorator(
  (data: string, ctx: ExecutionContext): UserCredential => {
    return ctx.switchToHttp().getRequest().user;
  },
);
