import { UnprocessableEntityException } from '@nestjs/common';
import '../../../../global';

export class ErrorAssertion {
  // TODO: Compare the difference between two array
  public static isDiffInKeys<K = RecordKey, T = Record<RecordKey, unknown>>(
    rootArrayDict: T[],
    arrayKeys: K[],
  ): boolean {
    return rootArrayDict.length !== arrayKeys.length;
  }

  public static assertKeysNotDiff<
    K = RecordKey,
    T = Record<RecordKey, unknown>,
  >(
    rootArrayDict: T[],
    arrayKeys: K[],
    customErrorConsumer?: () => Error,
  ): void {
    if (ErrorAssertion.isDiffInKeys(rootArrayDict, arrayKeys)) {
      if (customErrorConsumer) {
        throw customErrorConsumer();
      } else {
        throw new UnprocessableEntityException(
          `Invalid keys: ${arrayKeys.toString()}`,
        );
      }
    }
  }
}
