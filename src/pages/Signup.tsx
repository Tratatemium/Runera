import styles from "./Signup.module.css";
import runners from "../assets/runners-wide-3.jpg";

import { useForm } from "../hooks/useForm";
import { inputFields } from "../config/inputFields";

import { Link } from "react-router-dom";
import { FormField } from "../components/FormField";
import { AuthCard } from "../components/AuthCard";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

const signupFooter = (
  <>
    <p>Already have an account?</p>
    <Link to="/login">Log in</Link>
  </>
);

const signupFields = [
  inputFields.username,
  inputFields.email,
  inputFields.password,
  inputFields.confirmPassword,
] as const;

function Signup() {
  type SignupForm = {
    [K in (typeof signupFields)[number]["id"]]: string;
  };

  const {
    formData,
    inputErrors,
    setServerErrors,
    handleChange,
    handleInputBlur,
    handleSubmit,
  } = useForm<SignupForm>(signupFields);

  const { signup, isFetching, fieldError, formError } = useAuth();

  function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    handleSubmit(e, async (data) => {
      const payload = {
        username: data.username,
        email: data.email,
        password: data.password,
      };
      await signup(payload);
    });
  }

  useEffect(() => {
    if (fieldError) setServerErrors(fieldError);
  }, [fieldError]);

  return (
    <main
      className={styles.main}
      style={{ backgroundImage: `url(${runners})` }}
    >
      <AuthCard
        onSubmit={onSubmit}
        title="Create account"
        subtitle="Start tracking your running journey"
        buttonText="Sign Up"
        footerContent={signupFooter}
        isSubmitting={isFetching}
        formError={formError}
      >
        {signupFields.map((field) => (
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

export { Signup };
