import { ConfigService } from '@external/config/config.service';

export = [
  {
    name: 'default',
    type: 'postgres',
    username: ConfigService.get('DB_USERNAME'),
    host: ConfigService.get('DB_HOST'),
    password: ConfigService.get('DB_PASSWORD'),
    port: ConfigService.getInt('DB_PORT'),
    database: ConfigService.get('DB_DATABASE'),
    migrations: ['src/app/database/migrations/*.ts'],
    entities: ['src/app/**/*.entity{.ts,.js}'],
    factories: ['src/app/database/factories/**/*.factory{.ts,.js}'],
    seeds: [`src/app/database/seeds/**/*.seed{.ts,.js}`],
    cli: {
      migrationsDir: 'src/app/database/migrations',
      subscribersDir: 'src/subscriber',
    },
  },
];
