import { BadRequestException } from '@nestjs/common';
import { Query } from 'express-serve-static-core';
import { FilterComparator, SearchConfig } from '../config/search.config';
import { ConfigKeys } from '../constant';
export interface FilterCriteria {
  column: string;
  value: string;
  comparator: string;
}

function assertFilter(filter: string[], comparators: FilterComparator) {
  if (filter.length !== 3) {
    throw new BadRequestException('Filter format is not valid');
  }

  if (!comparators[filter[1]]) {
    throw new BadRequestException('Sign in filter is not valid');
  }
}

function toFilter(
  filter: string,
  comparators: FilterComparator,
): FilterCriteria {
  const parts = filter.split('|');

  assertFilter(parts, comparators);

  return {
    column: parts[0],
    comparator: comparators[parts[1]],
    value: parts[2],
  };
}

export function parseFilters(
  filters: string | Query | string[] | Query[],
): FilterCriteria[] {
  const sliceFilters = [];
  const comparators = SearchConfig.get(
    ConfigKeys.FILTER_COMPARATOR,
  ) as FilterComparator;

  if (!filters || filters.length === 0) return sliceFilters;

  if (typeof filters === 'string') {
    sliceFilters.push(toFilter(filters, comparators));
    return sliceFilters;
  }

  if (Array.isArray(filters)) {
    filters.forEach((filter) =>
      sliceFilters.push(toFilter(filter, comparators)),
    );
  }

  return sliceFilters;
}
