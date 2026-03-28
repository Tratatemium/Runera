import {
  FormStateValue,
  InputFieldConfig,
  NormalizedFormValue,
} from "../types/forms.types";

function normalizeUserValue(value: string | number | undefined): string {
  return value == null ? "" : String(value);
}

function clampNumber(value: string, min?: string, max?: string): string {
  if (value.trim() === "") return value;

  const num = Number(value);
  if (!Number.isFinite(num)) return value;

  const minNum = min !== undefined && min !== "" ? Number(min) : -Infinity;
  const maxNum = max !== undefined && max !== "" ? Number(max) : Infinity;

  return String(Math.min(Math.max(num, minNum), maxNum));
}

function normalizeEntry(
  key: string,
  value: FormStateValue[string],
  field: InputFieldConfig,
): [string, NormalizedFormValue] {
  const trimmed = value.value.trim();

  if (field.type === "number") {
    if (trimmed === "") return [key, null];

    const num = Number(clampNumber(trimmed));
    return [key, Number.isFinite(num) ? num : null];
  }

  if (field.type === "email") {
    return [key, trimmed.toLowerCase()];
  }

  return [key, trimmed];
}

function getFormData(
  formState: FormStateValue,
  fieldMap: Record<string, InputFieldConfig>,
): Record<string, NormalizedFormValue> {
  return Object.fromEntries(
    Object.entries(formState).map(([k, v]) =>
      normalizeEntry(k, v, fieldMap[k]),
    ),
  );
}

export { normalizeUserValue, clampNumber, getFormData };
