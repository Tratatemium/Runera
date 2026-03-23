import styles from "./Dashboard.module.css";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { Header } from "../components/Header";
import { ButtonLink } from "../components/ButtonLink";
import { Button } from "../components/Button";

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className={styles.page}>
      <Header />

      {user ? (
        <main className={styles.main}>
          <div className={styles.greeting}>
            <h1>Welcome back, {user.account.username}!</h1>
            <p>Here's a snapshot of your running journey.</p>
          </div>
          <div className={styles.stats}>
            <div className={styles.card}>
              <span className={styles.cardLabel}>Total Runs</span>
              <span className={styles.cardValue}>—</span>
              <span className={styles.cardUnit}>runs logged</span>
            </div>
            <div className={styles.card}>
              <span className={styles.cardLabel}>Distance</span>
              <span className={styles.cardValue}>—</span>
              <span className={styles.cardUnit}>km total</span>
            </div>
            <div className={styles.card}>
              <span className={styles.cardLabel}>Best Pace</span>
              <span className={styles.cardValue}>—</span>
              <span className={styles.cardUnit}>min / km</span>
            </div>
            <div className={styles.card}>
              <span className={styles.cardLabel}>This Week</span>
              <span className={styles.cardValue}>—</span>
              <span className={styles.cardUnit}>km</span>
            </div>
          </div>

          <div className={styles.cta}>
            <h2>Ready to run?</h2>
            <button className={styles.ctaBtn}>+ Log a Run</button>
          </div>
        </main>
      ) : (
        <div className={styles.loginAction}>
          <h1>Welcome to Runera</h1>
          <p>Please log in to see your running stats.</p>
          <ButtonLink
            linkDirection="/login"
            linkText="Go to Login"
            variant="primary"
          />
        </div>
      )}

      <footer className={styles.footer}>
        <p>© {currentYear} Runera</p>
        <p>Built for steady progress, one run at a time.</p>
      </footer>
    </div>
  );
}

export { Dashboard };
