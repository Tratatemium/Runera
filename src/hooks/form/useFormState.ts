import type {
  InputFieldConfig,
  FormStateValue,
  FormAction,
} from "../../types/forms.types";
import type { UserState } from "../../types/users.types";
import type { UserKey } from "../../utils/user.utils";

import { getUserValue } from "../../utils/user.utils";
import { normalizeValue } from "../../utils/form.utils";
import { useReducer } from "react";

/* ────────────────────────────── */
/* initial state creator          */
/* ────────────────────────────── */

function createFieldState(field: InputFieldConfig, user: UserState | null) {
  const value = user ? getUserValue(user, field.id as UserKey) : undefined;
  return [field.id, { value: normalizeValue(value), error: undefined }];
}

function createInitialState<T extends FormStateValue>(
  fields: readonly InputFieldConfig[],
  user: UserState | null,
): T {
  const entries = fields.map((field) => createFieldState(field, user));
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
    case "mergeServerErrors": {
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

function useFormState<T extends FormStateValue>(
  fields: readonly InputFieldConfig[],
  user: UserState,
) {
  const [state, dispatch] = useReducer(
    formReducer,
    createInitialState(fields, user),
  );

  const setValue = (key: string, value: string) =>
    dispatch({ type: "setValue", key, value });
  const setError = (key: string, error?: string) =>
    dispatch({ type: "setError", key, error });
  const mergeServerErrors = (errors: Record<string, string>) =>
    dispatch({ type: "mergeServerErrors", errors });
  const resetFormState = () =>
    dispatch({ type: "reset", state: createInitialState(fields, user) });
  const clearErrors = () => dispatch({ type: "clearErrors" });

  return {
    formState: state,
    setValue,
    setError,
    mergeServerErrors,
    resetFormState,
    clearErrors,
  };
}

export { useFormState };
