import * as validators from "../validation/validators";

export type FieldConfig = {
  id: string;
  label: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
  validator?: (input: string) => string | undefined;
};

const inputFields: Record<string, FieldConfig> = {
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
    validator: validators.validatePassword,
  },
  login: {
    id: "login",
    label: "Login",
    type: "text",
    placeholder: "Your username or email",
    validator: validators.validateLogin,
  },
};

export { inputFields };
