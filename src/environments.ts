import { config } from 'dotenv';

const { parsed } = config({ override: false });

export const DB_HOST = parsed?.DB_HOST ?? 'localhost';
export const DB_PORT = parsed?.DB_PORT ?? 5432;
export const DB_USERNAME = parsed?.DB_USERNAME;
export const DB_PASSWORD = parsed?.DB_PASSWORD;
export const DB_DATABASE = parsed?.DB_DATABASE;
export const DB_SYNCHRONIZE = parsed?.DB_SYNCHRONIZE === '1';
export const DB_LOGGING = parsed?.DB_LOGGING === '1';
export const APP_PORT = parsed?.APP_PORT ?? 3000;
