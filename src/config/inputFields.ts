import type { InputFieldConfig } from "../types/forms.types";

import * as validators from "../validation/validators";

const inputFields: Record<string, InputFieldConfig> = {
  username: {
    id: "username",
    label: "Username",
    type: "text",
    placeholder: "Your username",
    validator: validators.validateUsername,
  },
  email: {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "your@email.com",
    validator: validators.validateEmail,
  },
  password: {
    id: "password",
    label: "Password",
    type: "password",
    placeholder: "Your password",
    validator: validators.validatePassword,
  },
  confirmPassword: {
    id: "confirmPassword",
    label: "Confirm password",
    type: "password",
    placeholder: "Re-enter password",
    validator: validators.validateConfirmPassword,
  },
  login: {
    id: "login",
    label: "Login",
    type: "text",
    placeholder: "Your username or email",
    validator: validators.validateLogin,
  },
  firstName: {
    id: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "Your first name",
    validator: validators.validateName,
  },
  lastName: {
    id: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Your last name",
    validator: validators.validateName,
  },
  dateOfBirth: {
    id: "dateOfBirth",
    label: "Date of birth",
    type: "date",
    // placeholder: "Your last name",
  },
};

export { inputFields };
