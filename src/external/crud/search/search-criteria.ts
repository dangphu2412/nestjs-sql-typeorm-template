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
  public limit: string;
  public page: string;

  static create(req: any) {
    const instance = new SearchCriteria();
    instance.page = req.query.page;
    instance.limit = req.query.limit;
    instance.filters = req.query.filter;
    instance.sorts = req.query.filter;
    instance.search = req.query.search;
    return instance;
  }
}
