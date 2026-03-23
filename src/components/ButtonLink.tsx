import styles from "./Button.module.css";

import { Link } from "react-router-dom";

interface ButtonLinkProps {
  children?: React.ReactNode;
  linkDirection: string;
  linkText: string;
  variant: "primary" | "secondary" | "transparent";
  size?: "small";
  disabled?: boolean;
  active?: boolean;
}

function ButtonLink({
  children,
  linkDirection,
  linkText,
  variant,
  size,
  disabled,
  active,
}: ButtonLinkProps) {
  return (
    <Link
      to={disabled ? "" : linkDirection}
      aria-disabled={disabled}
      className={`
        ${styles.button}
        ${styles[variant]}
        ${size ? ` ${styles[size]}` : ""}
        ${disabled ? styles.disabled : ""}
        ${active ? styles.active : ""}
      `}
    >
      {children && <span className={styles.icon}>{children}</span>}
      <span>{linkText}</span>
    </Link>
  );
}

export { ButtonLink };
