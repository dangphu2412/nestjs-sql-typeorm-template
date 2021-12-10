import { Constructor } from 'global';

export class ClassFactory {
  public static create<T>(
    targetClass: Constructor<T>,
    partial: Partial<Constructor<T>>,
  ) {
    return Object.assign(new targetClass(), partial);
  }
}
