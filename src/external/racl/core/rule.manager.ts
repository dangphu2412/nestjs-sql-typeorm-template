import { ForbiddenException } from '@nestjs/common/exceptions/forbidden.exception';
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

  public can(
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

  public cannot(
    permission: string,
    conditions: Record<string, unknown> = {},
  ): boolean {
    return !this.can(permission, conditions);
  }

  public has(permission: string) {
    if (
      this.userRules[permission] &&
      isBoolean(this.userRules[permission].matchCondition) &&
      this.userRules[permission].matchCondition
    ) {
      return true;
    }
    return false;
  }

  public throwIfCan(
    permission: string,
    conditions: Record<string, unknown> = {},
    exceptionConsumer: () => ForbiddenException,
  ): void {
    if (this.can(permission, conditions)) {
      if (exceptionConsumer) {
        throw exceptionConsumer();
      } else {
        throw new ForbiddenException();
      }
    }
  }

  public throwIfCannot(
    permission: string,
    conditions: Record<string, unknown> = {},
    exceptionConsumer: () => ForbiddenException,
  ): void {
    if (this.cannot(permission, conditions)) {
      throw exceptionConsumer();
    } else {
      throw new ForbiddenException();
    }
  }
}
