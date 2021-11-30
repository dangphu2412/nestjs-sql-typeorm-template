import { getTypeOrmModule } from '@config/typeorm.config';
import { MediaModule } from '@modules/media/media.module';
import { PermissionModule } from '@modules/permission/permission.module';
import { RoleModule } from '@modules/role/role.module';
import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    getTypeOrmModule(),
    AuthModule,
    UserModule,
    RoleModule,
    PermissionModule,
    MediaModule,
  ],
})
export class AppModule {}
