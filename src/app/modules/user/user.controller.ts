import { Protected } from '@modules/auth/decorator/protected.decorator';
import { AuthContext } from '@modules/auth/decorator/user-cred.decorator';
import { UserCredential } from '@modules/auth/types/user-cred.interface';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GrantPermissionDto } from './dto/grant-permission.dto';

import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { PermissionGranted } from '@modules/auth/decorator/granted-permission.decorator';
import { Permissions } from '@constants/permissions.enum';

@ApiTags('users')
@Controller('v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Protected
  @Get()
  public findAll(@AuthContext() user: UserCredential) {
    return this.userService.findAll();
  }

  @Post()
  public createOne(@Body() createUserDto: CreateUserDto) {
    return this.userService.createOne(createUserDto);
  }

  @Protected
  @PermissionGranted(Permissions.ADMIN)
  @Post('/:userId/permissions')
  public grantPermissionsForUser(
    @Param('userId') userId: string,
    @Body() grantPermissionDto: GrantPermissionDto,
  ) {
    return this.userService.grantPermissionForUser(userId, grantPermissionDto);
  }
}
