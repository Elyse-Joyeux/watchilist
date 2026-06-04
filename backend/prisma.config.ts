import "dotenv/config";
import { defineConfig, env } from "prisma/config";  // ← import env

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),   // ← use env() not process.env
  },
});