import styles from "./Home.module.css";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Logo } from "../components/Logo";
import { ButtonLink } from "../components/ButtonLink";

import { useAuth } from "../context/AuthContext";

function Home() {
  const { user } = useAuth();

  return (
    <div className={styles.home}>
      <Header />
      <main>
        <section className={styles.auth}>
          <Logo variant="primary" size="big"></Logo>
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
      <Footer />
    </div>
  );
}

export { Home };
