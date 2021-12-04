import { Query } from 'express-serve-static-core';
import { SearchConfig, SortDirection } from '../config/search.config';
import { ConfigKeys } from '../constant';
export interface SortCriteria {
  direction: string;
  column: string;
}

function toSort(sort: string, sortDirections: SortDirection): SortCriteria {
  const sortSchema: SortCriteria = {
    column: null,
    direction: sortDirections['-'],
  };
  const direction = sort[0];
  const isDesc = sortDirections[direction] === sortDirections['-'];

  if (isDesc) {
    sortSchema.column = sort.slice(1, sort.length);
    return sortSchema;
  }

  sortSchema.column = sort;
  sortSchema.direction = sortDirections['+'];

  return sortSchema;
}

export function parseSorts(
  sorts: string | Query | string[] | Query[],
): SortCriteria[] {
  const sliceSorts = [];
  const sortDirections = SearchConfig.get(
    ConfigKeys.SORT_DIRECTION,
  ) as SortDirection;
  if (!sorts || sorts.length === 0) return sliceSorts;

  if (typeof sorts === 'string') {
    sliceSorts.push(toSort(sorts, sortDirections));
  }

  if (Array.isArray(sorts)) {
    sorts.forEach((sort) => sliceSorts.push(toSort(sort, sortDirections)));
  }

  return sliceSorts;
}
