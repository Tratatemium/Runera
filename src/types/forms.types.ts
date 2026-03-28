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
  | { type: "mergeErrors"; errors: Record<string, string> }
  | { type: "reset"; state: FormStateValue }
  | { type: "clearErrors" };

interface UseFormStateReturn {
  formState: FormStateValue;
  setValue: (key: string, value: string) => void;
  setError: (key: string, error?: string) => void;
  mergeErrors: (errors: Record<string, string>) => void;
  resetFormState: () => void;
  clearErrors: () => void;
}

/* ────────────────────────────── */
/* useFormHandlers types          */
/* ────────────────────────────── */

type NormalizedFormValue = string | number | null;

interface UseFormHandlersReturn {
  inputHandlers: {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  };
  onSubmit: (
    e: React.SubmitEvent<HTMLFormElement>,
    callback: (data: Record<string, NormalizedFormValue>) => void,
  ) => void;
}

/* ────────────────────────────── */
/* export                         */
/* ────────────────────────────── */

export type {
  InputFieldConfig,
  FormStateValue,
  FormAction,
  UseFormStateReturn,
  NormalizedFormValue,
  UseFormHandlersReturn,
};
