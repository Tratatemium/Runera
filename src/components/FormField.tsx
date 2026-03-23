import styles from "./FormField.module.css";
import { useState, useRef } from "react";
import { icons } from "./icons/icons";

interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  inputError?: string;
}

function FormField({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  inputError,
}: FormFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const EyeIcon = showPassword ? icons.eyeOff : icons.eye;

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={`${styles.formRow} ${inputError ? styles.error : ""}`}>
      <label htmlFor={id} className={styles.formLabel}>
        {label}
      </label>
      <div className={styles.inputWrapper}>
        <input
          ref={inputRef}
          className={styles.formInput}
          aria-invalid={!!inputError}
          aria-describedby={inputError ? `${id}-error` : undefined}
          id={id}
          name={id}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
        {isPassword && (
          <button
            type="button"
            className={styles.showPasswordIcon}
            aria-label={showPassword ? "Hide password" : "Show password"}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              setShowPassword((v) => !v);
              inputRef.current?.focus();
            }}
          >
            <EyeIcon />
          </button>
        )}
      </div>
      {inputError && (
        <div id={`${id}-error`} className={styles.errorWrapper}>
          <p className={styles.errorText}>{inputError}</p>
        </div>
      )}
    </div>
  );
}

export { FormField };
