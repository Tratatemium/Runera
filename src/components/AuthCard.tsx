import styles from "./AuthCard.module.css";

import { Logo } from "./Logo";
import { Button } from "./Button";

interface AuthCardProps {
  children?: React.ReactNode;
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
  title: string;
  subtitle: string;
  action: string;
  footerContent?: React.ReactNode;
  isSubmiting?: boolean;
  formError?: string | undefined
}

function AuthCard({
  children,
  onSubmit,
  title,
  subtitle,
  action,
  footerContent,
  isSubmiting = false,
  formError
}: AuthCardProps) {
  return (
    <section className={styles.authCard} aria-labelledby="authTitle">
      <header className={styles.authHeader}>
        <Logo style="colorStyleSecondary" />
        <h1 id="authTitle" className={styles.authTitle}>
          {title}
        </h1>
        <p className={styles.authSubtitle}>{subtitle}</p>
      </header>

      <form className={styles.authForm} onSubmit={onSubmit} noValidate>
        {children}
        <p className={styles.errorText}>{formError}</p>
        <div className={styles.formActions}>
          <Button
            buttonText={action}
            type="submit"
            style="accent1"
            isSubmiting={isSubmiting}
          />
        </div>
      </form>

      <footer className={styles.authFooter}>{footerContent}</footer>
    </section>
  );
}

export { AuthCard };
