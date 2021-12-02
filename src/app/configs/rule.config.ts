import { PermissionEnum } from '@constants/permissions.enum';
import {
  RuleConfigFactory,
  RuleDefinition,
} from '@external/racl/core/rule.config';
import { UserCredential } from '@modules/auth/types/user-cred.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RuleConfig implements RuleConfigFactory {
  defineRules(): RuleDefinition {
    return {
      [PermissionEnum.ADMIN]: { matchCondition: true },
      [PermissionEnum.EDIT_OWN]: {
        matchCondition: (params: {
          authorId: string;
          user: UserCredential;
        }) => {
          return params.authorId === params.user.userId;
        },
      },
    };
  }
}
