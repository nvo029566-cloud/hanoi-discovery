"use client";

import Link from "next/link";
import { useActionState, type ReactNode } from "react";
import { ImageSelect, type ImageOption } from "@/components/admin/image-select";
import { saveDestinationAction, type DestinationFormState } from "@/lib/admin/actions";

export type CategoryOption = { id: string; name: string };

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
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1 text-sm text-muted-foreground">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-sm text-primary">
          {error}
        </p>
      )}
    </div>
  );
}

export function DestinationForm({
  categories,
  images,
  initialValues,
  destinationId,
}: {
  categories: CategoryOption[];
  images: ImageOption[];
  initialValues: Record<string, string>;
  /** Present when editing; empty when creating. */
  destinationId?: string;
}) {
  const [state, formAction, pending] = useActionState<DestinationFormState, FormData>(saveDestinationAction, {});
  const v = state.values ?? initialValues;
  const errors = state.fieldErrors ?? {};
  const invalid = (name: string) => (errors[name] ? true : undefined);
  const described = (name: string) => (errors[name] ? `${name}-error` : undefined);

  return (
    <form action={formAction} noValidate className="mt-8 max-w-3xl space-y-6">
      {destinationId && <input type="hidden" name="id" value={destinationId} />}

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
        <Field id="categoryId" label="Danh mục" error={errors.categoryId}>
          <select
            id="categoryId"
            name="categoryId"
            defaultValue={v.categoryId}
            aria-invalid={invalid("categoryId")}
            aria-describedby={described("categoryId")}
            className={`${inputClass} h-12`}
          >
            <option value="">— Chọn danh mục —</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field id="status" label="Trạng thái" error={errors.status}>
        <select id="status" name="status" defaultValue={v.status || "DRAFT"} className={`${inputClass} h-12 sm:w-72`}>
          <option value="DRAFT">Nháp (ẩn với khách)</option>
          <option value="PUBLISHED">Xuất bản (hiện công khai)</option>
        </select>
      </Field>

      <ImageSelect images={images} value={v.imageId} error={errors.imageId} />

      <fieldset className="space-y-6 rounded-[16px] border border-border p-5">
        <legend className="px-2 font-serif text-xl">Tiếng Việt (bắt buộc)</legend>
        <Field id="nameVi" label="Tên (tiếng Việt)" error={errors.nameVi}>
          <input
            id="nameVi"
            name="nameVi"
            defaultValue={v.nameVi}
            aria-invalid={invalid("nameVi")}
            aria-describedby={described("nameVi")}
            className={`${inputClass} h-12`}
          />
        </Field>
        <Field id="summaryVi" label="Mô tả ngắn (tiếng Việt)" error={errors.summaryVi}>
          <textarea
            id="summaryVi"
            name="summaryVi"
            rows={4}
            defaultValue={v.summaryVi}
            aria-invalid={invalid("summaryVi")}
            aria-describedby={described("summaryVi")}
            className={`${inputClass} py-2`}
          />
        </Field>
      </fieldset>

      <fieldset className="space-y-6 rounded-[16px] border border-border p-5">
        <legend className="px-2 font-serif text-xl">Tiếng Anh (tùy chọn)</legend>
        <Field id="nameEn" label="Tên (tiếng Anh)" error={errors.nameEn}>
          <input
            id="nameEn"
            name="nameEn"
            defaultValue={v.nameEn}
            aria-invalid={invalid("nameEn")}
            aria-describedby={described("nameEn")}
            className={`${inputClass} h-12`}
          />
        </Field>
        <Field id="summaryEn" label="Mô tả ngắn (tiếng Anh)" error={errors.summaryEn}>
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
      </fieldset>

      <fieldset className="space-y-6 rounded-[16px] border border-border p-5">
        <legend className="px-2 font-serif text-xl">Thông tin đã kiểm chứng</legend>
        <p className="text-sm text-muted-foreground">
          Chỉ nhập khi có nguồn đáng tin. Để trống nếu chưa có: hệ thống sẽ không hiển thị gì thay vì đoán. Khi nhập
          tọa độ, giờ mở cửa hoặc giá vé, bắt buộc kèm đường dẫn nguồn.
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          <Field id="latitude" label="Vĩ độ" error={errors.latitude} hint="Ví dụ 21.0285 (dùng dấu chấm).">
            <input
              id="latitude"
              name="latitude"
              inputMode="decimal"
              defaultValue={v.latitude}
              aria-invalid={invalid("latitude")}
              aria-describedby={described("latitude")}
              className={`${inputClass} h-12`}
            />
          </Field>
          <Field id="longitude" label="Kinh độ" error={errors.longitude} hint="Ví dụ 105.8542.">
            <input
              id="longitude"
              name="longitude"
              inputMode="decimal"
              defaultValue={v.longitude}
              aria-invalid={invalid("longitude")}
              aria-describedby={described("longitude")}
              className={`${inputClass} h-12`}
            />
          </Field>
        </div>
        <Field id="openingHours" label="Giờ mở cửa" error={errors.openingHours}>
          <input
            id="openingHours"
            name="openingHours"
            defaultValue={v.openingHours}
            aria-invalid={invalid("openingHours")}
            aria-describedby={described("openingHours")}
            className={`${inputClass} h-12`}
          />
        </Field>
        <Field id="ticketInfo" label="Thông tin vé" error={errors.ticketInfo}>
          <input
            id="ticketInfo"
            name="ticketInfo"
            defaultValue={v.ticketInfo}
            aria-invalid={invalid("ticketInfo")}
            aria-describedby={described("ticketInfo")}
            className={`${inputClass} h-12`}
          />
        </Field>
        <Field id="sourceUrl" label="Nguồn (đường dẫn)" error={errors.sourceUrl} hint="Ví dụ https://...">
          <input
            id="sourceUrl"
            name="sourceUrl"
            inputMode="url"
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
          {pending ? "Đang lưu…" : "Lưu điểm đến"}
        </button>
        <Link
          href="/admin/destinations"
          className="inline-flex min-h-12 items-center rounded-[10px] border border-border px-6 font-medium"
        >
          Hủy
        </Link>
      </div>
    </form>
  );
}
