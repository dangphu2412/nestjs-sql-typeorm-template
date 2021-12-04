import { BadRequestException } from '@nestjs/common';
import { Query } from 'express-serve-static-core';
export interface FilterCriteria {
  column: string;
  value: string;
  comparator: string;
}

// TODO: Need to override
export const FilterSign = {
  $eq: '=',
  $gt: '>',
  $lt: '<',
  $in: 'in',
};

function assertFilter(filter: string[]) {
  if (filter.length !== 3) {
    throw new BadRequestException('Filter format is not valid');
  }

  if (!FilterSign[filter[1]]) {
    throw new BadRequestException('Sign in filter is not valid');
  }
}

function toFilter(filter: string): FilterCriteria {
  const parts = filter.split('|');

  assertFilter(parts);

  return {
    column: parts[0],
    comparator: FilterSign[parts[1]],
    value: parts[2],
  };
}

export function parseFilters(filters: string | Query | string[] | Query[]) {
  const sliceFilters = [];

  if (!filters || filters.length === 0) return sliceFilters;

  if (typeof filters === 'string') {
    sliceFilters.push(toFilter(filters));
    return sliceFilters;
  }

  if (Array.isArray(filters)) {
    filters.forEach((filter) => sliceFilters.push(toFilter(filter)));
  }

  return sliceFilters;
}
