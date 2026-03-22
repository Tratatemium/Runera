import styles from "./Button.module.css";

import { Link } from "react-router-dom";

interface ButtonLinkProps {
  linkDirection: string;
  linkText: string;
  style: "accent1" | "accent1Inverted" | "accent2";
  size?: "small";
  disabled?: boolean;
}

function ButtonLink({
  linkDirection,
  linkText,
  style,
  size,
  disabled,
}: ButtonLinkProps) {
  return (
    <Link
      to={linkDirection}
      className={`
        ${styles.button}
        ${styles[style]}
        ${size ? ` ${styles[size]}` : ""}
        ${disabled ? styles.disabled : styles.enabled}
      `}
    >
      {linkText}
    </Link>
  );
}

export { ButtonLink };
