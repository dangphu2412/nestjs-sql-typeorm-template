import { config } from 'dotenv';

config();

export class ConfigService {
  private static cacheStore = new Map();

  static getOptional(key: string): string | null {
    return process.env[key] ? process.env[key] : null;
  }

  static get(key: string): string {
    const value = ConfigService.getOptional(key);

    if (!value) {
      throw new Error(`No env value found with key: ${key}`);
    }

    return value;
  }

  static getInt(key: string): number {
    return Number.parseInt(ConfigService.get(key), 10);
  }

  static getCache(key: string): any {
    if (ConfigService.cacheStore.has(key)) {
      return ConfigService.cacheStore.get(key);
    }

    return ConfigService.get(key);
  }
}
