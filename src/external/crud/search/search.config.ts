import { isNumber } from 'lodash';
import { ConfigKeys } from './constant';

export interface SearchConfigOptions {
  maxLimit: number;
  maxPage: number;
  defaultLimit: number;
  defaultPage: number;
}

export class SearchConfig {
  static _store = new Map();

  static get(key) {
    return this._store.get(key);
  }

  static set(key, value) {
    this._store.set(key, value);
  }

  /**
   *
   * @param {{maxLimit, maxPage, defaultLimit, defaultPage}} config
   */
  static config(config: SearchConfigOptions) {
    const { maxLimit, maxPage, defaultLimit, defaultPage } = config;

    if (maxLimit && !isNumber(maxLimit)) {
      throw new Error('Max limit should be number');
    }

    if (maxPage && !isNumber(maxPage)) {
      throw new Error('Max page should be number');
    }

    if (defaultLimit && !isNumber(defaultLimit)) {
      throw new Error('Default limit should be number');
    }

    if (defaultPage && !isNumber(defaultPage)) {
      throw new Error('Default page should be number');
    }

    SearchConfig.set(ConfigKeys.MAX_LIMIT, maxLimit);
    SearchConfig.set(ConfigKeys.MAX_PAGE, maxPage);
    SearchConfig.set(ConfigKeys.DEFAULT_LIMIT, defaultLimit);
    SearchConfig.set(ConfigKeys.DEFAULT_PAGE, defaultPage);
  }
}
