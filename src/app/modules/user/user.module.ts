import { BcryptService } from '@modules/auth/services/bcrypt.service';
import { Permission } from '@modules/permission/permission.entity';
import { PermissionService } from '@modules/permission/permission.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Permission])],
  controllers: [UserController],
  providers: [UserService, PermissionService, BcryptService],
})
export class UserModule {}
