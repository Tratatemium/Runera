import type { InputFieldConfig } from "../types/forms.types";

import * as validators from "../validation/validators";
import {
  normalizeString,
  normalizeNumber,
  normalizeEmail,
  normalizeLogin,
} from "../utils/normalize.utils";

const inputFields: Record<string, InputFieldConfig> = {
  username: {
    id: "username",
    label: "Username",
    type: "text",
    placeholder: "Your username",
    validator: validators.validateUsername,
    normalizator: normalizeString,
  },
  email: {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "your@email.com",
    validator: validators.validateEmail,
    normalizator: normalizeEmail,
  },
  password: {
    id: "password",
    label: "Password",
    type: "password",
    placeholder: "Your password",
    validator: validators.validatePassword,
    normalizator: normalizeString,
  },
  confirmPassword: {
    id: "confirmPassword",
    label: "Confirm password",
    type: "password",
    placeholder: "Re-enter password",
    validator: validators.validateConfirmPassword,
    normalizator: normalizeString,
  },
  login: {
    id: "login",
    label: "Login",
    type: "text",
    placeholder: "Your username or email",
    validator: validators.validateLogin,
    normalizator: normalizeLogin,
  },
  firstName: {
    id: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "Your first name",
    validator: validators.validateName,
    normalizator: normalizeString,
  },
  lastName: {
    id: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Your last name",
    validator: validators.validateName,
    normalizator: normalizeString,
  },
  dateOfBirth: {
    id: "dateOfBirth",
    label: "Date of birth",
    type: "date",
    normalizator: normalizeString,
  },
  heightCm: {
    id: "heightCm",
    label: "Height, cm",
    type: "number",
    min: 1,
    max: 300,
    step: 1,
    normalizator: normalizeNumber,
  },
  weightKg: {
    id: "weightKg",
    label: "Weight, kg",
    type: "number",
    min: 1,
    max: 300,
    step: 1,
    normalizator: normalizeNumber,
  },
};

export { inputFields };
