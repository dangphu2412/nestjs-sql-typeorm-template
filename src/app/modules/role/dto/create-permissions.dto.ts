import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto {
  @ApiProperty()
  public name: string;

  @ApiProperty()
  public priority: number;
}
