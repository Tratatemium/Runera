import styles from "./Header.module.css";

import { Logo } from "../components/Logo";
import { Link, useLocation } from "react-router-dom";
import { ButtonLink } from "./ButtonLink";

import { useAuth } from "../context/AuthContext";

function Header() {
  const location = useLocation();
  const { user } = useAuth();
  const username = user?.account?.username;
  const firstName = user?.profile?.firstName;
  const lastName = user?.profile?.lastName;

  const fullName =
    firstName && lastName ? `${firstName} ${lastName}` : undefined;

  const avatarLetter = (firstName?.[0] ?? username?.[0] ?? "?").toUpperCase();

  return (
    <header className={styles.header}>
      <Link to={"/"}>
        <Logo variant="secondary" />
      </Link>
      <div className={styles.headerContent}>
        {user ? (
          <>
            <ButtonLink
              linkDirection="/dashboard"
              active={location.pathname === "/dashboard"}
              linkText="Dashboard"
              variant="transparent"
              size="small"
            />
            <ButtonLink
              linkDirection="/runs"
              active={location.pathname === "/runs"}
              linkText="My Runs"
              variant="transparent"
              size="small"
            />
            <button className={styles.user}>
              <div className={styles.avatar}>{avatarLetter}</div>
              <p className={styles.name}>{fullName ?? username}</p>
            </button>
          </>
        ) : (
          <ButtonLink
            linkDirection="/login"
            linkText="Log In"
            variant="primary"
            size="small"
          />
        )}
      </div>
    </header>
  );
}

export { Header };
