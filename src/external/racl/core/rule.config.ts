import { Injectable } from '@nestjs/common';

export interface RuleDefinition {
  [ruleKey: string]: {
    matchCondition: (params: Record<string, unknown>) => boolean;
  };
}

export interface RuleConfigFactory {
  defineRules(): RuleDefinition;
}

@Injectable()
export class RuleConfig implements RuleConfigFactory {
  defineRules(): RuleDefinition {
    return {
      '': { matchCondition: ({}) => true },
    };
  }
}
