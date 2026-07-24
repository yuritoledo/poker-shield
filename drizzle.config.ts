import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/packages/tables/lib/schema.ts",
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: {
    url: "./poker-shield.db",
  },
});
