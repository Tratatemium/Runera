import styles from "./Login.module.css";
import runners from "../assets/runners-wide-1.jpg";

import { useAuth } from "../hooks/useAuth";

import { inputFields } from "../config/inputFields";

import { Link } from "react-router-dom";
import { FormField } from "../components/FormField";
import { AuthCard } from "../components/auth/";
import { useAuthContext } from "../context/AuthContext";
import { useFormState } from "../hooks/form/useFormState";
import { useFormHandlers } from "../hooks/form/useFormHandlers";

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

  const { user } = useAuthContext();
  const formStateHook = useFormState(loginFields, user);
  const { formState } = formStateHook;
  const { inputHandlers, handleSubmit } = useFormHandlers(
    loginFields,
    formStateHook,
  );

  const { login, isFetching, formError } = useAuth();

  function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    handleSubmit<LoginForm>(e, async (data) => {
      const loginData = {
        password: data.password,
        ...(data.login?.includes("@")
          ? { email: data.login }
          : { username: data.login }),
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
            value={formState[field.id].value}
            inputError={formState[field.id].error}
            {...inputHandlers}
          />
        ))}
      </AuthCard>
    </main>
  );
}

export { Login };
