"use client";

import Link from "next/link";
import { useActionState, type ReactNode } from "react";
import { ImageSelect, type ImageOption } from "@/components/admin/image-select";
import { saveContentAction, type ContentFormState } from "@/lib/admin/content-actions";
import { KIND_CONFIG, type ContentKind } from "@/lib/admin/content-kinds";

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

export function ContentForm({
  kind,
  images,
  initialValues,
  contentId,
}: {
  kind: ContentKind;
  images: ImageOption[];
  initialValues: Record<string, string>;
  /** Present when editing; empty when creating. */
  contentId?: string;
}) {
  const config = KIND_CONFIG[kind];
  const [state, formAction, pending] = useActionState<ContentFormState, FormData>(saveContentAction, {});
  const v = state.values ?? initialValues;
  const errors = state.fieldErrors ?? {};
  const invalid = (name: string) => (errors[name] ? true : undefined);
  const described = (name: string) => (errors[name] ? `${name}-error` : undefined);
  const bodyHint = "Mỗi đoạn cách nhau một dòng trống.";

  return (
    <form action={formAction} noValidate className="mt-8 max-w-3xl space-y-6">
      <input type="hidden" name="kind" value={kind} />
      {contentId && <input type="hidden" name="id" value={contentId} />}

      {state.error && (
        <p role="alert" className="rounded-[10px] border border-border bg-surface p-3 text-sm text-primary">
          {state.error}
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="slug" label="Slug (đường dẫn)" error={errors.slug} hint="Chữ thường, số và dấu gạch ngang.">
          <input
            id="slug"
            name="slug"
            defaultValue={v.slug}
            aria-invalid={invalid("slug")}
            aria-describedby={described("slug")}
            className={`${inputClass} h-12`}
          />
        </Field>
        <Field id="status" label="Trạng thái" error={errors.status}>
          <select id="status" name="status" defaultValue={v.status || "DRAFT"} className={`${inputClass} h-12`}>
            <option value="DRAFT">Nháp (ẩn với khách)</option>
            <option value="PUBLISHED">Xuất bản (hiện công khai)</option>
          </select>
        </Field>
      </div>

      <ImageSelect images={images} value={v.imageId} error={errors.imageId} />

      <fieldset className="space-y-6 rounded-[16px] border border-border p-5">
        <legend className="px-2 font-serif text-xl">Tiếng Việt (bắt buộc)</legend>
        <Field id="nameVi" label={`${config.nameLabel} (tiếng Việt)`} error={errors.nameVi}>
          <input
            id="nameVi"
            name="nameVi"
            defaultValue={v.nameVi}
            aria-invalid={invalid("nameVi")}
            aria-describedby={described("nameVi")}
            className={`${inputClass} h-12`}
          />
        </Field>
        <Field
          id="summaryVi"
          label={`${config.summaryLabel} (tiếng Việt)`}
          error={errors.summaryVi}
          hint={kind === "food" ? "Tùy chọn." : undefined}
        >
          <textarea
            id="summaryVi"
            name="summaryVi"
            rows={3}
            defaultValue={v.summaryVi}
            aria-invalid={invalid("summaryVi")}
            aria-describedby={described("summaryVi")}
            className={`${inputClass} py-2`}
          />
        </Field>
        {config.hasBody && (
          <Field id="bodyVi" label="Nội dung (tiếng Việt)" error={errors.bodyVi} hint={bodyHint}>
            <textarea
              id="bodyVi"
              name="bodyVi"
              rows={10}
              defaultValue={v.bodyVi}
              aria-invalid={invalid("bodyVi")}
              aria-describedby={described("bodyVi")}
              className={`${inputClass} py-2`}
            />
          </Field>
        )}
      </fieldset>

      <fieldset className="space-y-6 rounded-[16px] border border-border p-5">
        <legend className="px-2 font-serif text-xl">Tiếng Anh (tùy chọn)</legend>
        <Field id="nameEn" label={`${config.nameLabel} (tiếng Anh)`} error={errors.nameEn}>
          <input
            id="nameEn"
            name="nameEn"
            defaultValue={v.nameEn}
            aria-invalid={invalid("nameEn")}
            aria-describedby={described("nameEn")}
            className={`${inputClass} h-12`}
          />
        </Field>
        <Field id="summaryEn" label={`${config.summaryLabel} (tiếng Anh)`} error={errors.summaryEn}>
          <textarea
            id="summaryEn"
            name="summaryEn"
            rows={3}
            defaultValue={v.summaryEn}
            aria-invalid={invalid("summaryEn")}
            aria-describedby={described("summaryEn")}
            className={`${inputClass} py-2`}
          />
        </Field>
        {config.hasBody && (
          <Field id="bodyEn" label="Nội dung (tiếng Anh)" error={errors.bodyEn} hint={bodyHint}>
            <textarea
              id="bodyEn"
              name="bodyEn"
              rows={8}
              defaultValue={v.bodyEn}
              aria-invalid={invalid("bodyEn")}
              aria-describedby={described("bodyEn")}
              className={`${inputClass} py-2`}
            />
          </Field>
        )}
      </fieldset>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-12 items-center justify-center rounded-[10px] bg-primary px-6 font-medium text-primary-foreground disabled:opacity-60"
        >
          {pending ? "Đang lưu…" : config.saveLabel}
        </button>
        <Link
          href={`/admin/${config.path}`}
          className="inline-flex min-h-12 items-center rounded-[10px] border border-border px-6 font-medium"
        >
          Hủy
        </Link>
      </div>
    </form>
  );
}
