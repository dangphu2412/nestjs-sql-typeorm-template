import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  public username: string;

  @ApiProperty()
  @IsString()
  public fullName: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  public email: string;

  @ApiProperty()
  @IsString()
  public password: string;

  @Exclude()
  public avatar: string;
}
