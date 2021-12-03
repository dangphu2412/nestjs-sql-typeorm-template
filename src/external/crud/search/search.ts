const REGEX_SEARCH_CLEANER = /\W+/g;

export function parseSearch(search: string) {
  return !search ? '' : search.replace(REGEX_SEARCH_CLEANER, '');
}
