import {
  AbstractSearchValidator,
  SearchValidationSchema,
} from '@external/crud/search/search.validator';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OverviewSearchValidator extends AbstractSearchValidator {
  getSchema(): SearchValidationSchema {
    return {
      allowFilters: ['username'],
      allowSorts: ['username'],
    };
  }
}
