import {
  sqliteTable,
  integer,
  text,
  index,
  withReplicas,
} from 'drizzle-orm/sqlite-core';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { v4 as uuidv4 } from 'uuid';
import { envs } from './env';

export const todos = sqliteTable(
  'todos',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => uuidv4()),
    text: text('todo_text').notNull(),
    completed: integer('completed').default(0),
  },
  (table) => {
    return {
      completedIndex: index('completed_index').on(table.completed),
    };
  },
);

const authToken = envs.DB_AUTH_TOKEN;

const writer = drizzle(
  createClient({
    url: 'http://127.0.0.1:8080?tls=0',
    authToken,
  }),
  { logger: true },
);

const reader = drizzle(
  createClient({ url: 'http://127.0.0.1:8081?tls=0', authToken }),
  { logger: true },
);

export const db = withReplicas(writer, [reader]);
