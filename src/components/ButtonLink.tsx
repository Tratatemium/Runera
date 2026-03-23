import styles from "./Button.module.css";

import { Link } from "react-router-dom";

interface ButtonLinkProps {
  linkDirection: string;
  linkText: string;
  variant: "primary" | "secondary" | "transparent";
  size?: "small";
  disabled?: boolean;
}

function ButtonLink({
  linkDirection,
  linkText,
  variant,
  size,
  disabled,
}: ButtonLinkProps) {
  return (
    <Link
      to={linkDirection}
      className={`
        ${styles.button}
        ${styles[variant]}
        ${size ? ` ${styles[size]}` : ""}
        ${disabled ? styles.disabled : styles.enabled}
      `}
    >
      {linkText}
    </Link>
  );
}

export { ButtonLink };
