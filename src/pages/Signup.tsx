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
          footerContent={footerContent}
        >
          <FormField
            id="username"
            label="Username"
            type="text"
            placeholder="Your username"
          />
          <FormField
            id="email"
            label="Email"
            type="email"
            placeholder="your@email.com"
          />
          <FormField
            id="password"
            label="Password"
            type="password"
            placeholder="Your password"
          />
          <FormField
            id="confirmPassword"
            label="Confirm password"
            type="password"
            placeholder="Re-enter password"
          />
        </AuthCard>
      </main>
    </div>
  );
}

export { Signup };
