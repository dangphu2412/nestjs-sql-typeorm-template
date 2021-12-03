export class SearchCriteria {
  public search = '';
  public sorts;
  public filters;
  public limit;
  public page;

  static create(request: any) {
    const instance = new SearchCriteria();
    instance.page = request.query.page;
    return instance;
  }
}
