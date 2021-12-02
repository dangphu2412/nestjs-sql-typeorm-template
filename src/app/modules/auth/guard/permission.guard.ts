import {
  RULE_CONFIG_INJECT_KEY,
  RULE_FACTORY_INJECT_KEY,
} from '@external/racl/constant';
import {
  RuleConfigFactory,
  RuleDefinition,
} from '@external/racl/core/rule.config';
import { RuleManagerFactory } from '@external/racl/core/rule.factory';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSION_REFLECTOR_KEY } from '../constants';
import { UserCredential } from '../types/user-cred.interface';

@Injectable()
export class PermissionGuard implements CanActivate {
  private rules: RuleDefinition;

  constructor(
    @Inject(RULE_CONFIG_INJECT_KEY)
    ruleConfigFactory: RuleConfigFactory,
    private reflector: Reflector,
    @Inject(RULE_FACTORY_INJECT_KEY)
    private ruleFactory: RuleManagerFactory,
  ) {
    this.rules = ruleConfigFactory.defineRules();
  }

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSION_REFLECTOR_KEY,
      [context.getHandler(), context.getClass()],
    );

    const user: UserCredential = context.switchToHttp().getRequest().user;

    const ruleManager = this.ruleFactory.createManager(
      this.rules,
      user.permissions,
    );

    //TODO: Assign ruleManager to req context

    return requiredPermissions.some((permission) =>
      ruleManager.isPermissionAccepted(permission),
    );
  }
}
