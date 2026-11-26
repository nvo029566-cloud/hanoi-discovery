import { prisma } from "@/lib/prisma";
import type { ImageOption } from "@/components/admin/image-select";

/** Media library entries for the cover image picker (metadata only, never the bytes). */
export async function loadImageOptions(): Promise<ImageOption[]> {
  const rows = await prisma.mediaAsset.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, altVi: true, credit: true },
  });
  return rows.map((r) => ({ id: r.id, label: `${r.altVi} (${r.credit})` }));
}
