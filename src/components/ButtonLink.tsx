import styles from "./Button.module.css";

import { Link, useNavigate } from "react-router-dom";

interface ButtonLinkProps {
  children?: React.ReactNode;
  linkDirection: string;
  linkText: string;
  variant: "primary" | "secondary" | "transparent";
  size?: "small";
  disabled?: boolean;
  active?: boolean;
  goBack?: boolean;
}

function ButtonLink({
  children,
  linkDirection,
  linkText,
  variant,
  size,
  disabled,
  active,
  goBack = false,
}: ButtonLinkProps) {
  const navigate = useNavigate();

  return (
    <Link
      to={goBack ? "." : linkDirection}
      aria-disabled={disabled}
      onClick={(e) => {
        if (disabled) {
          e.preventDefault();
          return;
        }

        if (goBack) {
          e.preventDefault();
          navigate(-1);
        }
      }}
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
