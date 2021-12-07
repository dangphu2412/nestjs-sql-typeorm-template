# CRUD - Search

## What it use for?
- Use to format the query which comes from client-side
- Convenient to intercept filter, sort fields before go to our service
- Override filter, sort comparators easily

## How to setup?

- Example:
```typescript
import { SearchConfig } from '@external/crud/search/config/search.config';

SearchConfig.config({
  defaultLimit: 10,
  defaultPage: 0,
  maxLimit: 100,
  maxPage: 1000,
  filterComparators: {
      'equals': Equal,
      ... //
  },
  sortDirections: {
      '+': 'ASC',
      '-': 'DESC'
  },
});
```
- Everything are optionals, each one has a default value.
### Default values
- filterComparators come up with its default:
```typescript
const DefaultFilterComparator = {
  eq: '=',
  gt: '>',
  lt: '<',
  in: 'in',
  neq: '!=',
};
```
- sortDirections come up with its default:
```typescript
const DefaultSortDirection = {
  '-': 'DESC',
  '+': 'ASC',
};
```
-  defaultLimit, defaultPage, maxLimit, maxPage default will be null
### Override options
- We can easily override allowed comparator and direction in filter and sort
``` typescript
  filterComparators: {
      'equals': Equal,
      ... //
  };
  sortDirections: {
      '+': 'ASC',
      '-': 'DESC'
  };
```