import { SortCriteria } from '../../search/modules/sort';
import { EntityFieldsNames } from 'typeorm/common/EntityFieldsNames';

// This response brought from typeorm declarative
export function toOrders<Entity>(sorts: SortCriteria[]): {
  [P in EntityFieldsNames<Entity>]?: 'ASC' | 'DESC' | 1 | -1;
} {
  const orders = {};
  sorts.forEach((sort) => {
    orders[sort.column] = sort.direction;
  });
  return orders;
}
