import styles from "./Button.module.css";
import { SpinnerIcon } from "./icons/SpinnerIcon";

interface ButtonProps {
  buttonText: string;
  type?: "button" | "submit" | "reset";
  variant: "accent1" | "accent1Inverted" | "accent2";
  isSubmitting?: boolean;
  size?: "small";
  onClick?: () => void;
}

function Button({
  buttonText,
  type = "button",
  variant,
  isSubmitting = false,
  size,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[variant]}${size ? ` ${styles[size]}` : ""}`}
      aria-busy={isSubmitting}
      type={type}
      disabled={isSubmitting}
      onClick={onClick}
    >
      {isSubmitting ? <SpinnerIcon /> : buttonText}
    </button>
  );
}

export { Button };
