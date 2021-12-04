import { Query } from 'express-serve-static-core';
import { SearchConfig } from '../config/search.config';

export function parseNumberFromQr(
  value: string | Query | string[] | Query[],
  parseFailSupplier: () => Error,
): number {
  if (!value) {
    return NaN;
  }

  if (typeof value !== 'string') return NaN;

  const parsedValue = Number.parseInt(value, 10);

  if (Number.isNaN(parsedValue)) {
    throw parseFailSupplier();
  }

  return parsedValue;
}

export function assertReachMax(value, maxKey, reachMaxSupplier) {
  if (SearchConfig.get(maxKey) && value > SearchConfig.get(maxKey)) {
    throw reachMaxSupplier();
  }
}

export function assertNegative(value: number, failSupplier: () => Error) {
  if (value < 0) {
    throw failSupplier();
  }
}
