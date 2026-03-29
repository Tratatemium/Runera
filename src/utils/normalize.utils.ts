import type { InputFieldConfig } from "../types/forms.types";

function clampNumber(value: string, min?: string, max?: string): string {
  if (value.trim() === "") return value;

  const num = Number(value);
  if (!Number.isFinite(num)) return value;

  const minNum = min !== undefined && min !== "" ? Number(min) : -Infinity;
  const maxNum = max !== undefined && max !== "" ? Number(max) : Infinity;

  return String(Math.min(Math.max(num, minNum), maxNum));
}

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
    clampNumber(trimmed, String(field.min), String(field.max)),
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
  normalizeString,
  normalizeNumber,
  normalizeEmail,
  normalizeLogin,
};
