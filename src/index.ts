import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { writer, reader, todos } from './schema';
import { eq } from 'drizzle-orm';

const SQLiteBoolean = z
  .boolean()
  .default(false)
  .transform((val) => (val ? 1 : 0));

type Filter = 'all' | 'active' | 'completed';

async function fetchTodosV2(filter: Filter = 'all') {
  let query = reader.select().from(todos).$dynamic();

  switch (filter) {
    case 'all':
      break;
    case 'active':
      query = query.where(eq(todos.completed, SQLiteBoolean.parse(false)));
      break;
    case 'completed':
      query = query.where(eq(todos.completed, SQLiteBoolean.parse(true)));
      break;
  }

  const data = await query;
  return data;
}

async function insertTodosV2(values?: (typeof todos.$inferInsert)[]) {
  if (values) {
    const data = await writer.insert(todos).values(values).returning();
    return data;
  }
}

await insertTodosV2();
console.log(await fetchTodosV2('all'));
