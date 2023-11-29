import { z } from 'zod';

export const envs = z
  .object({
    DB_AUTH_TOKEN: z.string(),
  })
  .parse(process.env);
