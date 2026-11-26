import Link from "next/link";

export type ImageOption = { id: string; label: string };

/** Cover image picker used by every admin content form. The image must already be in the media library. */
export function ImageSelect({
  images,
  value,
  error,
}: {
  images: ImageOption[];
  value?: string;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor="imageId" className="text-sm font-medium">
        Ảnh bìa
      </label>
      <select
        id="imageId"
        name="imageId"
        defaultValue={value ?? ""}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? "imageId-error" : "imageId-hint"}
        className="mt-1 h-12 w-full rounded-[10px] border border-border bg-surface px-3 text-base text-foreground sm:w-96"
      >
        <option value="">— Không có ảnh (hiện ảnh minh họa tạm) —</option>
        {images.map((i) => (
          <option key={i.id} value={i.id}>
            {i.label}
          </option>
        ))}
      </select>
      {error ? (
        <p id="imageId-error" role="alert" className="mt-1 text-sm text-primary">
          {error}
        </p>
      ) : (
        <p id="imageId-hint" className="mt-1 text-sm text-muted-foreground">
          Chọn từ thư viện ảnh.{" "}
          <Link href="/admin/media/new" className="underline underline-offset-4">
            Tải ảnh mới lên
          </Link>
        </p>
      )}
    </div>
  );
}
