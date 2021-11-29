import { SetMetadata } from '@nestjs/common';
import { PERMISSION_REFLECTOR_KEY } from '../constants';

export const PermissionGranted = <T>(...permissions: T[]) =>
  SetMetadata<string, T[]>(PERMISSION_REFLECTOR_KEY, permissions);
