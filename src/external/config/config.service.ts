import { config } from 'dotenv';
import { existsSync } from 'fs';

config();

export class ConfigService {
  private static cacheStore = new Map();

  static config(filePath: string) {
    if (!existsSync(filePath)) {
      throw new Error(`No file path found: ${filePath}`);
    }

    config({
      path: filePath,
    });
  }

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
