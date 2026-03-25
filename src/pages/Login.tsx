import styles from "./Login.module.css";
import runners from "../assets/runners-wide-1.jpg";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "../hooks/useForm";
import { useAuthContext } from "../context/AuthContext";

import { loginApi } from "../api/auth.api";
import * as usersApi from "../api/users.api";
import { mapUserResponseToState } from "../utils/user.utils";

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
  const { loginUser, logoutUser } = useAuthContext();

  type LoginForm = {
    [K in (typeof loginFields)[number]["id"]]: string;
  };

  const { formData, inputErrors, handleChange, handleInputBlur, handleSubmit } =
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
    logoutUser();
    try {
      await loginApi(loginData);

      const userData = await usersApi.getMe();
      loginUser(mapUserResponseToState(userData));

      navigate("/user/dashboard");
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
    <main
      className={styles.main}
      style={{ backgroundImage: `url(${runners})` }}
    >
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
            min={field.min}
            max={field.max}
            step={field.step}
            placeholder={field.placeholder}
            value={formData[field.id]}
            onChange={handleChange}
            onBlur={handleInputBlur}
            inputError={inputErrors[field.id]}
          />
        ))}
      </AuthCard>
    </main>
  );
}

export { Login };
