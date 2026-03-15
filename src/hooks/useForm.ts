import { useState } from "react";

type FieldConfig = {
  id: string;
  label: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
};

function useForm<T extends Record<string, string>>(
  fields: readonly FieldConfig[],
) {
  const [formData, setFormData] = useState<T>(
    Object.fromEntries(fields.map((f) => [f.id, ""])) as T,
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    callback: (data: T) => void,
  ) => {
    e.preventDefault();
    callback(formData);
  };

  return { formData, handleChange, handleSubmit };
}

export { useForm };
