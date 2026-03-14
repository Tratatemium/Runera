import styles from "./Signup.module.css";

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

  return (
    <div className={styles.signupPage}>
      <main className={styles.signupMain}>
        <AuthCard
          title="Create account"
          subtitle="Start tracking your running journey"
          action="Sign Up"
          footerConent={footerContent}
        >
          <FormField
            id="username"
            label="Username"
            type="text"
            placeholder="Your username"
          ></FormField>
          <FormField
            id="email"
            label="Email"
            type="email"
            placeholder="your@email.com"
          ></FormField>
          <FormField
            id="password"
            label="Password"
            type="text"
            placeholder="Your password"
          ></FormField>
          <FormField
            id="confirmPassword"
            label="Confirm password"
            type="text"
            placeholder="Re-enter password"
          ></FormField>
        </AuthCard>
      </main>
    </div>
  );
}

export { Signup };
