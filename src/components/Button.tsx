import styles from "./Button.module.css";
import { SpinnerIcon } from "./icons/SpinnerIcon";

interface ButtonProps {
  buttonText: string;
  type?: "button" | "submit" | "reset";
  style: "accent1" | "accent1Inverted" | "accent2";
  isSubmiting?: boolean;
}

function Button({ buttonText, type, style, isSubmiting = false }: ButtonProps) {
  return (
    <button className={`${styles.button} ${styles[style]}`} type={type} disabled={isSubmiting}>
      {isSubmiting? <SpinnerIcon /> :buttonText}
    </button>
  );
}

export { Button };
