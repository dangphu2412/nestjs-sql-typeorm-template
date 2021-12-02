import { isBoolean } from 'lodash';
import { AuthorizeHandler, RuleDefinition } from './rule.config';

export class RuleManager {
  private userRules: RuleDefinition = {};

  constructor(
    rootRules: RuleDefinition,
    userPermissions: Record<string, unknown>,
  ) {
    this.transferRules(rootRules, userPermissions);
  }

  private transferRules(
    rootRules: RuleDefinition,
    userPermissions: Record<string, unknown>,
  ) {
    Object.keys(userPermissions).forEach((per) => {
      if (rootRules[per]) {
        this.userRules[per] = rootRules[per];
      }
    });
  }

  public isPermissionAccepted(
    permission: string,
    conditions: Record<string, unknown> = {},
  ): boolean {
    if (this.userRules[permission]) {
      if (isBoolean(this.userRules[permission].matchCondition)) {
        return this.userRules[permission].matchCondition as boolean;
      }
      return (this.userRules[permission].matchCondition as AuthorizeHandler)(
        conditions,
      );
    }
    return false;
  }
}
