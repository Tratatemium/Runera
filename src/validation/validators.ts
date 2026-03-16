import type { FieldConfig } from "../config/inputFields";
class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

function checkEmpty(value: string, field: FieldConfig) {
  if (value.trim() === "") {
    throw new ValidationError(`${field.label} can not be empty.`);
  }
}

function checkLength(
  value: string,
  field: FieldConfig,
  min: number | null,
  max: number | null,
) {
  const length = value.length;
  if (min !== null && length < min) {
    throw new ValidationError(
      `${field.label} must be at least ${min} characters.`,
    );
  }
  if (max !== null && length > max) {
    throw new ValidationError(
      `${field.label} cannot exceed ${max} characters.`,
    );
  }
}

function checkWhitespace(value: string, field: FieldConfig) {
  if (/\s/.test(value)) {
    throw new ValidationError(`${field.label} cannot contain spaces.`);
  }
}

function validateUsername(value: string, field: FieldConfig) {
  checkEmpty(value, field);

  if (/^[0-9]/.test(value)) {
    throw new ValidationError(`${field.label} can not start with a number.`);
  }

  checkLength(value, field, 4, 20);

  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  if (!usernameRegex.test(value)) {
    throw new ValidationError(
      `${field.label} can only contain letters, numbers, and underscores.`,
    );
  }
}

function validateEmail(value: string, field: FieldConfig) {
  checkEmpty(value, field);
  checkLength(value, field, null, 254);
  checkWhitespace(value, field);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    throw new ValidationError("Please enter a valid email address.");
  }
}

function validatePassword(value: string, field: FieldConfig) {
  checkEmpty(value, field);
  checkLength(value, field, 8, 128);
  checkWhitespace(value, field);
}

function validateConfirmPassword(password: string, confirm?: string) {
  if (password !== confirm) {
    throw new ValidationError("Passwords do not match.");
  }
}

function validateLogin(value: string, field: FieldConfig) {
  checkEmpty(value, field);
  checkLength(value, field, 4, 254);
  checkWhitespace(value, field);
}

function validateField(formData: Record<string, string>, field: FieldConfig) {
  const value = formData[field.id];
  let error: string | undefined;
  if (field.validator) {
    try {
      if (field.id === "confirmPassword") {
        field.validator(formData.password, value);
      } else {
        field.validator(value);
      }
    } catch (err) {
      if (err instanceof ValidationError) {
        error = err.message;
      } else {
        throw err;
      }
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
