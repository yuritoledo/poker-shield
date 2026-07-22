// Entry point for the tables/package.
// Public API — outside code imports from here, never from lib/.

export { createDb, type TablesSchema } from "./lib/db";
export * from "./lib/schema";
