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
    const field = fieldMap[e.target.name];
    const error = validateField(formData, field);
    setInputErrors((prev) => ({ ...prev, [name]: error }));
  }

  function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
    callback: (data: T) => void,
  ) {
    e.preventDefault();

    const hasInputErrors = Object.values(inputErrors).some((v) => v);
    if (hasInputErrors) return;

    callback(formData);
  }

  return {
    formData,
    inputErrors,
    setInputErrors,
    handleChange,
    handleInputBlur,
    handleSubmit,
  };
}

export { useForm };
