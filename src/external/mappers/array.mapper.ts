export class ArrayMapper {
  public static mapByKeys<T>(array: T[], keys: string[]) {
    return array.map((i) => {
      const result = {};
      keys.forEach((key) => {
        result[key] = i[key];
      });
      return result;
    });
  }

  public static mapByKey<T>(array: T[], key: string) {
    return array.map((i) => i[key]);
  }
}
