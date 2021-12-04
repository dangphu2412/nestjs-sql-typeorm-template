import { Query } from 'express-serve-static-core';
export interface SortCriteria {
  direction: string;
  column: string;
}

// TODO: Need override
export const SortDirection = {
  '-': 'DESC',
  '+': 'ASC',
};

function toSort(sort: string): SortCriteria {
  const sortSchema: SortCriteria = {
    column: '',
    direction: SortDirection['-'],
  };
  const direction = sort[0];
  const isDesc = SortDirection[direction] === SortDirection['-'];

  if (isDesc) {
    sortSchema.column = sort.slice(1, sort.length);
    return sortSchema;
  }

  sortSchema.column = sort;
  sortSchema.direction = SortDirection['+'];

  return sortSchema;
}

export function parseSorts(
  sorts: string | Query | string[] | Query[],
): SortCriteria[] {
  const sliceSorts = [];
  if (!sorts || sorts.length === 0) return sliceSorts;

  if (typeof sorts === 'string') {
    sliceSorts.push(toSort(sorts));
  }

  if (Array.isArray(sorts)) {
    sorts.forEach((sort) => sliceSorts.push(toSort(sort)));
  }

  return sliceSorts;
}
