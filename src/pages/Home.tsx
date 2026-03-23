import styles from "./Home.module.css";

import { Header } from "../components/Header";
import { Logo } from "../components/Logo";
import { ButtonLink } from "../components/ButtonLink";

function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <div className={styles.home}>
      <Header />
      <main>
        <section className={styles.hero}>
          <Logo variant="primary"></Logo>
          <h1 className={styles.title}>Track Every Step</h1>
          <p className={styles.subtitle}>
            Log your runs, monitor progress, and achieve your goals with Runera.
          </p>

          <div className={styles.actions}>
            <ButtonLink
              linkDirection="/signup"
              linkText="Sign Up"
              variant="primary"
            ></ButtonLink>
            <ButtonLink
              linkDirection="/login"
              linkText="Log In"
              variant="secondary"
            ></ButtonLink>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>© {currentYear} Runera</p>
        <p>Built for steady progress, one run at a time.</p>
      </footer>
    </div>
  );
}

export { Home };
