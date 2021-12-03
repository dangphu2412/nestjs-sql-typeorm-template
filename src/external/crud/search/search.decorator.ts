import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { SearchCriteria } from './search-criteria';

export const SearchQuery = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    return SearchCriteria.create(ctx.switchToHttp().getRequest());
  },
);
