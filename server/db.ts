import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

const dbUrl = process.env.DATABASE_URL_NEW || process.env.DATABASE_URL;
if (!dbUrl) {
  throw new Error(
    "DATABASE_URL or DATABASE_URL_NEW must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({ connectionString: dbUrl });
export const db = drizzle({ client: pool, schema });