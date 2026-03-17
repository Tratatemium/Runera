import styles from "./Button.module.css";
import { SpinnerIcon } from "./icons/SpinnerIcon";

interface ButtonProps {
  buttonText: string;
  type?: "button" | "submit" | "reset";
  style: "accent1" | "accent1Inverted" | "accent2";
  isSubmitting?: boolean;
}

function Button({
  buttonText,
  type,
  style,
  isSubmitting = false,
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[style]}`}
      type={type}
      disabled={isSubmitting}
    >
      {isSubmitting ? <SpinnerIcon /> : buttonText}
    </button>
  );
}

export { Button };
