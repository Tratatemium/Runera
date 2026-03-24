import type { InputFieldConfig } from "../types/forms.types";

import { useState, useMemo } from "react";
import { validateField } from "../validation/validators";

function createInitialState<T extends Record<string, string>>(
  fields: readonly InputFieldConfig[],
): T {
  return Object.fromEntries(fields.map((f) => [f.id, ""])) as T;
}

function useForm<T extends Record<string, string>>(
  fields: readonly InputFieldConfig[],
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

  function handleInputFocus(e: React.FocusEvent<HTMLInputElement>) {
    const field = fieldMap[e.target.name];
    setInputErrors((prev) => ({ ...prev, [field.id]: undefined }));
  }

  function handleInputBlur(e: React.FocusEvent<HTMLInputElement>) {
    const input = e.currentTarget;

    let value = input.value;

    if (input.type === "number") {
      const num = Number(value);
      console.log(input.max)

      if (input.min) value = String(Math.max(num, Number(input.min)));
      if (input.max !== "") {
        console.log("bop")
        value = String(Math.min(Number(value), Number(input.max)))
      };
    }

    const field = fieldMap[input.name];

    setFormData((prev) => {
      const next = { ...prev, [input.name]: value };

      const error = validateField(next, field);

      setInputErrors((errors) => ({
        ...errors,
        [field.id]: error,
      }));

      return next;
    });
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
    handleInputFocus,
    handleInputBlur,
    handleSubmit,
  };
}

export { useForm };
