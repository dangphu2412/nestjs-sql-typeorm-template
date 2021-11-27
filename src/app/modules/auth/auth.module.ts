import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '../../../external/config/config.service';
import { JwtStrategy } from './jwt.strategy';
import { OAuth2AuthenticationProvider } from './provider/o-auth2-authentication.provider';
import { BcryptService } from './services/bcrypt.service';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';

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
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    OAuth2AuthenticationProvider,
    BcryptService,
    UserService,
  ],
})
export class AuthModule {}
