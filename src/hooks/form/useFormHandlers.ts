import type {
  FormData,
  InputFieldConfig,
  UseFormHandlersReturn,
  UseFormStateReturn,
} from "../../types/forms.types";

import { validateField, validateForm } from "../../validation/formValidation";
import { useMemo } from "react";
import { getFormData } from "../../utils/form.utils";
import { clampNumber } from "../../utils/normalize.utils";

function useFormHandlers(
  fields: readonly InputFieldConfig[],
  {
    formState,
    setValue,
    setError,
    mergeErrors,
    clearErrors,
  }: UseFormStateReturn,
): UseFormHandlersReturn {
  const fieldMap = useMemo(
    () => Object.fromEntries(fields.map((field) => [field.id, field])),
    [fields],
  );

  function onChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = e.currentTarget;
    setValue(name, value);
  }

  function onFocus(e: React.FocusEvent<HTMLInputElement>): void {
    setError(e.currentTarget.name, undefined);
  }

  function onBlur(e: React.FocusEvent<HTMLInputElement>): void {
    const input = e.currentTarget;
    const name = input.name;
    const value =
      input.type === "number"
        ? clampNumber(input.value, input.min, input.max)
        : input.value;

    const field = fieldMap[name];
    const error = validateField(field, {
      ...formState,
      [name]: { ...formState[name], value },
    });

    setValue(name, value);
    setError(name, error);
  }

  function handleSubmit<T>(
    e: React.SubmitEvent<HTMLFormElement>,
    callback: (data: T) => void,
  ): void {
    e.preventDefault();
    const errors = validateForm(fields, formState);
    const hasErrors = Object.values(errors).some((v) => v !== undefined);
    if (hasErrors) {
      clearErrors();
      mergeErrors(errors);
      return;
    }
    const data = getFormData(formState, fieldMap) as T;
    callback(data);
  }

  return {
    inputHandlers: {
      onChange,
      onBlur,
      onFocus,
    },
    handleSubmit,
  };
}

export { useFormHandlers };
