import styles from "./Home.module.css";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Logo } from "../components/Logo";
import { ButtonLink } from "../components/ButtonLink";

import { useAuth } from "../context/AuthContext";

import runners1 from "../assets/runners-1.jpg";
import runners3 from "../assets/runners-3.jpg";
import { icons } from "../components/icons/icons";

function Home() {
  const { user } = useAuth();

  const GraphIcon = icons.graph;
  const ChartIcon = icons.chart;
  const MedalIcon = icons.medal;

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

        <section className={styles.highlights}>
          <h2>Everything You Need</h2>
          <div className={styles.featuresWrapper}>
            <div className={styles.feature}>
              <GraphIcon className={`${styles.icon} ${styles.graph}`} />
              <h3 className={styles.graph}>Track Runs</h3>
              <p>
                Quickly log your distance, time, and pace with our simple
                interface designed for speed.
              </p>
            </div>
            <div className={styles.feature}>
              <ChartIcon className={`${styles.icon} ${styles.chart}`} />
              <h3 className={styles.chart}>View Statistics</h3>
              <p>
                Get clear insights into your total distance, average pace, and
                weekly progress.
              </p>
            </div>
            <div className={styles.feature}>
              <MedalIcon className={`${styles.icon} ${styles.medal}`} />
              <h3 className={styles.medal}>Monitor Progress</h3>
              <p>
                Stay motivated with performance tracking and see how you improve
                over time.
              </p>
            </div>
          </div>
        </section>

        {!user && (
          <section className={styles.signupCta}>
            <h2>Ready to Start Running?</h2>
            <p>
              Join runners who are tracking their progress and achieving their
              goals.
            </p>
            <ButtonLink
              linkDirection="/signup"
              linkText="Create Free Account"
              variant="primary"
            ></ButtonLink>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}

export { Home };
