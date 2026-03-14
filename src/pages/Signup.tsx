import styles from "./Signup.module.css";

import { Link } from "react-router-dom";
import { Logo } from "../components/Logo";
import { FormField } from "../components/FormField";
import { Button } from "../components/Button";

function Signup() {
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

          <form className={styles.signupForm} noValidate>
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

            <div className={styles.formActions}>
              <Button buttonText="Sign Up" style="accent1"></Button>
            </div>
          </form>

          <footer className={styles.signupFooter}>
            <p className={styles.footerText}>Already have an account?</p>
            <Link to="/login">Log in</Link>
          </footer>
        </section>
      </main>
    </div>
  );
}

export { Signup };
