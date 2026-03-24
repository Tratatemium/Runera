import styles from "./UserMenu.module.css";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";

import { Link, useNavigate } from "react-router-dom";

function UserMenu() {
  const navigate = useNavigate();
  const { user, logoutUser } = useAuth();

  const username = user?.account?.username;
  const firstName = user?.profile?.firstName;
  const lastName = user?.profile?.lastName;
  const fullName =
    firstName && lastName ? `${firstName} ${lastName}` : undefined;
  const avatarLetter = (firstName?.[0] ?? username?.[0] ?? "?").toUpperCase();

  const [isOpen, setIsOpen] = useState(false);

  function handleLogout() {
    logoutUser();
    navigate("/");
  }

  return (
    <>
      <button
        className={`${styles.userButton}${isOpen ? ` ${styles.open}` : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={styles.avatar}>{avatarLetter}</div>
        <p className={styles.name}>{fullName ?? username}</p>
      </button>
      {isOpen && (
        <div className={styles.menuWrapper}>
          <ul className={styles.userMenu}>
            <li className={styles.menuItem}>
              <Link to="/user-page">My Profile</Link>
            </li>
            <li className={styles.menuItem}>
              <Link to="/edit-user">Edit Profile</Link>
            </li>
            <li className={styles.menuItem}>
              <button onClick={handleLogout}>Log Out</button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export { UserMenu };
