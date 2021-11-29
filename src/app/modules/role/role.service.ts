import { UserCredential } from '@modules/auth/types/user-cred.interface';
import { PermissionService } from '@modules/permission/permission.service';
import {
  Injectable,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from './dto/create-permissions.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
  private logger: Logger;

  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    private permissionService: PermissionService,
  ) {
    this.logger = new Logger(RoleService.name);
  }

  async createOne(createDtoRole: CreateRoleDto, user: UserCredential) {
    const role = await this.roleRepository.findOne({
      where: {
        name: createDtoRole.name,
      },
    });

    if (role) {
      throw new UnprocessableEntityException(`Duplicated role`);
    }

    await this.roleRepository.save(
      {
        ...createDtoRole,
        updatedBy: user.fullName,
      },
      { reload: false },
    );
  }

  async createPermissionsOfRole(
    roleId: string,
    createPermissionDtos: CreatePermissionDto[],
  ) {
    const role = await this.roleRepository.findOne(roleId);

    if (!role) {
      throw new NotFoundException(`Role is not found`);
    }

    try {
      await this.permissionService.createPermissions(
        role,
        createPermissionDtos,
      );
    } catch (error) {
      this.logger.error(error);
      throw new UnprocessableEntityException(`Duplicated permissions`);
    }
  }

  findAllIncludesPermissions() {
    return this.roleRepository.find({
      relations: ['permissions'],
    });
  }
}
