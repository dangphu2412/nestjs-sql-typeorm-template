import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import pick from 'lodash/pick';
import { ProfileDto } from '../auth/dto/profile.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
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
}
