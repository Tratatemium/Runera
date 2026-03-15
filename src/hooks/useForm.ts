import { useState } from "react";
import { FieldConfig } from "../config/inputFields";

function useForm<T extends Record<string, string>>(
  fields: readonly FieldConfig[],
) {
  const [formData, setFormData] = useState<T>(
    Object.fromEntries(fields.map((f) => [f.id, ""])) as T,
  );

  const [inputErrors, setInputErrors] = useState<Record<string, string | undefined>>({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    const field = fields.find((field) => field.id === name);
    const error = field?.validator ? field.validator(value) : undefined;

    setInputErrors((prev) => ({ ...prev, [name]: error }));
  }

  function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
    callback: (data: T) => void,
  ) {
    e.preventDefault();
    callback(formData);
  }

  return { formData, inputErrors, handleChange, handleSubmit };
}

export { useForm };
