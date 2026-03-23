import styles from "./Button.module.css";

import { Link } from "react-router-dom";

interface ButtonLinkProps {
  linkDirection: string;
  linkText: string;
  variant: "primary" | "secondary" | "transparent";
  size?: "small";
  disabled?: boolean;
  active?: boolean;
}

function ButtonLink({
  linkDirection,
  linkText,
  variant,
  size,
  disabled,
  active,
}: ButtonLinkProps) {
  return (
    <Link
      to={linkDirection}
      className={`
        ${styles.button}
        ${styles[variant]}
        ${size ? ` ${styles[size]}` : ""}
        ${disabled ? styles.disabled : styles.enabled}
        ${active ? styles.active : ""}
      `}
    >
      {linkText}
    </Link>
  );
}

export { ButtonLink };
