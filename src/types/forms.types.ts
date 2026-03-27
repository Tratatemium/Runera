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

type FormStateValue = Record<
  string,
  {
    value: string;
    error?: string;
  }
>;

type FormAction =
  | { type: "setValue"; key: string; value: string }
  | { type: "setError"; key: string; error?: string }
  | { type: "mergeServerErrors"; errors: Record<string, string> };

export type { InputFieldConfig, FormStateValue, FormAction };
