import * as validators from "../validation/validators";

export type FieldConfig = {
  id: string;
  label: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
  validator?: (input: string, input2?: string) => void;
};

const inputFields: Record<string, FieldConfig> = {
  username: {
    id: "username",
    label: "Username",
    type: "text",
    placeholder: "Your username",
    validator: function (value) {
      validators.validateUsername(value, this);
    },
  },
  email: {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "your@email.com",
    validator: function (value) {
      validators.validateEmail(value, this);
    },
  },
  password: {
    id: "password",
    label: "Password",
    type: "password",
    placeholder: "Your password",
    validator: function (value) {
      validators.validatePassword(value, this);
    },
  },
  confirmPassword: {
    id: "confirmPassword",
    label: "Confirm password",
    type: "password",
    placeholder: "Re-enter password",
    validator: function (value1, value2) {
      validators.validateConfirmPassword(value1, value2);
    },
  },
  login: {
    id: "login",
    label: "Login",
    type: "text",
    placeholder: "Your username or email",
    validator: function (value) {
      validators.validateLogin(value, this);
    },
  },
};

export { inputFields };
