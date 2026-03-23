import styles from "./Header.module.css";

import { Logo } from "../components/Logo";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import { ButtonLink } from "./ButtonLink";

import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

interface HeaderProps {
  children?: React.ReactNode;
}

function Header({ children }: HeaderProps) {
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
        <Logo style="colorStyleAccent1" />
      </Link>
      <div className={styles.headerContent}>
        {user ? (
          <>
            <ButtonLink
              linkDirection="/dashboard"
              linkText="Dashboard"
              variant="accent1Inverted"
              size="small"
            />
            <ButtonLink
              linkDirection="/runs"
              linkText="My Runs"
              variant="accent1Inverted"
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
            variant="accent1Inverted"
            size="small"
          />
        )}
      </div>
    </header>
  );
}

export { Header };
