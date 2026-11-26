import { prisma } from "@/lib/prisma";

/**
 * Serves an uploaded image. The id is a random cuid and the bytes never change for an id,
 * so the response can be cached for a year. The content type comes from the validated upload.
 */
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const asset = await prisma.mediaAsset.findUnique({ where: { id }, select: { data: true, mimeType: true } });
  if (!asset) return new Response("Not found", { status: 404 });

  return new Response(Buffer.from(asset.data), {
    headers: {
      "Content-Type": asset.mimeType,
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
      "Content-Security-Policy": "default-src 'none'; sandbox",
    },
  });
}
