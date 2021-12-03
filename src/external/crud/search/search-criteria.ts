import { BadRequestException } from '@nestjs/common';
import { Request } from 'express';
import { ConfigKeys } from './constant';
import { assertReachMax, parseNumberFromQr } from './number.transform';
import { parseSearch } from './search';

interface SortCriteria {
  direction: 'ASC' | 'DESC';
  column: string;
}

interface FilterCriteria {
  column: string;
  value: string;
  comparator: string;
}

export class SearchCriteria {
  public search = '';
  public sorts: SortCriteria[];
  public filters: FilterCriteria[];
  public limit: number;
  public page: number;

  static create(req: Request) {
    const instance = new SearchCriteria();
    instance.page = SearchCriteria.getPage(req);
    instance.limit = SearchCriteria.getLimit(req);
    instance.filters = SearchCriteria.getFilters(req);
    instance.sorts = SearchCriteria.getSorts(req);
    instance.search = parseSearch(req.query.search as string);
    return instance;
  }

  static getPage(req: Request) {
    const value = parseNumberFromQr(
      req.query.page,
      () => new BadRequestException('Page should be an number'),
    );
    assertReachMax(
      value,
      ConfigKeys.MAX_PAGE,
      () =>
        new BadRequestException(
          `Can not set page with this value: ${value} because it reach max value`,
        ),
    );
    return value;
  }

  static getLimit(req: Request) {
    const value = parseNumberFromQr(
      req.query.limit,
      () => new BadRequestException('Limit should be an number'),
    );
    assertReachMax(
      value,
      ConfigKeys.MAX_LIMIT,
      () =>
        new BadRequestException(
          `Can not set limit with this value: ${value} because it reach max value`,
        ),
    );
    return value;
  }

  static getFilters(req: Request): FilterCriteria[] {
    return [];
  }
  static getSorts(req: Request): SortCriteria[] {
    return [];
  }
}
