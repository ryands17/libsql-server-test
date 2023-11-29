import { Config } from 'drizzle-kit';
import { envs } from './src/env';

export default {
  schema: './src/schema.ts',
  out: './migrations',
  driver: 'turso',
  dbCredentials: {
    url: 'http://127.0.0.1:8080',
    authToken: envs.DB_AUTH_TOKEN,
  },
  // Print all SQL statements
  verbose: true,
  // Always ask for confirmation
  strict: true,
} satisfies Config;
