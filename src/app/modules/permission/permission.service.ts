import { CreatePermissionDto } from '@modules/role/dto/create-permissions.dto';
import { Role } from '@modules/role/role.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  EntityManager,
  In,
  Repository,
  Transaction,
  TransactionManager,
} from 'typeorm';
import { Permission } from './permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  @Transaction()
  public createPermissions(
    role: Role,
    createPermissionDtos: CreatePermissionDto[],
    @TransactionManager() transactionEntityManager?: EntityManager,
  ) {
    const permissions = createPermissionDtos.map((createDto) => {
      const entity = new Permission();
      entity.name = createDto.name;
      entity.priority = createDto.priority;
      entity.role = role;
      return entity;
    });

    return transactionEntityManager.insert(Permission, permissions);
  }

  public findByIds(ids: string[]) {
    return this.permissionRepository.find({
      where: {
        id: In(ids),
      },
    });
  }

  public toPermissionRules(permissions: Permission[]): Record<string, number> {
    const RULE_IS_WORKING = 1;
    const DISABLE_RULE = 0; // Will be develop in permission in future

    const rules: Record<string, number> = {};
    permissions.forEach((permission) => {
      rules[permission.name] = RULE_IS_WORKING;
    });
    return rules;
  }
}
