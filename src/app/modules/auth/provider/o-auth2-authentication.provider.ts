import { ConfigService } from '@external/config/config.service';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class OAuth2AuthenticationProvider {
  private oauth2Client: OAuth2Client;
  private logger: Logger;

  constructor() {
    this.logger = new Logger(OAuth2AuthenticationProvider.name);
    this.oauth2Client = new OAuth2Client(ConfigService.get('OAUTH_CLIENT_ID'));
  }

  public async checkAndClaimsUserWithGoogleAccessToken(accessToken: string) {
    try {
      const ticket = await this.oauth2Client.verifyIdToken({
        idToken: accessToken,
        audience: ConfigService.get('OAUTH_CLIENT_ID'),
      });
      return ticket.getPayload();
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Access token is not valid');
    }
  }
}
