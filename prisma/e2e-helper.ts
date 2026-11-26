/**
 * Test-only helper used by the Playwright admin specs (run through tsx, like the seed script).
 *   promote <email>           grant ADMIN to a throwaway test user
 *   cleanup <email> [slug]    delete that test user and, optionally, test content with that slug
 *   purge                     delete ALL leftover test data (users @example.test, destinations/foods/culture/stories/categories with slug e2e-*, images whose Vietnamese alt text starts with e2e-)
 * Safety: only accepts emails ending in @example.test and slugs starting with "e2e-".
 */
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

async function main() {
  const [command, email, slug] = process.argv.slice(2);
  if (command !== "purge" && (!email || !email.endsWith("@example.test"))) throw new Error("Refusing: email must end with @example.test");
  if (slug !== undefined && !slug.startsWith("e2e-")) throw new Error('Refusing: slug must start with "e2e-"');

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL is not set.");
  const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });
  try {
    if (command === "promote") {
      const result = await prisma.user.updateMany({ where: { email }, data: { role: "ADMIN" } });
      if (result.count !== 1) throw new Error(`Expected to promote 1 user, promoted ${result.count}`);
    } else if (command === "purge") {
      const where = { slug: { startsWith: "e2e-" } };
      // Destinations first: a category cannot be deleted while a destination still uses it.
      const d = await prisma.destination.deleteMany({ where });
      const [f, c, st, cat, media, u] = await Promise.all([
        prisma.food.deleteMany({ where }),
        prisma.cultureItem.deleteMany({ where }),
        prisma.story.deleteMany({ where }),
        prisma.category.deleteMany({ where }),
        prisma.mediaAsset.deleteMany({ where: { altVi: { startsWith: "e2e-" } } }),
        prisma.user.deleteMany({ where: { email: { endsWith: "@example.test" } } }),
      ]);
      console.log(
        `Deleted: ${d.count} destinations, ${cat.count} categories, ${media.count} images, ${f.count} foods, ${c.count} culture items, ${st.count} stories, ${u.count} users`,
      );
    } else if (command === "cleanup") {
      if (slug) {
        await Promise.all([
          prisma.food.deleteMany({ where: { slug } }),
          prisma.cultureItem.deleteMany({ where: { slug } }),
          prisma.story.deleteMany({ where: { slug } }),
        ]);
        await prisma.destination.deleteMany({ where: { slug } });
        await prisma.category.deleteMany({ where: { slug } });
        await prisma.mediaAsset.deleteMany({ where: { altVi: slug } });
      }
      await prisma.user.deleteMany({ where: { email } });
    } else {
      throw new Error(`Unknown command: ${command}`);
    }
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
