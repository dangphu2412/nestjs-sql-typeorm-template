import { RuleConfig } from '@external/racl/core/rule.config';
import { RaclModule } from '@external/racl/rule.module';
import { BcryptService } from '@modules/auth/services/bcrypt.service';
import { Permission } from '@modules/permission/permission.entity';
import { PermissionService } from '@modules/permission/permission.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Permission]),
    RaclModule.register({
      useClass: RuleConfig,
    }),
  ],
  controllers: [UserController],
  providers: [UserService, PermissionService, BcryptService],
})
export class UserModule {}
