import type { InputFieldConfig } from "../../types/forms.types";

function useFormValidation() {
  function validateField(
    formData: Record<string, string>,
    field: InputFieldConfig,
  ): string | undefined {
    const value = formData[field.id];
    return field.validator?.(value, formData);
  }

  function validateForm(
    formData: Record<string, string>,
    fields: InputFieldConfig[],
  ): Record<string, string> {
    const entries = fields.map((field) => [
      field.id,
      validateField(formData, field),
    ]);
    return Object.fromEntries(entries);
  }

  return { validateField, validateForm };
}

export { useFormValidation };
