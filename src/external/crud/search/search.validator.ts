import { ArrayUtils } from '@external/utils/array/array.utils';
import { BadRequestException, PipeTransform } from '@nestjs/common';
import { SearchCriteria } from './search-criteria';

export interface SearchValidationSchema {
  allowFilters: string[];
  allowSorts: string[];
}

export abstract class AbstractSearchValidator
  implements PipeTransform<SearchCriteria, SearchCriteria>
{
  transform(value: SearchCriteria): SearchCriteria {
    const { filters, sorts } = value;
    const schema: SearchValidationSchema = this.getSchema();
    if (
      ArrayUtils.isPresent(schema.allowSorts) &&
      ArrayUtils.isPresent(sorts)
    ) {
      const isNotAccepted = !sorts.some((item) =>
        schema.allowSorts.includes(item.column),
      );

      if (isNotAccepted) {
        throw new BadRequestException('Invalid sort field');
      }
    }

    if (
      ArrayUtils.isPresent(schema.allowFilters) &&
      ArrayUtils.isPresent(filters)
    ) {
      const isNotAccepted = !filters.some((item) =>
        schema.allowFilters.includes(item.column),
      );

      if (isNotAccepted) {
        throw new BadRequestException('Invalid filter field');
      }
    }
    return value;
  }

  abstract getSchema(): SearchValidationSchema;
}
