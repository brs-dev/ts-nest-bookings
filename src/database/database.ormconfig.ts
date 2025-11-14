import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';

import {
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  DB_SYNCHRONIZE,
  DB_LOGGING,
} from '../environments';

const getOrmConfig = () => {
  const settings: TypeOrmModuleOptions = {
    type: 'postgres',
    host: DB_HOST,
    port: parseInt(DB_PORT as string, 10),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    entities: [path.join(__dirname, '/../**/*.entity{.ts,.js}')],
    logging: DB_LOGGING,
    synchronize: DB_SYNCHRONIZE,
  };

  return settings;
};

export const typeOrmConfigProvider = TypeOrmModule.forRoot(getOrmConfig());
