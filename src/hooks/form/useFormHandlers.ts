import type {
  InputFieldConfig,
  NormalizedFormValue,
  UseFormHandlersReturn,
} from "../../types/forms.types";

import { useFormState } from "./useFormState";
import { useAuthContext } from "../../context/AuthContext";
import { validateField, validateForm } from "../../validation/formValidation";
import { useMemo } from "react";
import { clampNumber, getFormData } from "../../utils/form.utils";

function useFormHandlers(fields: InputFieldConfig[]): UseFormHandlersReturn {
  const fieldMap = useMemo(
    () => Object.fromEntries(fields.map((field) => [field.id, field])),
    [fields],
  );

  const { user } = useAuthContext();
  const { formState, setValue, setError, mergeErrors, clearErrors } =
    useFormState(fields, user);

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

  function onSubmit(
    e: React.SubmitEvent<HTMLFormElement>,
    callback: (data: Record<string, NormalizedFormValue>) => void,
  ): void {
    e.preventDefault();
    const errors = validateForm(fields, formState);
    if (Object.keys(errors).length > 0) {
      clearErrors();
      mergeErrors(errors);
      return;
    }
    const data = getFormData(formState, fieldMap);
    callback(data);
  }

  return {
    inputHandlers: {
      onChange,
      onBlur,
      onFocus,
    },
    onSubmit,
  };
}

export { useFormHandlers };
