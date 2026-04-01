import type {
  InputFieldConfig,
  FormStateValue,
  FormAction,
  UseFormStateReturn,
} from "../../types/forms.types";

import { useReducer } from "react";

/* ────────────────────────────── */
/* initial state creator          */
/* ────────────────────────────── */

// function createFieldState(field: InputFieldConfig, user: UserState | null) {
//   const value = user ? getUserValue(user, field.id as UserKey) : undefined;
//   return [field.id, { value: normalizeUserValue(value), error: undefined }];
// }

function createFieldState(
  field: InputFieldConfig,
  initialValues?: Record<string, unknown>,
) {
  const value = initialValues?.[field.id];
  return [
    field.id,
    {
      value: value ?? "",
      error: undefined,
    },
  ];
}

function createInitialState<T extends FormStateValue>(
  fields: readonly InputFieldConfig[],
  initialValues?: Record<string, unknown>,
): T {
  const entries = fields.map((field) => createFieldState(field, initialValues));
  return Object.fromEntries(entries) as T;
}

/* ────────────────────────────── */
/* reducer                        */
/* ────────────────────────────── */

function formReducer(
  state: FormStateValue,
  action: FormAction,
): FormStateValue {
  switch (action.type) {
    case "setValue": {
      const { key, value } = action;
      return {
        ...state,
        [key]: { ...state[key], value: value },
      };
    }
    case "setError": {
      const { key, error } = action;
      return {
        ...state,
        [key]: { ...state[key], error: error },
      };
    }
    case "mergeErrors": {
      return {
        ...state,
        ...Object.keys(action.errors).reduce((acc, key) => {
          if (state[key]) {
            acc[key] = { ...state[key], error: action.errors[key] };
          }
          return acc;
        }, {} as FormStateValue),
      };
    }
    case "reset": {
      return action.state;
    }
    case "clearErrors": {
      return Object.fromEntries(
        Object.entries(state).map(([k, v]) => [k, { ...v, error: undefined }]),
      );
    }
    default:
      return state;
  }
}

/* ────────────────────────────── */
/* useFormState                   */
/* ────────────────────────────── */

function useFormState(
  fields: readonly InputFieldConfig[],
  initialValues?: Record<string, unknown>,
): UseFormStateReturn {
  const [state, dispatch] = useReducer(
    formReducer,
    createInitialState(fields, initialValues),
  );

  const setValue = (key: string, value: string) =>
    dispatch({ type: "setValue", key, value });
  const setError = (key: string, error?: string) =>
    dispatch({ type: "setError", key, error });
  const mergeErrors = (errors: Record<string, string | undefined>) =>
    dispatch({ type: "mergeErrors", errors });
  const resetFormState = () =>
    dispatch({
      type: "reset",
      state: createInitialState(fields, initialValues),
    });
  const clearErrors = () => dispatch({ type: "clearErrors" });

  return {
    formState: state,
    setValue,
    setError,
    mergeErrors,
    resetFormState,
    clearErrors,
  };
}

export { useFormState };
