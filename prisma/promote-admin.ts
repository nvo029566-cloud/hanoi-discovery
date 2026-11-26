/**
 * Grants the ADMIN role to an existing user.
 * Usage: npm run admin:promote -- someone@example.com
 * The person must have registered on /register first. No passwords are handled here.
 */
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

async function main() {
  const email = process.argv[2]?.trim().toLowerCase();
  if (!email) {
    console.error("Usage: npm run admin:promote -- <email>");
    process.exitCode = 1;
    return;
  }
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL is not set.");
  const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });
  try {
    const result = await prisma.user.updateMany({ where: { email }, data: { role: "ADMIN" } });
    if (result.count === 0) {
      console.error(`No user with email ${email}. Register on /register first, then run this again.`);
      process.exitCode = 1;
    } else {
      console.log(`OK: ${email} is now ADMIN.`);
    }
  } finally {
    await prisma.$disconnect();
  }
}

void main();
