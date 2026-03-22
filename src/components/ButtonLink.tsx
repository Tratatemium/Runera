import styles from "./Button.module.css";

import { Link } from "react-router-dom";

interface ButtonLinkProps {
  linkDirection: string;
  linkText: string;
  style: "accent1" | "accent1Inverted" | "accent2";
  size?: "small";
}

function ButtonLink({ linkDirection, linkText, style, size }: ButtonLinkProps) {
  return (
    <Link
      to={linkDirection}
      className={`${styles.button} ${styles[style]}${size ? ` ${styles[size]}` : ""}`}
    >
      <span>{linkText}</span>
    </Link>
  );
}

export { ButtonLink };
