import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL_NEW) {
  throw new Error("DATABASE_URL_NEW must be provided for ElettrocarNew database");
}

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL_NEW,
  },
});