import type { FieldConfig } from "../config/inputFields";
import { inputFields } from "../config/inputFields";

class ValidationError extends Error {
  constructor (message:string) {
    super(message);
    this.name = "ValidationError"
  }
}

function checkEmpty(field: string) {
  if (field.trim() === "") {
    throw new ValidationError("can not be empty.")
  }
}

function validateUsername(username: string) {
  checkEmpty(username);
  const length = username.length;
  if (/^[0-9]/.test(username)) {
    return "Username cannot start with a number.";
  }
  if (length < 4) {
    return "Username must be at least 4 characters.";
  }
  if (length > 20) {
    return "Username cannot exceed 20 characters.";
  }
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  if (!usernameRegex.test(username)) {
    return "Username can only contain letters, numbers, and underscores.";
  }
}

function validateEmail(email: string) {
  if (email.length > 254) {
    return "Email address is too long.";
  }
  if (/\s/.test(email)) {
    return "Email address cannot contain spaces.";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address.";
  }
}

function validatePassword(password: string) {
  const length = password.length;
  if (length < 8) {
    return "Password must be at least 8 characters.";
  }
  if (length > 128) {
    return "Password cannot exceed 128 characters.";
  }
}

function validateConfirmPassword(password: string, confirm?: string) {
  if (password !== confirm) {
    return "Passwords do not match.";
  }
}

function validateLogin(login: string) {
  const length = login.length;
  if (length < 4) {
    return "Login must be at least 4 characters.";
  }
  if (length > 254) {
    return "Password cannot exceed 254 characters.";
  }
}

type FieldName = (typeof inputFields)[number]["id"];

function validateField(formData: Record<string, string>, fieldName: FieldName) {
  const field = inputFields[fieldName];
  const value = formData[fieldName];
  let error: string | undefined;
  if (field.validator) {
    if (field.id === "confirmPassword") {
      error = field.validator(formData.password, value);
    } else {
      error = field.validator(value);
    }
  }
  return error;
}

export {
  validateUsername,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateLogin,
  validateField,
};
