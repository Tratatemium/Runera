interface InputFieldConfig {
  id: string;
  label: string;
  name: string;
  value?: string | number;
  type?:
    | "text"
    | "email"
    | "password"
    | "date"
    | "number"
    | "datetime-local"
    | "range"
    | "radio";
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  validator?: (value: string, formState: FormStateValue) => string | undefined;
  normalizator: (
    value: string,
    field: InputFieldConfig,
  ) => string | number | null | undefined;
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
  | { type: "mergeErrors"; errors: Record<string, string | undefined> }
  | { type: "reset"; state: FormStateValue }
  | { type: "clearErrors" };

interface UseFormStateReturn {
  formState: FormStateValue;
  setValue: (key: string, value: string) => void;
  setError: (key: string, error?: string) => void;
  mergeErrors: (errors: Record<string, string | undefined>) => void;
  resetFormState: () => void;
  resetWithValues: (values?: Record<string, unknown>) => void;
  clearErrors: () => void;
}

/* ────────────────────────────── */
/* useFormHandlers types          */
/* ────────────────────────────── */

type NormalizedFormValue = string | number | null | undefined;
type FormData = Record<string, NormalizedFormValue>;

interface UseUserFormHandlersReturn {
  inputHandlers: {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  };
  handleSubmit: <T>(
    e: React.SubmitEvent<HTMLFormElement>,
    callback: (data: T) => void,
  ) => void;
}

interface UseFormHandlersReturn {
  inputHandlers: {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  };
  handleSubmit: <T>(
    e: React.SubmitEvent<HTMLFormElement>,
    callback: (data: T) => void,
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
  FormData,
  UseUserFormHandlersReturn,
  UseFormHandlersReturn,
};
