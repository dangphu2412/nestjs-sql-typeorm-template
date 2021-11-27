import { getTypeOrmModule } from '@config/typeorm.config';
import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [AuthModule, UserModule, getTypeOrmModule()],
})
export class AppModule {}
