import { Options } from '@mikro-orm/core';
import * as dotenv from 'dotenv';

dotenv.config();

const mikroOrmConfig: Options = {
  dbName: process.env.POSTGRES_DB,
  type: 'postgresql',
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  migrations: {
    path: './database/migrations',
    glob: '*.ts',
    emit: 'ts',
    transactional: true,
    disableForeignKeys: true,
    allOrNothing: true,
    snapshot: false,
  },
};

export default mikroOrmConfig;
