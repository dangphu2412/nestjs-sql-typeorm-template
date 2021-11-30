export class ArrayUtils {
  public static isPresent<T>(array: T[]): boolean {
    return array?.length > 0;
  }

  public static isEmpty<T>(array: T[]) {
    return !array || array.length === 0;
  }
}
