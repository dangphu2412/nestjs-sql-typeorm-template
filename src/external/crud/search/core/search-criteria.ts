import { BadRequestException } from '@nestjs/common';
import { Request } from 'express';
import { ConfigKeys } from '../constant';
import { FilterCriteria, parseFilters } from '../modules/filter';
import {
  assertNegative,
  assertReachMax,
  parseNumberFromQr,
} from '../modules/number.transform';
import { parseSearch } from '../modules/search';
import { SearchConfig } from '../config/search.config';
import { parseSorts, SortCriteria } from '../modules/sort';

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
    const value =
      parseNumberFromQr(
        req.query.page,
        () => new BadRequestException('Page should be an number'),
      ) || (SearchConfig.get(ConfigKeys.DEFAULT_PAGE) as number);

    assertNegative(
      value,
      () => new BadRequestException('Page should not be a negative number'),
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
    const value =
      parseNumberFromQr(
        req.query.limit,
        () => new BadRequestException('Limit should be an number'),
      ) || (SearchConfig.get(ConfigKeys.DEFAULT_LIMIT) as number);

    assertNegative(
      value,
      () => new BadRequestException('Limit should not be a negative number'),
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
    return parseFilters(req.query.filter);
  }

  static getSorts(req: Request): SortCriteria[] {
    return parseSorts(req.query.sort);
  }
}
