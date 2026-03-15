import styles from "./Signup.module.css";

import { useForm } from "../hooks/useForm";

import { data, Link } from "react-router-dom";
import { FormField } from "../components/FormField";
import { AuthCard } from "../components/AuthCard";

function Signup() {
  const footerContent = (
    <>
      <p>Already have an account?</p>
      <Link to="/login">Log in</Link>
    </>
  );

  const inputFields = [
    {
      id: "username",
      label: "Username",
      type: "text",
      placeholder: "Your username",
    },
    {
      id: "email",
      label: "Email",
      type: "email",
      placeholder: "your@email.com",
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      placeholder: "Your password",
    },
    {
      id: "confirmPassword",
      label: "Confirm password",
      type: "password",
      placeholder: "Re-enter password",
    },
  ] as const;

  type SignupForm = {
    [K in (typeof inputFields)[number]["id"]]: string;
  };

  const { formData, handleChange, handleSubmit } =
    useForm<SignupForm>(inputFields);

  return (
    <div className={styles.signupPage}>
      <main className={styles.signupMain}>
        <AuthCard
          onSubmit={(e) => handleSubmit(e, (data) => console.log(data))}
          title="Create account"
          subtitle="Start tracking your running journey"
          action="Sign Up"
          footerContent={footerContent}
        >
          {inputFields.map((field) => (
            <FormField
              key={field.id}
              id={field.id}
              label={field.label}
              type={field.type}
              placeholder={field.placeholder}
              value={formData[field.id]}
              onChange={handleChange}
            />
          ))}
        </AuthCard>
      </main>
    </div>
  );
}

export { Signup };
