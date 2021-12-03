import { KEY_SPLITTER } from './constant';
import { RecordKey } from '../../../../global';

export class DictUtils {
  static isEmpty(obj: Record<RecordKey, unknown>): boolean {
    return !obj || Object.keys(obj).length === 0;
  }

  static isKeyEmpty(obj: Record<RecordKey, unknown>, keyPath: string): boolean {
    if (DictUtils.isEmpty(obj)) return false;
    const repetitions: string[] = keyPath.split(KEY_SPLITTER);
    let currentObj = obj;
    for (const repetition of repetitions) {
      if (!currentObj[repetition]) {
        return false;
      }
      currentObj = currentObj[repetition] as Record<RecordKey, unknown>;
    }
    return true;
  }

  static hasKey(obj: Record<RecordKey, unknown>, key: RecordKey): boolean {
    return !!obj.hasOwnProperty(key);
  }

  static hasValueOf(obj: Record<RecordKey, unknown>, key: RecordKey): boolean {
    return !!obj[key];
  }
}
