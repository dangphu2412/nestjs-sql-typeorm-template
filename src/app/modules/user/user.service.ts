import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import pick from 'lodash/pick';
import { ProfileDto } from '../auth/dto/profile.dto';
import { GrantPermissionDto } from './dto/grant-permission.dto';
import { PermissionService } from '@modules/permission/permission.service';
import { CreateUserDto } from './dto/create-user.dto';
import { BcryptService } from '@modules/auth/services/bcrypt.service';
import { ConfigService } from '@external/config/config.service';

@Injectable()
export class UserService {
  private logger: Logger;
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private permissionService: PermissionService,
    private bcryptService: BcryptService,
  ) {
    this.logger = new Logger(UserService.name);
  }

  public findByEmail(email: string) {
    return this.userRepository.findOne({
      where: {
        email,
      },
      relations: ['permissions'],
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

  public async createOne(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOne({
      where: [
        { username: createUserDto.username },
        { email: createUserDto.email },
      ],
    });

    if (user) {
      throw new UnprocessableEntityException(
        'Your username or email is duplicated',
      );
    }

    const userEntity = User.create(createUserDto);

    userEntity.password = await this.bcryptService.hash(userEntity.password);
    userEntity.avatar = ConfigService.getCache('DEFAULT_AVATAR');

    try {
      await this.userRepository.save(userEntity, { reload: false });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Error while handling insert new user',
      );
    }
  }
}
