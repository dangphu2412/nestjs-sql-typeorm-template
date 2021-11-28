import { JwtPayloadDto } from '../dto/jwt-payload.dto';

export type UserCredential = Pick<JwtPayloadDto, 'roles' | 'fullName'> & {
  userId: string;
};
