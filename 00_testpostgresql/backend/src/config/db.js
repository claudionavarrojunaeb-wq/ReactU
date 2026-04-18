import { Pool } from "pg";

export const pool = new Pool({
  user: "test",
  host: "10.162.14.62",
  database: "test",
  password: "test",
  port: 5432,
});