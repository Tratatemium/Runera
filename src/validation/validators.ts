import type { InputFieldConfig } from "../types/forms.types";

import { checkEmpty, checkLength, checkWhitespace } from "./validationUtils";

const USERNAME_REGEX = /^[a-zA-Z0-9_]+$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_REGEX =
  /^[A-Za-z\u00C0-\u024F\u0400-\u04FF]+([ '-][A-Za-z\u00C0-\u024F\u0400-\u04FF]+)*$/;

function validateUsername(value: string, _formData: Record<string, string>) {
  return (
    checkEmpty(value, "Username") ??
    (/^[0-9]/.test(value)
      ? "Username can not start with a number."
      : undefined) ??
    checkLength(value, "Username", 4, 20) ??
    (!USERNAME_REGEX.test(value)
      ? "Username can only contain letters, numbers, and underscores."
      : undefined)
  );
}

function validateEmail(value: string, _formData: Record<string, string>) {
  return (
    checkEmpty(value, "Email") ??
    checkLength(value, "Email", null, 254) ??
    checkWhitespace(value, "Email") ??
    (!EMAIL_REGEX.test(value)
      ? "Please enter a valid email address."
      : undefined)
  );
}

function validatePassword(value: string, _formData: Record<string, string>) {
  return (
    checkEmpty(value, "Password") ??
    checkLength(value, "Password", 8, 128) ??
    checkWhitespace(value, "Password")
  );
}

function validateConfirmPassword(
  value: string,
  formData: Record<string, string>,
) {
  if (formData.password !== value) {
    return "Passwords do not match.";
  }
}

function validateLogin(value: string, _formData: Record<string, string>) {
  return (
    checkEmpty(value, "Login") ??
    checkLength(value, "Login", 4, 254) ??
    checkWhitespace(value, "Login")
  );
}

function validateName(value: string, _formData: Record<string, string>) {
  if (!value) return undefined;
  return (
    checkLength(value, "Name", 2, 50) ??
    (!NAME_REGEX.test(value) ? "Use letters, spaces, ' and - only." : undefined)
  );
}

function validateField(
  formData: Record<string, string>,
  field: InputFieldConfig,
) {
  const value = formData[field.id];
  return field.validator?.(value, formData);
}

export {
  validateUsername,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateLogin,
  validateName,
  validateField,
};
