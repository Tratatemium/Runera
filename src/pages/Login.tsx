import styles from "./Login.module.css";
import runners from "../assets/runners-wide-1.jpg";

import { useForm } from "../hooks/useForm";
import { useAuth } from "../hooks/useAuth";

import { inputFields } from "../config/inputFields";

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
  type LoginForm = {
    [K in (typeof loginFields)[number]["id"]]: string;
  };

  const { formData, inputErrors, handleChange, handleInputBlur, handleSubmit } =
    useForm<LoginForm>(loginFields);

  const { login, isFetching, formError } = useAuth();

  function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    handleSubmit(e, async () => {
      const loginData = {
        password: formData.password,
        ...(formData.login.includes("@")
          ? { email: formData.login }
          : { username: formData.login }),
      };
      await login(loginData);
    });
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
        isSubmitting={isFetching}
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
