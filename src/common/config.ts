import * as dotenv from 'dotenv';

dotenv.config();

const { env } = process;

export const getConfig = () => config;

export const config = {
  port: +env.PORT || 404,
  baseUrl: env.BASE_URL,
  apiKey: env.API_KEY,
  databases: {
    postgresql: {
      host: env.POSTGRES_HOST,
      port: +env.POSTGRES_PORT,
      username: env.POSTGRES_USER,
      password: env.POSTGRES_PASSWORD,
      database: env.POSTGRES_DB,
    },
  },
};
