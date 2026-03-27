import { act } from "@testing-library/react";
import type { InputFieldConfig } from "../../types/forms.types";
import type { UserState } from "../../types/users.types";
import type { UserKey } from "../../utils/user.utils";

import { getUserValue } from "../../utils/user.utils";
import { values } from "lodash";

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

function normalizeValue(value: string | number | undefined): string {
  return value == null ? "" : String(value);
}

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

function mergeErrors(
  state: FormStateValue,
  errors: Record<string, string>,
): FormStateValue {
  return {
    ...state,
    ...Object.keys(errors).reduce((acc, key) => {
      if (state[key]) {
        acc[key] = { ...state[key], error: errors[key] };
      }
      return acc;
    }, {} as FormStateValue),
  };
}

function setValue(
  state: FormStateValue,
  action: Extract<FormAction, { type: "setValue" }>,
): FormStateValue {
  const { key, value } = action;
  return {
    ...state,
    [key]: { ...state[key], value: value },
  };
}

function setError(
  state: FormStateValue,
  action: Extract<FormAction, { type: "setError" }>,
): FormStateValue {
  const { key, error } = action;
  return {
    ...state,
    [key]: { ...state[key], error: error },
  };
}

function useFormState<T extends FormStateValue>(
  fields: readonly InputFieldConfig[],
) {
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
        return mergeErrors(state, action.errors);
      }
      default:
        return state;
    }
  }
  return {};
}

export { useFormState };
