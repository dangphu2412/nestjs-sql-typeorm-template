import { DynamicModule, Global, Module, Type } from '@nestjs/common';
import { RULE_CONFIG_INJECT_KEY, RULE_FACTORY_INJECT_KEY } from './constant';
import { RuleConfigFactory } from './core/rule.config';
import { RuleManagerFactory } from './core/rule.factory';

interface RaclConfig {
  useClass: Type<RuleConfigFactory>;
}

@Global()
@Module({})
export class RaclModule {
  static register(config: RaclConfig): DynamicModule {
    return {
      module: RaclModule,
      providers: [
        {
          provide: RULE_CONFIG_INJECT_KEY,
          useClass: config.useClass,
        },
        {
          provide: RULE_FACTORY_INJECT_KEY,
          useClass: RuleManagerFactory,
        },
      ],
      exports: [RULE_CONFIG_INJECT_KEY, RULE_FACTORY_INJECT_KEY],
    };
  }
}
