import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { RuleConfigFactory, RuleDefinition } from './rule.config';

@Injectable()
export class RuleTransformer implements NestInterceptor {
  private rules: RuleDefinition;

  constructor(@Inject('RULE_CONFIG') ruleConfigFactory: RuleConfigFactory) {
    this.rules = ruleConfigFactory.defineRules();
    console.log(this.rules);
  }
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    console.log(this.rules);

    return next.handle();
  }
}
