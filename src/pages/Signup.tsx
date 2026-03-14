import styles from "./Signup.module.css";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";

import { Logo } from "../components/Logo";
import { FormField } from "../components/FormField";
import { Button } from "../components/Button";

type SignupField = "username" | "email" | "password" | "confirmPassword";

type SignupValues = Record<SignupField, string>;
type SignupErrors = Partial<Record<SignupField, string>>;

const initialValues: SignupValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function validateSignup(values: SignupValues): SignupErrors {
  const errors: SignupErrors = {};

  if (values.username.trim().length < 3) {
    errors.username = "Username must be at least 3 characters.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  } else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(values.password)) {
    errors.password = "Password must include letters and numbers.";
  }

  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
}

function Signup() {
  const [values, setValues] = useState<SignupValues>(initialValues);
  const [touched, setTouched] = useState<Partial<Record<SignupField, boolean>>>({});
  const [showAllErrors, setShowAllErrors] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);

  const errors = useMemo(() => validateSignup(values), [values]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleBlur(event: ChangeEvent<HTMLInputElement>) {
    const field = event.target.name as SignupField;
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setShowAllErrors(true);
    setTouched({ username: true, email: true, password: true, confirmPassword: true });

    if (Object.keys(errors).length > 0) {
      return;
    }

    // Placeholder for API call.
    window.alert("Signup form is valid. Ready to submit.");
    setValues(initialValues);
    setTouched({});
    setShowAllErrors(false);
  }

  const getFieldError = (field: SignupField): string | undefined => {
    if (!showAllErrors && !touched[field]) {
      return undefined;
    }
    return errors[field];
  };

  return (
    <div className={styles.signupPage}>
      <main className={styles.signupMain}>
        <section className={styles.signupCard} aria-labelledby="signupTitle">
          <header className={styles.signupHeader}>
            <Logo style={"colorStyleSecondary"}></Logo>
            <h1 id="signupTitle" className={styles.signupTitle}>
              Create account
            </h1>
            <p className={styles.signupSubtitle}>
              Start tracking your running journey
            </p>
          </header>

          <form className={styles.signupForm} noValidate onSubmit={handleSubmit}>
            <FormField
              id="username"
              label="Username"
              type="text"
              placeholder="Your username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="username"
              error={getFieldError("username")}
            ></FormField>
            <FormField
              id="email"
              label="Email"
              type="email"
              placeholder="your@email.com"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="email"
              error={getFieldError("email")}
            ></FormField>
            <FormField
              id="password"
              label="Password"
              type={showPasswords ? "text" : "password"}
              placeholder="Your password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="new-password"
              error={getFieldError("password")}
            ></FormField>
            <FormField
              id="confirmPassword"
              label="Confirm password"
              type={showPasswords ? "text" : "password"}
              placeholder="Re-enter password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="new-password"
              error={getFieldError("confirmPassword")}
            ></FormField>

            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() => setShowPasswords((prev) => !prev)}
              aria-pressed={showPasswords}
            >
              {showPasswords ? "Hide password" : "Show password"}
            </button>

            <div className={styles.formActions}>
              <Button buttonText="Sign Up" style="accent1"></Button>
            </div>
          </form>

          <footer className={styles.signupFooter}>
            <p className={styles.footerText}>Already have an account?</p>
            <a href="/login" className={styles.footerLink}>
              Log in
            </a>
          </footer>
        </section>
      </main>
    </div>
  );
}

export { Signup };
