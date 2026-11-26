"use client";

import Link from "next/link";
import { useActionState, type ReactNode } from "react";
import { saveCategoryAction, type CategoryFormState } from "@/lib/admin/category-actions";

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

export function CategoryForm({
  initialValues,
  categoryId,
}: {
  initialValues: Record<string, string>;
  /** Present when editing; empty when creating. */
  categoryId?: string;
}) {
  const [state, formAction, pending] = useActionState<CategoryFormState, FormData>(saveCategoryAction, {});
  const v = state.values ?? initialValues;
  const errors = state.fieldErrors ?? {};
  const invalid = (name: string) => (errors[name] ? true : undefined);
  const described = (name: string) => (errors[name] ? `${name}-error` : undefined);

  return (
    <form action={formAction} noValidate className="mt-8 max-w-3xl space-y-6">
      {categoryId && <input type="hidden" name="id" value={categoryId} />}

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
        <Field
          id="sortOrder"
          label="Thứ tự hiển thị"
          error={errors.sortOrder}
          hint="Số nhỏ hiển thị trước (0 đến 999)."
        >
          <input
            id="sortOrder"
            name="sortOrder"
            inputMode="numeric"
            defaultValue={v.sortOrder}
            aria-invalid={invalid("sortOrder")}
            aria-describedby={described("sortOrder")}
            className={`${inputClass} h-12`}
          />
        </Field>
      </div>

      <fieldset className="space-y-6 rounded-[16px] border border-border p-5">
        <legend className="px-2 font-serif text-xl">Tiếng Việt (bắt buộc)</legend>
        <Field id="nameVi" label="Tên danh mục (tiếng Việt)" error={errors.nameVi}>
          <input
            id="nameVi"
            name="nameVi"
            defaultValue={v.nameVi}
            aria-invalid={invalid("nameVi")}
            aria-describedby={described("nameVi")}
            className={`${inputClass} h-12`}
          />
        </Field>
        <Field id="descriptionVi" label="Mô tả (tiếng Việt)" error={errors.descriptionVi}>
          <textarea
            id="descriptionVi"
            name="descriptionVi"
            rows={3}
            defaultValue={v.descriptionVi}
            aria-invalid={invalid("descriptionVi")}
            aria-describedby={described("descriptionVi")}
            className={`${inputClass} py-2`}
          />
        </Field>
      </fieldset>

      <fieldset className="space-y-6 rounded-[16px] border border-border p-5">
        <legend className="px-2 font-serif text-xl">Tiếng Anh (tùy chọn)</legend>
        <Field id="nameEn" label="Tên danh mục (tiếng Anh)" error={errors.nameEn}>
          <input
            id="nameEn"
            name="nameEn"
            defaultValue={v.nameEn}
            aria-invalid={invalid("nameEn")}
            aria-describedby={described("nameEn")}
            className={`${inputClass} h-12`}
          />
        </Field>
        <Field id="descriptionEn" label="Mô tả (tiếng Anh)" error={errors.descriptionEn}>
          <textarea
            id="descriptionEn"
            name="descriptionEn"
            rows={3}
            defaultValue={v.descriptionEn}
            aria-invalid={invalid("descriptionEn")}
            aria-describedby={described("descriptionEn")}
            className={`${inputClass} py-2`}
          />
        </Field>
      </fieldset>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-12 items-center justify-center rounded-[10px] bg-primary px-6 font-medium text-primary-foreground disabled:opacity-60"
        >
          {pending ? "Đang lưu…" : "Lưu danh mục"}
        </button>
        <Link
          href="/admin/categories"
          className="inline-flex min-h-12 items-center rounded-[10px] border border-border px-6 font-medium"
        >
          Hủy
        </Link>
      </div>
    </form>
  );
}
