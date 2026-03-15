import styles from "./Login.module.css";

import { useForm } from "../hooks/useForm";
import { login } from "../api/auth.api";
import { inputFields } from "../config/inputFields";

import { Link } from "react-router-dom";
import { FormField } from "../components/FormField";
import { AuthCard } from "../components/AuthCard";

function Login() {
  const footerContent = (
    <>
      <p>Don't have an account?</p>
      <Link to="/signup">Sign Up</Link>
    </>
  );

  const loginFields = [inputFields.login, inputFields.password] as const;

  type LoginForm = {
    [K in (typeof loginFields)[number]["id"]]: string;
  };

  const { formData, inputErrors, handleChange, handleSubmit } =
    useForm<LoginForm>(loginFields);

  async function submitLogin(data: LoginForm) {
    const loginData: { username?: string; email?: string; password: string } = {
      password: data.password,
    };
    if (data.login.includes("@")) {
      loginData.email = data.login;
    } else {
      loginData.username = data.login;
    }
    console.log(loginData);
    try {
      await login(loginData);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.loginPage}>
      <main className={styles.loginMain}>
        <AuthCard
          onSubmit={(e) => handleSubmit(e, submitLogin)}
          title="Welcome Back"
          subtitle="Log in to continue tracking your runs"
          action="Log In"
          footerContent={footerContent}
        >
          {loginFields.map((field) => (
            <FormField
              key={field.id}
              id={field.id}
              label={field.label}
              type={field.type}
              placeholder={field.placeholder}
              value={formData[field.id]}
              onChange={handleChange}
              inputError={inputErrors[field.id]}
            />
          ))}
        </AuthCard>
      </main>
    </div>
  );
}

export { Login };
