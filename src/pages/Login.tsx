import styles from "./Login.module.css";

import { useState } from "react";

import { Link } from "react-router-dom";
import { FormField } from "../components/FormField";
import { AuthCard } from "../components/AuthCard";

function Login() {
  const footerContent = (
    <>
      <p>Don't have an account?</p>
      <Link to="/signup">Sign Up</Link>
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
  ];

  type LoginForm = {
    [K in (typeof inputFields)[number]["id"]]: string;
  };

  const [formData, setFormData] = useState<LoginForm>(
    Object.fromEntries(inputFields.map((field) => [field.id, ""])),
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(formData);
  }

  return (
    <div className={styles.loginPage}>
      <main className={styles.loginMain}>
        <AuthCard
          onSubmit={handleSubmit}
          title="Welcome Back"
          subtitle="Log in to continue tracking your runs"
          action="Log In"
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

export { Login };
