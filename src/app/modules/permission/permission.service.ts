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
  createPermissions(
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
}
