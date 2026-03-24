interface InputFieldConfig {
  id: string;
  label: string;
  type?: "text" | "email" | "password" | "date" | "number";
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  validator?: (
    value: string,
    formData: Record<string, string>,
  ) => string | undefined;
}

export type { InputFieldConfig };
