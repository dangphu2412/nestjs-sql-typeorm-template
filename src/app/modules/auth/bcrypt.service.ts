import { Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';
import { ConfigService } from '../../../external/config/config.service';

@Injectable()
export class BcryptService {
  private static readonly SALT_ROUNDS = ConfigService.getInt('SALT_ROUNDS');

  public compare(data: string, hashedData: string): Promise<boolean> {
    return compare(data, hashedData);
  }

  public async hash(data) {
    const salted = await genSalt(BcryptService.SALT_ROUNDS);
    return hash(data, salted);
  }
}
