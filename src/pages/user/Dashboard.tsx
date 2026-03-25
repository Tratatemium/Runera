import styles from "./Dashboard.module.css";

import { useAuthContext } from "../../context/AuthContext";

function Dashboard() {
  const { user } = useAuthContext();
  if (!user) return null;

  return (
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
  );
}

export { Dashboard };
