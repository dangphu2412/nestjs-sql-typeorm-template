export class Meta {
  public page?: number;
  public size?: number;
  public pageCount?: number;
  public totalCount?: number;
  public links?: {
    self?: string;
    first?: string;
    previous?: string;
    next?: string;
    last?: string;
  };
}
