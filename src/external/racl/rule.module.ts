import { DynamicModule, Module, Type } from '@nestjs/common';
import { RuleConfigFactory } from './core/rule.config';

interface RaclConfig {
  useClass: Type<RuleConfigFactory>;
}

@Module({})
export class RaclModule {
  static register(config: RaclConfig): DynamicModule {
    return {
      module: RaclModule,
      providers: [
        {
          provide: 'RULE_CONFIG',
          useClass: config.useClass,
        },
      ],
    };
  }
}
