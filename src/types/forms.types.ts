interface InputFieldConfig {
  id: string;
  label: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
  validator?: (
    value: string,
    formData: Record<string, string>,
  ) => string | undefined;
}

export type { InputFieldConfig };
