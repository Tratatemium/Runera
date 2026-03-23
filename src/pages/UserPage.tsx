import styles from "./UserPage.module.css";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Logo } from "../components/Logo";
import { ButtonLink } from "../components/ButtonLink";
import { Button } from "../components/Button";
import { useEffect } from "react";

function UserPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    if (!user) navigate("/");
  }, [user]);
  if (!user) return null;

  const { account, profile } = user;

  function handleLogout() {
    logout();
    navigate("/");
  }

  const fullName =
    profile.firstName || profile.lastName
      ? [profile.firstName, profile.lastName].filter(Boolean).join(" ")
      : null;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Logo style="colorStyleAccent1" />
        <div className={styles.headerActions}>
          <ButtonLink
            linkDirection="/dashboard"
            linkText="Dashboard"
            style="accent1Inverted"
            size="small"
          />
          <Button
            buttonText="Log Out"
            variant="accent1Inverted"
            size="small"
            onClick={handleLogout}
          />
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.avatar}>
          {(profile.firstName?.[0] ?? account.username[0]).toUpperCase()}
        </div>

        <h1 className={styles.name}>{fullName ?? account.username}</h1>
        <p className={styles.username}>@{account.username}</p>

        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Email</span>
            <span className={styles.infoValue}>{account.email}</span>
          </div>
          {profile.dateOfBirth && (
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Date of Birth</span>
              <span className={styles.infoValue}>
                {new Date(profile.dateOfBirth).toLocaleDateString()}
              </span>
            </div>
          )}
          {profile.heightCm && (
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Height</span>
              <span className={styles.infoValue}>{profile.heightCm} cm</span>
            </div>
          )}
          {profile.weightKg && (
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Weight</span>
              <span className={styles.infoValue}>{profile.weightKg} kg</span>
            </div>
          )}
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Role</span>
            <span className={styles.infoValue}>{user.role}</span>
          </div>
        </div>
      </main>
    </div>
  );
}

export { UserPage };
