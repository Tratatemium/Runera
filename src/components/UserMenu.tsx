import styles from "./UserMenu.module.css";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function UserMenu() {
  const { user } = useAuth();
  const username = user?.account?.username;
  const firstName = user?.profile?.firstName;
  const lastName = user?.profile?.lastName;

  const fullName =
    firstName && lastName ? `${firstName} ${lastName}` : undefined;

  const avatarLetter = (firstName?.[0] ?? username?.[0] ?? "?").toUpperCase();
  return (
    <>
      <button className={styles.user}>
        <div className={styles.avatar}>{avatarLetter}</div>
        <p className={styles.name}>{fullName ?? username}</p>
      </button>
    </>
  );
}

export { UserMenu };
