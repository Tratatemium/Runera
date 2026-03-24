import styles from "./Home.module.css";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Logo } from "../components/Logo";
import { ButtonLink } from "../components/ButtonLink";

import { useAuth } from "../context/AuthContext";

import runners1 from "../assets/runners-1.jpg";
import runners3 from "../assets/runners-3.jpg";

function Home() {
  const { user } = useAuth();

  return (
    <div className={styles.home}>
      <Header />
      <main>
        <section className={styles.hero}>
          <img src={runners1} alt="" className={styles.image} />
          <section className={styles.cta}>
            <Logo variant="primary" size="big"></Logo>
            <h1 className={styles.title}>Track Every Step</h1>
            <p className={styles.subtitle}>
              Log your runs, monitor progress, and achieve your goals with
              Runera.
            </p>

            <div className={styles.actions}>
              {user ? (
                <ButtonLink
                  linkDirection="/runs"
                  linkText="My runs"
                  variant="primary"
                ></ButtonLink>
              ) : (
                <>
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
                </>
              )}
            </div>
          </section>
          <img src={runners3} alt="" className={styles.image} />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export { Home };
