import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { PERMISSION_REFLECTOR_KEY } from '../constants';
import { PermissionGuard } from '../guard/permission.guard';

export const PermissionGranted = <T>(...permissions: T[]) =>
  applyDecorators(
    SetMetadata<string, T[]>(PERMISSION_REFLECTOR_KEY, permissions),
    UseGuards(PermissionGuard),
  );
