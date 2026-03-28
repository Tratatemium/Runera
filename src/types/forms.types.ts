interface InputFieldConfig {
  id: string;
  label: string;
  type?: "text" | "email" | "password" | "date" | "number";
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  validator?: (value: string, formState: FormStateValue) => string | undefined;
}

/* ────────────────────────────── */
/* useFormState types             */
/* ────────────────────────────── */

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
  | { type: "mergeServerErrors"; errors: Record<string, string> }
  | { type: "reset"; state: FormStateValue }
  | { type: "clearErrors" };

interface UseFormStateReturn {
  formState: FormStateValue;
  setValue: (key: string, value: string) => void;
  setError: (key: string, error?: string) => void;
  mergeServerErrors: (errors: Record<string, string>) => void;
  resetFormState: () => void;
  clearErrors: () => void;
}

export type {
  InputFieldConfig,
  FormStateValue,
  FormAction,
  UseFormStateReturn,
};
