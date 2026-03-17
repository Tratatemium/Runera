import { useState, useMemo } from "react";
import { FieldConfig } from "../config/inputFields";
import { validateField } from "../validation/validators";

function createInitialState<T extends Record<string, string>>(
  fields: readonly FieldConfig[],
): T {
  return Object.fromEntries(fields.map((f) => [f.id, ""])) as T;
}

function useForm<T extends Record<string, string>>(
  fields: readonly FieldConfig[],
) {
  const fieldMap = useMemo(
    () => Object.fromEntries(fields.map((f) => [f.id, f])),
    [fields],
  );

  const [formData, setFormData] = useState<T>(() => createInitialState(fields));
  const [inputErrors, setInputErrors] = useState<
    Partial<Record<keyof T, string>>
  >({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setInputErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function handleInputBlur(e: React.FocusEvent<HTMLInputElement>) {
    const field = fieldMap[e.target.name];
    const error = validateField(formData, field);
    setInputErrors((prev) => ({ ...prev, [field.id]: error }));
  }

  function handleSubmit(
    e: React.SubmitEvent<HTMLFormElement>,
    callback: (data: T) => void,
  ) {
    e.preventDefault();

    const newErrors: Partial<Record<keyof T, string>> = {};
    fields.forEach((field) => {
      const error = validateField(formData, field);
      if (error) newErrors[field.id as keyof T] = error;
    });
    setInputErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    callback(formData);
  }

  function setServerErrors(errors: Partial<Record<keyof T, string>>) {
    setInputErrors((prev) => ({ ...prev, ...errors }));
  }

  return {
    formData,
    inputErrors,
    setServerErrors,
    handleChange,
    handleInputBlur,
    handleSubmit,
  };
}

export { useForm };
