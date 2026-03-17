import styles from "./Login.module.css";

import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { useForm } from "../hooks/useForm";
import { login } from "../api/auth.api";
import { inputFields } from "../config/inputFields";
import { ServerError } from "../api/client";

import { Link } from "react-router-dom";
import { FormField } from "../components/FormField";
import { AuthCard } from "../components/AuthCard";

const loginFooter = (
  <>
    <p>Don't have an account?</p>
    <Link to="/signup">Sign Up</Link>
  </>
);

function Login() {
  const loginFields = useMemo(
    () => [inputFields.login, inputFields.password] as const,
    [],
  );

  type LoginForm = {
    [K in (typeof loginFields)[number]["id"]]: string;
  };

  const { formData, inputErrors, handleChange, handleSubmit } =
    useForm<LoginForm>(loginFields);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | undefined>(undefined);

  async function submitLogin(data: LoginForm) {
    const loginData: { username?: string; email?: string; password: string } = {
      password: data.password,
    };
    setFormError(undefined);
    if (data.login.includes("@")) {
      loginData.email = data.login;
    } else {
      loginData.username = data.login;
    }
    console.log(loginData);
    setIsSubmitting(true);
    try {
      await login(loginData);
    } catch (error) {
      if (error instanceof ServerError) {
        switch (error.status) {
          case 401:
            setFormError("Invalid combination of login and password.");
            break;
          default:
            setFormError("Something went wrong. Try again later.");
        }
      }
      console.error(error);
    }
    setIsSubmitting(false);
  }

  function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    handleSubmit(e, submitLogin);
  }

  return (
    <div className={styles.loginPage}>
      <main className={styles.loginMain}>
        <AuthCard
          onSubmit={onSubmit}
          title="Welcome Back"
          subtitle="Log in to continue tracking your runs"
          buttonText="Log In"
          footerContent={loginFooter}
          isSubmitting={isSubmitting}
          formError={formError}
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
