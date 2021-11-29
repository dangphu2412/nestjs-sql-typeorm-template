import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSION_REFLECTOR_KEY } from '../constants';
import { UserCredential } from '../types/user-cred.interface';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSION_REFLECTOR_KEY,
      [context.getHandler(), context.getClass()],
    );

    const user: UserCredential = context.switchToHttp().getRequest().user;
    return requiredPermissions.some(
      (permission) => user.permissions[permission],
    );
  }
}
