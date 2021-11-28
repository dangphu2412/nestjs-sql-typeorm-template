import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { ConfigService } from '@external/config/config.service';
import { UserCredential } from './types/user-cred.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ConfigService.get('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayloadDto): Promise<UserCredential> {
    return {
      userId: payload.sub,
      roles: payload.roles,
      fullName: payload.fullName,
    };
  }
}
