import { JwtPayloadDto } from '../dto/jwt-payload.dto';

export type UserCredential = Pick<JwtPayloadDto, 'permissions' | 'fullName'> & {
  userId: string;
};
