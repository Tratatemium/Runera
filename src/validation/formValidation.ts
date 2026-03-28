import type { InputFieldConfig } from "../types/forms.types";
import type { FormStateValue } from "../types/forms.types";

function validateField(
  formState: FormStateValue,
  field: InputFieldConfig,
): string | undefined {
  const value = formState[field.id].value;
  return field.validator?.(value, formState);
}

function validateForm(
  formState: FormStateValue,
  fields: InputFieldConfig[],
): Record<string, string> {
  const entries = fields.map((field) => [
    field.id,
    validateField(formState, field),
  ]);
  return Object.fromEntries(entries);
}

export { validateField, validateForm };
