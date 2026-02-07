import { Pool } from "pg";
import { env } from "./env";

export const db = new Pool({
  connectionString: env.DATABASE_URL
});

export const testDbConnection = async () => {
  const client = await db.connect();
  await client.query("SELECT 1");
  client.release();
};
