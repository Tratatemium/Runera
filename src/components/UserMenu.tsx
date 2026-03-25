import styles from "./UserMenu.module.css";

import { logoutApi } from "../api/auth.api";
import { useEffect, useId, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";

import { Link, useNavigate } from "react-router-dom";

function UserMenu() {
  const navigate = useNavigate();
  const menuId = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { user, logoutUser } = useAuth();
  const username = user?.account?.username;
  const firstName = user?.profile?.firstName;
  const lastName = user?.profile?.lastName;
  const fullName =
    firstName && lastName ? `${firstName} ${lastName}` : undefined;
  const avatarLetter = (firstName?.[0] ?? username?.[0] ?? "?").toUpperCase();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handlePointerDown(event: MouseEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  function handleLogout() {
    try {
      logoutApi();
    } catch (err) {
      console.error("Failed to log out via API: ", err);
    } finally {
      logoutUser();
      navigate("/", { replace: true });
    }
  }

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <button
        ref={buttonRef}
        className={`${styles.userButton}${isOpen ? ` ${styles.open}` : ""}`}
        type="button"
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-haspopup="true"
        aria-label={`${fullName ?? username ?? "User"} account menu`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={styles.avatar}>{avatarLetter}</div>
        <p className={styles.name}>{fullName ?? username}</p>
      </button>
      {isOpen && (
        <div className={styles.menuWrapper}>
          <ul
            id={menuId}
            className={styles.userMenu}
            aria-label="User account actions"
          >
            <li className={styles.menuItem}>
              <Link to="/user/info" onClick={() => setIsOpen(false)}>
                My Profile
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link to="/user/edit-account" onClick={() => setIsOpen(false)}>
                Edit Account
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link to="/user/edit-profile" onClick={() => setIsOpen(false)}>
                Edit Profile
              </Link>
            </li>
            <li className={styles.menuItem}>
              <button type="button" onClick={handleLogout}>
                Log Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export { UserMenu };
