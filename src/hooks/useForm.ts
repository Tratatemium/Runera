import { useState } from "react";
import { FieldConfig } from "../config/inputFields";
import { validateField } from "../validation/validators";

function createInitialState<T>(fields: readonly FieldConfig[]): T {
  return Object.fromEntries(fields.map((f) => [f.id, ""])) as T;
}

function useForm<T extends Record<string, string>>(
  fields: readonly FieldConfig[],
) {
  const fieldMap = Object.fromEntries(fields.map((field) => [field.id, field]));

  const [formData, setFormData] = useState<T>(() => createInitialState(fields));
  const [inputErrors, setInputErrors] = useState<
    Record<string, string | undefined>
  >({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleInputBlur(e: React.FocusEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    const error = validateField(formData, name);
    setInputErrors((prev) => ({ ...prev, [name]: error }));
  }

  function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
    callback: (data: T) => void,
  ) {
    e.preventDefault();

    const newErrors = { ...inputErrors };

    Object.entries(formData).forEach(([key, value]) => {
      const field = fieldMap[key];
      if (!value) {
        newErrors[key] = `${field.label} can not be empty`;
      }
    });

    setInputErrors(newErrors);

    const hasInputErrors = Object.values(newErrors).some((v) => v);

    if (hasInputErrors) {
      return;
    }

    callback(formData);
  }

  return { formData, inputErrors, setInputErrors, handleChange, handleInputBlur, handleSubmit };
}

export { useForm };
