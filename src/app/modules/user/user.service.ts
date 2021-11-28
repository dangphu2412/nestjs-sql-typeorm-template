import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import pick from 'lodash/pick';
import { ProfileDto } from '../auth/dto/profile.dto';
import { GrantPermissionDto } from './dto/grant-permission.dto';
import { PermissionService } from '@modules/permission/permission.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private permissionService: PermissionService,
  ) {}

  public findByEmail(email: string) {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  public getBasicProfile(user: User): ProfileDto {
    return pick(user, ['id', 'username', 'fullName', 'avatar']) as ProfileDto;
  }

  public findAll() {
    return this.userRepository.find();
  }

  public async grantPermissionForUser(
    userId: string,
    grantPermissionDto: GrantPermissionDto,
  ) {
    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new NotFoundException(
        `Not found any user to grant permissions with id: ${userId}`,
      );
    }

    const permissions = await this.permissionService.findByIds(
      grantPermissionDto.permissionIds,
    );

    user.permissions = permissions;
    await this.userRepository.save(user);
  }
}
