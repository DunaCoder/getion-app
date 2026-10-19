import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "npx ts-node prisma/seed.ts", // <-- AQUÍ ES DONDE PRISMA 7 LO EXIGE AHORA
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});