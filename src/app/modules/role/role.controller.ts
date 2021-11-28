import { Protected } from '@modules/auth/decorator/protected.decorator';
import { AuthContext } from '@modules/auth/decorator/user-cred.decorator';
import { UserCredential } from '@modules/auth/types/user-cred.interface';
import { Body, Controller, Param, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { CreatePermissionDto } from './dto/create-permissions.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleService } from './role.service';

@ApiTags('roles')
@Controller('v1/roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiCreatedResponse()
  @ApiUnprocessableEntityResponse()
  @Protected
  @Post()
  public createOne(
    @Body() createDtoRole: CreateRoleDto,
    @AuthContext() user: UserCredential,
  ) {
    return this.roleService.createOne(createDtoRole, user);
  }

  @ApiCreatedResponse()
  @ApiUnprocessableEntityResponse()
  @ApiBody({
    isArray: true,
    type: () => [CreatePermissionDto],
  })
  @Post('/:roleId/permissions')
  public createPermissionsOfRole(
    @Body() createPermissionDto: CreatePermissionDto[],
    @Param('roleId') roleId: string,
  ) {
    return this.roleService.createPermissionsOfRole(
      roleId,
      createPermissionDto,
    );
  }
}
