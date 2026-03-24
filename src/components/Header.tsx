import styles from "./Header.module.css";

import { Link, useLocation } from "react-router-dom";

import { icons } from "./icons/icons";

import { UserMenu } from "./UserMenu";
import { Logo } from "../components/Logo";
import { ButtonLink } from "./ButtonLink";

import { useAuth } from "../context/AuthContext";

function Header() {
  const location = useLocation();
  const { user } = useAuth();

  const ListIcon = icons.list;
  const DashboardIcon = icons.dashboard;

  return (
    <header className={styles.header}>
      <Link to={"/"}>
        <Logo variant="secondary" />
      </Link>
      <div className={styles.headerContent}>
        {user ? (
          <>
            <ButtonLink
              linkDirection="/user/dashboard"
              active={location.pathname === "/dashboard"}
              linkText="Dashboard"
              variant="transparent"
              size="small"
            >
              <DashboardIcon />
            </ButtonLink>

            <ButtonLink
              linkDirection="/runs"
              active={location.pathname === "/runs"}
              linkText="My Runs"
              variant="transparent"
              size="small"
            >
              <ListIcon />
            </ButtonLink>

            <UserMenu />
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
