import { User } from '@modules/user/user.entity';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '../../../external/config/config.service';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
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
    TypeOrmModule.forFeature([User]),
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
