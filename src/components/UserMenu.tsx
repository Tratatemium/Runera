import styles from "./UserMenu.module.css";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";

import { Link } from "react-router-dom";

function UserMenu() {
  const { user } = useAuth();
  const username = user?.account?.username;
  const firstName = user?.profile?.firstName;
  const lastName = user?.profile?.lastName;
  const fullName =
    firstName && lastName ? `${firstName} ${lastName}` : undefined;
  const avatarLetter = (firstName?.[0] ?? username?.[0] ?? "?").toUpperCase();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className={styles.userButton} onClick={() => setIsOpen(!isOpen)}>
        <div className={styles.avatar}>{avatarLetter}</div>
        <p className={styles.name}>{fullName ?? username}</p>
      </button>
      {isOpen && (
        <div className={styles.menuWrapper}>
            <ul className={styles.userMenu}>
                <li className={styles.menuItem}><Link to="/user-page">My Profile</Link></li>
                <li className={styles.menuItem}><Link to="/edit-user">Edit Profile</Link></li>
                <li className={styles.menuItem}><button>Log Out</button></li>
            </ul>
        </div>
      )}
    </>
  );
}

export { UserMenu };
