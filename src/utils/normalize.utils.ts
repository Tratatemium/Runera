import type { InputFieldConfig } from "../types/forms.types";

/* ────────────────────────────── */
/* helpers                        */
/* ────────────────────────────── */

function clampNumber(value: string, min?: string, max?: string): string {
  if (value.trim() === "") return value;

  const num = Number(value);
  if (!Number.isFinite(num)) return value;

  const minNum = min !== undefined && min !== "" ? Number(min) : -Infinity;
  const maxNum = max !== undefined && max !== "" ? Number(max) : Infinity;

  return String(Math.min(Math.max(num, minNum), maxNum));
}

function normalizeDate(dateString: string) {
  const date = new Date(dateString);
  return date.toISOString().slice(0, 10);
}

function normalizeTime(dateString: string) {
  const date = new Date(dateString);
  return date.toISOString().slice(0, 19);
}

/* ────────────────────────────── */
/* normalizers                    */
/* ────────────────────────────── */

function normalizeString(value: string, _field: InputFieldConfig): string {
  return value.trim();
}

function normalizeNumber(
  value: string,
  field: InputFieldConfig,
): number | null {
  const trimmed = value.trim();
  if (trimmed === "") return null;
  const num = Number(
    clampNumber(trimmed, field.min?.toString(), field.max?.toString()),
  );
  return Number.isFinite(num) ? num : null;
}

function normalizeEmail(value: string, _field: InputFieldConfig): string {
  return value.trim().toLowerCase();
}

function normalizeLogin(value: string, _field: InputFieldConfig): string {
  return value.includes("@") ? value.trim().toLowerCase() : value.trim();
}

export {
  clampNumber,
  normalizeDate,
  normalizeTime,
  normalizeString,
  normalizeNumber,
  normalizeEmail,
  normalizeLogin,
};
