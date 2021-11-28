import { UserCredential } from '@modules/auth/types/user-cred.interface';
import { PermissionService } from '@modules/permission/permission.service';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    private permissionService: PermissionService,
  ) {}

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
}
