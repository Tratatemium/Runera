import type {
  FormStateValue,
  InputFieldConfig,
  NormalizedFormValue,
  FormData,
} from "../types/forms.types";
// REVIEW: `clampNumber` is re-exported from this file but it's imported from normalize.utils.
// This barrel re-export is only used inside `useFormHandlers` which already imports from normalize.utils directly.
// The re-export here is redundant and confusing — consumers should import from normalize.utils.
import { clampNumber } from "./normalize.utils";

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

export { clampNumber, getFormData };
