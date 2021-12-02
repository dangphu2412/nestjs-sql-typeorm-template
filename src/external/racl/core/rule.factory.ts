import { Injectable } from '@nestjs/common';
import { RuleDefinition } from './rule.config';
import { RuleManager } from './rule.manager';

@Injectable()
export class RuleManagerFactory {
  public createManager(
    rootRules: RuleDefinition,
    userPermissions: Record<string, unknown>,
  ) {
    return new RuleManager(rootRules, userPermissions);
  }
}
