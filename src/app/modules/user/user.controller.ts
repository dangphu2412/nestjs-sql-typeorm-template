import { PermissionEnum } from '@constants/permissions.enum';
import { RuleManager } from '@external/racl/core/rule.manager';
import { ExtractRuleManager } from '@external/racl/decorator/get-manager.decorator';
import { PermissionGranted } from '@modules/auth/decorator/granted-permission.decorator';
import { Protected } from '@modules/auth/decorator/protected.decorator';
import { AuthContext } from '@modules/auth/decorator/user-cred.decorator';
import { UserCredential } from '@modules/auth/types/user-cred.interface';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { GrantPermissionDto } from './dto/grant-permission.dto';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @PermissionGranted(PermissionEnum.ADMIN)
  @Protected
  @Get()
  public findAll(
    @AuthContext() user: UserCredential,
    @ExtractRuleManager() ruleManager: RuleManager,
  ) {
    console.log(ruleManager);

    return this.userService.findAll();
  }

  @Post()
  public createOne(@Body() createUserDto: CreateUserDto) {
    return this.userService.createOne(createUserDto);
  }

  @Post('/:userId/permissions')
  public grantPermissionsForUser(
    @Param('userId') userId: string,
    @Body() grantPermissionDto: GrantPermissionDto,
  ) {
    return this.userService.grantPermissionForUser(userId, grantPermissionDto);
  }
}
