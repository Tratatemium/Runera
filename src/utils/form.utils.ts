import type {
  FormStateValue,
  InputFieldConfig,
  NormalizedFormValue,
  FormData,
} from "../types/forms.types";
import { clampNumber } from "./normalize.utils";

function normalizeUserValue(value: string | number | undefined): string {
  return value == null ? "" : String(value);
}

function normalizeEntry(
  key: string,
  value: FormStateValue[string],
  field: InputFieldConfig,
): [string, NormalizedFormValue] {
  return [key, field.normalizator(value.value, field)];
}

function getFormData(
  formState: FormStateValue,
  fieldMap: Record<string, InputFieldConfig>,
): FormData {
  return Object.fromEntries(
    Object.entries(formState).map(([k, v]) =>
      normalizeEntry(k, v, fieldMap[k]),
    ),
  );
}

export { normalizeUserValue, clampNumber, getFormData };
