import { PermissionEnum } from '@constants/permissions.enum';
import {
  RuleConfigFactory,
  RuleDefinition,
} from '@external/racl/core/rule.config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RuleConfig implements RuleConfigFactory {
  defineRules(): RuleDefinition {
    return {
      [PermissionEnum.ADMIN]: { matchCondition: true },
      [PermissionEnum.EDIT_OWN]: {
        matchCondition: (params: { authorId: string; ownerId: string }) => {
          return params.authorId === params.ownerId;
        },
      },
    };
  }
}
