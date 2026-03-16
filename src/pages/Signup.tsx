import styles from "./Signup.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { signup } from "../api/auth.api";
import { inputFields } from "../config/inputFields";

import { Link } from "react-router-dom";
import { FormField } from "../components/FormField";
import { AuthCard } from "../components/AuthCard";

function Signup() {
  const navigate = useNavigate();

  const footerContent = (
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

  type SignupForm = {
    [K in (typeof signupFields)[number]["id"]]: string;
  };

  const { formData, inputErrors, handleChange, handleSubmit } =
    useForm<SignupForm>(signupFields);

  const [isSubmiting, setIsSubmiting] = useState(false);

  async function submitSignup(data: SignupForm) {
    const { username, email, password } = data;
    const payload = { username, email, password };

    setIsSubmiting(true);
    try {
      await signup(payload);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
    setIsSubmiting(false);
  }

  return (
    <div className={styles.signupPage}>
      <main className={styles.signupMain}>
        <AuthCard
          onSubmit={(e) => handleSubmit(e, submitSignup)}
          title="Create account"
          subtitle="Start tracking your running journey"
          action="Sign Up"
          footerContent={footerContent}
          isSubmiting={isSubmiting}
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
              inputError={inputErrors[field.id]}
            />
          ))}
        </AuthCard>
      </main>
    </div>
  );
}

export { Signup };
