import { useState } from "react";

type FieldConfig = {
  id: string;
  label: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
};

function useForm<T extends Record<string, string>>(fields: FieldConfig[]) {
  const [formData, setFormData] = useState<T>(
    Object.fromEntries(fields.map((field) => [field.id, ""])) as T,
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(callback: (data: T) => void) {
    (e: React.SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();
      callback(formData);
    };
  }

  return { formData, handleChange, handleSubmit };
}
