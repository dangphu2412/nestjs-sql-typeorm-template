import { Injectable } from '@nestjs/common';
import { OAuth2AuthenticationProvider } from '../provider/o-auth2-authentication.provider';
import { JwtService } from '@nestjs/jwt';
import { AuthenticatedResponseDto } from '../dto/authenticated-response.dto';
import { BcryptService } from './bcrypt.service';
import { UserService } from '../../user/user.service';
import { JwtPayloadDto } from '../dto/jwt-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private oAuth2AuthenticationProvider: OAuth2AuthenticationProvider,
    private jwtService: JwtService,
    private bcryptService: BcryptService,
    private userService: UserService,
  ) {}

  public async loginWithGoogle(
    accessToken: string,
  ): Promise<AuthenticatedResponseDto> {
    const { email } =
      await this.oAuth2AuthenticationProvider.checkAndClaimsUserWithGoogleAccessToken(
        accessToken,
      );

    const user = await this.userService.findByEmail(email);
    const permissions = user.permissions.map((per) => per.name);
    return {
      accessToken: this.jwtService.sign(
        JwtPayloadDto.create(user.id, user.fullName, permissions),
      ),
      profile: this.userService.getBasicProfile(user),
    };
  }

  generateTestToken() {
    return {
      accessToken: this.jwtService.sign(JwtPayloadDto.create('1', 'fus', [])),
      profile: {},
    };
  }
}
