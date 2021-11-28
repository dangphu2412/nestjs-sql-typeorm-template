import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class GrantPermissionDto {
  @ApiProperty()
  @IsArray()
  permissionIds: string[];
}
