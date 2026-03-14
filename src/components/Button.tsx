import styles from "./Button.module.css";

interface ButtonProps {
  buttonText: string;
  type?: "button" | "submit" | "reset";
  style: "accent1" | "accent1Inverted" | "accent2";
}

function Button({ buttonText, type, style }: ButtonProps) {
  return (
    <button className={`${styles.button} ${styles[style]}`} type={type}>
      {buttonText}
    </button>
  );
}

export { Button };
