import styles from "./Button.module.css";

interface ButtonProps {
  buttonText: string;
  style: "accent1" | "accent1Inverted" | "accent2";
}

function Button({buttonText, style}: ButtonProps) {
    return(
        <button className={`${styles.button} ${styles[style]}`}>{buttonText}</button>
    );
}

export { Button };