import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RuleManager } from '../core/rule.manager';

export const ExtractRuleManager = createParamDecorator(
  (data: string, ctx: ExecutionContext): RuleManager => {
    return ctx.switchToHttp().getRequest().ruleManager;
  },
);
