import styles from "./Login.module.css";

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

  return (
    <div className={styles.loginPage}>
      <main className={styles.loginMain}>
        <AuthCard
          title="Welcome Back"
          subtitle="Log in to continue tracking your runs"
          action="Log In"
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
        </AuthCard>
      </main>
    </div>
  );
}

export { Login };