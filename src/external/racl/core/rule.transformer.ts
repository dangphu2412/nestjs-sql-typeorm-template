import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { RuleConfigFactory, RuleDefinition } from './rule.config';

@Injectable()
export class RuleTransformer implements CanActivate {
  private rules: RuleDefinition;

  constructor(@Inject('RULE_CONFIG') ruleConfigFactory: RuleConfigFactory) {
    this.rules = ruleConfigFactory.defineRules();
    console.log(this.rules);
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // TODO: implement way to map rules here
    return true;
  }
}
