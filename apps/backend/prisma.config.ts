// The Prisma CLI evaluates this file itself (outside Bun's runtime), so .env is not loaded
// automatically here. dotenv fills process.env.DATABASE_URL before the config below reads it.
// Must stay a direct dependency of apps/backend: bun installs packages isolated per workspace,
// so a package only reachable through another dependency can't be imported from here.
import 'dotenv/config';
// definePrismaConfig is the Prisma 8 top-level config wrapper. It lives in @prisma/cli-engine,
// a dependency of the `prisma` CLI, so it is also listed as a devDependency for the same reason.
import { definePrismaConfig } from "@prisma/cli-engine";
import { defineConfig as ormConfig } from '@prisma/orm-postgres/config';
import net from 'node:net';

// The Prisma CLI runs on Node, which gives each resolved IP only 250ms to connect before
// failing with ETIMEDOUT. Reaching Neon (us-east-2) from here takes ~2s, so every attempt
// timed out. Bun has no such limit, which is why the app itself could connect.
net.setDefaultAutoSelectFamilyAttemptTimeout(5000);

export default definePrismaConfig({
  orm: ormConfig({
    contract: "./src/prisma/contract.prisma",
    db: {
      connection: process.env['DATABASE_URL']!,
    },
  }),
});
