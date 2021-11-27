import { ProfileDto } from './profile.dto';

export class AuthenticatedResponseDto {
  public accessToken: string;
  public profile: ProfileDto;
}
