import { PermissionModule } from '@modules/permission/permission.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '../../../external/config/config.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { OAuth2AuthenticationProvider } from './provider/o-auth2-authentication.provider';
import { AuthService } from './services/auth.service';
import { BcryptService } from './services/bcrypt.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: ConfigService.get('JWT_SECRET'),
      signOptions: {
        expiresIn: ConfigService.get('JWT_EXPIRATION'),
      },
    }),
    UserModule,
    PermissionModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    OAuth2AuthenticationProvider,
    BcryptService,
  ],
})
export class AuthModule {}
