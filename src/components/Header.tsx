import styles from "./Header.module.css";

import { Logo } from "../components/Logo";

interface HeaderProps {
  children?: React.ReactNode;
  className?: string;
}

function Header({ children, className }: HeaderProps) {
  return (
    <header className={[styles.header, className].filter(Boolean).join(" ")}>
      <Logo style="colorStyleAccent1" />
      <div className={styles.headerContent}>
        {children}
      </div>
    </header>
  );
}

export { Header };
