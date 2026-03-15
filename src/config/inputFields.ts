export type FieldConfig = {
  id: string;
  label: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
};

const inputFields: Record<string, FieldConfig> = {
  username: {
    id: "username",
    label: "Username",
    type: "text",
    placeholder: "Your username",
  },
  email: {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "your@email.com",
  },
  password: {
    id: "password",
    label: "Password",
    type: "password",
    placeholder: "Your password",
  },
  confirmPassword: {
    id: "confirmPassword",
    label: "Confirm password",
    type: "password",
    placeholder: "Re-enter password",
  },
  login: {
    id: "login",
    label: "Login",
    type: "text",
    placeholder: "Your username or email",
  },
};

export { inputFields };
