import styles from "./Login.module.css";

import { jwtDecode } from "jwt-decode";
import type { JwtTokenPayload } from "../api/auth.api";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "../hooks/useForm";
import { useAuth } from "../context/AuthContext";
import { loginApi } from "../api/auth.api";
import { inputFields } from "../config/inputFields";
import { parseServerError } from "../api/client";

import { Link } from "react-router-dom";
import { FormField } from "../components/FormField";
import { AuthCard } from "../components/AuthCard";

const loginFooter = (
  <>
    <p>Don't have an account?</p>
    <Link to="/signup">Sign Up</Link>
  </>
);

const loginFields = [inputFields.login, inputFields.password] as const;

function Login() {
  const navigate = useNavigate();
  const { login, logout } = useAuth();

  type LoginForm = {
    [K in (typeof loginFields)[number]["id"]]: string;
  };

  const { formData, inputErrors, handleChange, handleSubmit } =
    useForm<LoginForm>(loginFields);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | undefined>(undefined);

  async function submitLogin(data: LoginForm) {
    const loginData = {
      password: data.password,
      ...(data.login.includes("@")
        ? { email: data.login }
        : { username: data.login }),
    };

    setIsSubmitting(true);
    setFormError(undefined);
    logout();
    try {
      const data = await loginApi(loginData);
      const token = data.token;
      if (typeof token !== "string" || token.trim() === "") {
        setFormError(
          "Unable to log in because the server response was invalid. Please try again.",
        );
        return;
      }

      let decoded: JwtTokenPayload;
      try {
        decoded = jwtDecode(token);
      } catch {
        setFormError(
          "Unable to log in with the received credentials. Please try again.",
        );
        return;
      }

      login({ username: decoded.username });

      navigate("/welcome");
    } catch (err) {
      const { generalError } = parseServerError(err);
      if (generalError) setFormError(generalError);
    } finally {
      setIsSubmitting(false);
    }
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
