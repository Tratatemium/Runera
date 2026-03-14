import styles from "./FormField.module.css";
import { InputHTMLAttributes } from "react";

interface FormFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "name"> {
  id: string;
  label: string;
  error?: string;
}

function FormField({ id, label, type = "text", error, ...inputProps }: FormFieldProps) {
  const errorId = `${id}Error`;

  return (
    <div className={styles.formRow}>
      <label htmlFor={id} className={styles.formLabel}>
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        className={`${styles.formInput} ${error ? styles.inputError : ""}`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        {...inputProps}
      />
      {error ? (
        <p id={errorId} role="alert" className={styles.errorText}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

export { FormField };
