import styles from "./Signup.module.css";

import { useForm } from "../hooks/useForm";
import { signup } from "../api/auth.api";
import { inputFields } from "../config/inputFields";

import { Link } from "react-router-dom";
import { FormField } from "../components/FormField";
import { AuthCard } from "../components/AuthCard";

function Signup() {
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

  async function submitSignup(data: SignupForm) {
    const { username, email, password } = data;
    const payload = { username, email, password };

    try {
      await signup(payload);
    } catch (error) {
      console.error(error);
    }
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
              inputError = {inputErrors[field.id]}
            />
          ))}
        </AuthCard>
      </main>
    </div>
  );
}

export { Signup };
