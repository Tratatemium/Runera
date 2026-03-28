import type { InputFieldConfig } from "../../types/forms.types";

import { useFormState } from "./useFormState";
import { useAuthContext } from "../../context/AuthContext";
import { validateField, validateForm } from "../../validation/formValidation";
import { useMemo } from "react";
import { getClampedNumber } from "../../utils/form.utils";

function useForm(fields: InputFieldConfig[]) {
  const fieldMap = useMemo(
    () => Object.fromEntries(fields.map((field) => [field.id, field])),
    [fields],
  );

  const { user } = useAuthContext();
  const {
    formState,
    setValue,
    setError,
    mergeServerErrors,
    resetFormState,
    clearErrors,
  } = useFormState(fields, user);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = e.currentTarget;
    setValue(name, value);
  }

  function handleInputFocus(e: React.FocusEvent<HTMLInputElement>): void {
    setError(e.currentTarget.name, undefined);
  }

  function handleInputBlur(e: React.FocusEvent<HTMLInputElement>): void {
    const input = e.target;
    const name = input.name;
    const value =
      input.type === "number" ? getClampedNumber(input) : input.value;

    setValue(name, value);

    const field = fieldMap[input.name];
    setError(name, validateField(field, formState));
  }

  function handleSubmit(
    e: React.SubmitEvent<HTMLFormElement>,
    callback: (data: Record<string, string>) => void,
  ): void {}

  return {
    handleInputChange,
    handleInputFocus,
    handleInputBlur,
    handleSubmit,
  };
}

export { useForm };
