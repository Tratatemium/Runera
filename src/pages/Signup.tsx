import styles from "./Signup.module.css";
import runners from "../assets/runners-wide-3.jpg";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { signupApi } from "../api/auth.api";
import { inputFields } from "../config/inputFields";
import { parseServerError } from "../api/client";

import { Footer } from "../components/Footer";
import { Link } from "react-router-dom";
import { FormField } from "../components/FormField";
import { AuthCard } from "../components/AuthCard";

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
  const navigate = useNavigate();

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
  const [formError, setFormError] = useState<string | undefined>(undefined);

  async function submitSignup(data: SignupForm) {
    const payload = {
      username: data.username,
      email: data.email,
      password: data.password,
    };

    setIsSubmitting(true);
    setFormError(undefined);

    try {
      await signupApi(payload);
      navigate("/login");
    } catch (err) {
      const { fieldErrors, generalError } = parseServerError(err);
      if (fieldErrors) setServerErrors(fieldErrors);
      else if (generalError) setFormError(generalError);
    } finally {
      setIsSubmitting(false);
    }
  }

  function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    handleSubmit(e, submitSignup);
  }

  return (
    <div className={styles.signupPage}>
      <main
        className={styles.signupMain}
        style={{ backgroundImage: `url(${runners})` }}
      >
        <AuthCard
          onSubmit={onSubmit}
          title="Create account"
          subtitle="Start tracking your running journey"
          buttonText="Sign Up"
          footerContent={signupFooter}
          isSubmitting={isSubmitting}
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
      <Footer />
    </div>
  );
}

export { Signup };
