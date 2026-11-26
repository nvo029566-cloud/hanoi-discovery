"use client";

import Link from "next/link";
import { useActionState, type ReactNode } from "react";
import { uploadMediaAction, type MediaFormState } from "@/lib/admin/media-actions";

const inputClass = "mt-1 w-full rounded-[10px] border border-border bg-surface px-3 text-base text-foreground";

function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-sm text-muted-foreground">{hint}</p>}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-sm text-primary">
          {error}
        </p>
      )}
    </div>
  );
}

export function MediaForm() {
  const [state, formAction, pending] = useActionState<MediaFormState, FormData>(uploadMediaAction, {});
  const v = state.values ?? {};
  const errors = state.fieldErrors ?? {};
  const invalid = (name: string) => (errors[name] ? true : undefined);
  const described = (name: string) => (errors[name] ? `${name}-error` : undefined);

  return (
    <form action={formAction} noValidate className="mt-8 max-w-3xl space-y-6">
      {state.error && (
        <p role="alert" className="rounded-[10px] border border-border bg-surface p-3 text-sm text-primary">
          {state.error}
        </p>
      )}

      <Field id="file" label="Tệp ảnh" error={errors.file} hint="JPEG, PNG hoặc WebP, tối đa 2 MB.">
        <input
          id="file"
          name="file"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          aria-invalid={invalid("file")}
          aria-describedby={described("file")}
          className={`${inputClass} py-3`}
        />
      </Field>

      <fieldset className="space-y-6 rounded-[16px] border border-border p-5">
        <legend className="px-2 font-serif text-xl">Mô tả ảnh (alt)</legend>
        <Field
          id="altVi"
          label="Mô tả ảnh (tiếng Việt)"
          error={errors.altVi}
          hint="Mô tả điều nhìn thấy trong ảnh, cho người dùng trình đọc màn hình."
        >
          <input
            id="altVi"
            name="altVi"
            defaultValue={v.altVi}
            aria-invalid={invalid("altVi")}
            aria-describedby={described("altVi")}
            className={`${inputClass} h-12`}
          />
        </Field>
        <Field id="altEn" label="Mô tả ảnh (tiếng Anh)" error={errors.altEn} hint="Tùy chọn.">
          <input
            id="altEn"
            name="altEn"
            defaultValue={v.altEn}
            aria-invalid={invalid("altEn")}
            aria-describedby={described("altEn")}
            className={`${inputClass} h-12`}
          />
        </Field>
      </fieldset>

      <fieldset className="space-y-6 rounded-[16px] border border-border p-5">
        <legend className="px-2 font-serif text-xl">Bản quyền (bắt buộc)</legend>
        <Field id="credit" label="Tác giả hoặc chủ sở hữu" error={errors.credit}>
          <input
            id="credit"
            name="credit"
            defaultValue={v.credit}
            aria-invalid={invalid("credit")}
            aria-describedby={described("credit")}
            className={`${inputClass} h-12`}
          />
        </Field>
        <Field
          id="license"
          label="Giấy phép hoặc quyền sử dụng"
          error={errors.license}
          hint="Ví dụ: CC BY 4.0, Ảnh tự chụp, Được phép sử dụng."
        >
          <input
            id="license"
            name="license"
            defaultValue={v.license}
            aria-invalid={invalid("license")}
            aria-describedby={described("license")}
            className={`${inputClass} h-12`}
          />
        </Field>
        <Field id="sourceUrl" label="Đường dẫn nguồn" error={errors.sourceUrl} hint="Tùy chọn.">
          <input
            id="sourceUrl"
            name="sourceUrl"
            defaultValue={v.sourceUrl}
            aria-invalid={invalid("sourceUrl")}
            aria-describedby={described("sourceUrl")}
            className={`${inputClass} h-12`}
          />
        </Field>
      </fieldset>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-12 items-center justify-center rounded-[10px] bg-primary px-6 font-medium text-primary-foreground disabled:opacity-60"
        >
          {pending ? "Đang tải lên…" : "Tải ảnh lên"}
        </button>
        <Link href="/admin/media" className="inline-flex min-h-12 items-center rounded-[10px] border border-border px-6 font-medium">
          Hủy
        </Link>
      </div>
    </form>
  );
}
