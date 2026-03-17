import styles from "./Signup.module.css";

import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { signup } from "../api/auth.api";
import { inputFields } from "../config/inputFields";
import { ServerError } from "../api/client";

import { Link } from "react-router-dom";
import { FormField } from "../components/FormField";
import { AuthCard } from "../components/AuthCard";

const signupFooter = (
  <>
    <p>Already have an account?</p>
    <Link to="/login">Log in</Link>
  </>
);

function Signup() {
  const navigate = useNavigate();

  const signupFields = useMemo(
    () =>
      [
        inputFields.username,
        inputFields.email,
        inputFields.password,
        inputFields.confirmPassword,
      ] as const,
    [],
  );

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

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submitSignup(data: SignupForm) {
    const payload = {
      username: data.username,
      email: data.email,
      password: data.password,
    };

    setIsSubmitting(true);

    try {
      await signup(payload);
      navigate("/login");
    } catch (err) {
      if (err instanceof ServerError) {
        const field = err.data.error.field;
        if (err.status === 409 && field) {
          const newError = {
            [field]: `This ${field} already exists`,
          };
          setServerErrors(newError);
        } else {
          console.error(
            `${err.name}: ${err.status} ${JSON.stringify(err.data)}`,
          );
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    handleSubmit(e, submitSignup);
  }

  return (
    <div className={styles.signupPage}>
      <main className={styles.signupMain}>
        <AuthCard
          onSubmit={onSubmit}
          title="Create account"
          subtitle="Start tracking your running journey"
          buttonText="Sign Up"
          footerContent={signupFooter}
          isSubmitting={isSubmitting}
        >
          {signupFields.map((field) => (
            <FormField
              key={field.id}
              id={field.id}
              label={field.label}
              type={field.type}
              placeholder={field.placeholder}
              value={formData[field.id]}
              onChange={handleChange}
              onBlur={handleInputBlur}
              inputError={inputErrors[field.id]}
            />
          ))}
        </AuthCard>
      </main>
    </div>
  );
}

export { Signup };
