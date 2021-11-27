import { Controller, Headers, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/google')
  public loginWithGoogle(@Headers('oauth-google-token') accessToken: string) {
    return this.authService.loginWithGoogle(accessToken);
  }
}
