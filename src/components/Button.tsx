import styles from "./Button.module.css";
import { icons } from "./icons/icons";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonText: string;
  variant: "primary" | "secondary" | "transparent";
  isSubmitting?: boolean;
  size?: "small";
}

function Button({
  buttonText,
  type = "button",
  variant,
  isSubmitting = false,
  size,
  ...props
}: ButtonProps) {
  const SpinnerIcon = icons.spinner;
  return (
    <button
      className={`${styles.button} ${styles[variant]}${size ? ` ${styles[size]}` : ""}`}
      aria-busy={isSubmitting}
      type={type}
      disabled={isSubmitting}
      {...props}
    >
      {isSubmitting ? <SpinnerIcon /> : buttonText}
    </button>
  );
}

export { Button };
