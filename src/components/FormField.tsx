import styles from "./FormField.module.css";
import { useState } from "react";
import { useEffect } from "react";
import { EyeIcon } from "./icons/EyeIcon";
import { EyeOffIcon } from "./icons/EyeOffIcon";

interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputError: string | undefined;
}

function FormField({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  inputError,
}: FormFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    (id === "password" || id === "confirmPassword") && showPassword
      ? "text"
      : type;

  return (
    <div className={styles.formRow}>
      <label htmlFor={id} className={styles.formLabel}>
        {label}
      </label>
      <div className={styles.inputWrapper}>
        <input
          className={styles.formInput}
          id={id}
          name={id}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <span
          className={`${styles.showPasswordIcon} ${id !== "password" && id !== "confirmPassword" ? styles.hide : ""}`}
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOffIcon /> : <EyeIcon />}
        </span>
      </div>
      <p className={styles.errorText}>{inputError}</p>
    </div>
  );
}

export { FormField };
