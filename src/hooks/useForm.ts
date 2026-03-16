import { useState } from "react";
import { FieldConfig } from "../config/inputFields";

function useForm<T extends Record<string, string>>(
  fields: readonly FieldConfig[],
) {
  const [formData, setFormData] = useState<T>(
    Object.fromEntries(fields.map((f) => [f.id, ""])) as T,
  );

  const [inputErrors, setInputErrors] = useState<
    Record<string, string | undefined>
  >({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    const field = fields.find((field) => field.id === name);
    // const error = field?.validator ? field.validator(value) : undefined;

    let error: string | undefined;
    if (field?.validator) {
      if (name === "confirmPassword") {
        error = field.validator(formData.password, value);
      } else {
        error = field.validator(value);
      }
    }

    setInputErrors((prev) => ({ ...prev, [name]: error }));
  }

  function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
    callback: (data: T) => void,
  ) {
    e.preventDefault();

    const newErrors = { ...inputErrors };

    Object.entries(formData).forEach(([key, value]) => {
      const field = fields.find((field) => field.id === key);
      if (!value) {
        newErrors[key] = `${field?.label} can not be empty`;
      }
    });

    setInputErrors(newErrors);

    const hasInputErrors = Object.values(newErrors).some((v) => v);

    if (hasInputErrors) {
      return;
    }

    callback(formData);
  }

  return { formData, inputErrors, setInputErrors, handleChange, handleSubmit };
}

export { useForm };
