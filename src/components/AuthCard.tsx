import styles from "./AuthCard.module.css";

import { Logo } from "./Logo";
import { Button } from "./Button";

interface AuthCardProps {
  children?: React.ReactNode;
  title: string;
  subtitle: string;
  action: string;
  footerConent?: React.ReactNode;
}

function AuthCard({ children, title, subtitle, action, footerConent }: AuthCardProps) {
  return (
    <section className={styles.authCard} aria-labelledby="authTitle">
      <header className={styles.authHeader}>
        <Logo style={"colorStyleSecondary"}></Logo>
        <h1 id="authTitle" className={styles.authTitle}>
          {title}
        </h1>
        <p className={styles.authSubtitle}>{subtitle}</p>
      </header>

      <form className={styles.authForm} noValidate>
        {children}

        <div className={styles.formActions}>
          <Button buttonText={action} type="submit" style="accent1"></Button>
        </div>
      </form>

      <footer className={styles.authFooter}>{footerConent}</footer>
    </section>
  );
}

export { AuthCard };
