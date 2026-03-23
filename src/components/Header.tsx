import styles from "./Header.module.css";

import { Logo } from "../components/Logo";

interface HeaderProps {
  children?: React.ReactNode;
}

function Header({ children }: HeaderProps) {
  return (
    <header className={styles.header}>
      <Logo style="colorStyleAccent1" />
      <div className={styles.headerContent}>
        {children}
      </div>
    </header>
  );
}

export { Header };
