import styles from "./FormField.module.css";
import type { ReactNode } from "react";
import { useState, useRef } from "react";
import { icons } from "../icons/icons";

interface FormFieldProps {
  id: string;
  label: ReactNode;
  name: string;
  layout?: "column" | "row" | "columnReverse";
  type?: string;
  min?: number;
  max?: number;
  step?: number;
  checked?: boolean;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  inputError?: string;
}

function FormField({
  id,
  label,
  name,
  layout = "column",
  type = "text",
  min,
  max,
  step,
  checked,
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  inputError,
}: FormFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const EyeIcon = showPassword ? icons.eyeOff : icons.eye;

  const isPassword = type === "password";
  const isChoice = type === "radio" || type === "checkbox";
  const inputType = isPassword && showPassword ? "text" : type;

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={`${styles.formRow} ${inputError ? styles.error : ""} ${isChoice ? styles.choiceRow : ""}`}
    >
      <div
        className={`${styles.formWrapper} ${styles[layout]} ${isChoice ? styles.choiceField : ""}`}
      >
        {isChoice ? (
          <label
            htmlFor={id}
            className={`${styles.formLabel} ${styles.choiceLabel} ${checked ? styles.choiceChecked : ""}`}
          >
            <input
              ref={inputRef}
              className={`${styles.formInput} ${styles.choiceInput}`}
              aria-invalid={!!inputError}
              aria-describedby={inputError ? `${id}-error` : undefined}
              id={id}
              name={name}
              type={inputType}
              checked={checked}
              value={value}
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
            />
            <span>{label}</span>
          </label>
        ) : (
          <>
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
                name={name}
                type={inputType}
                min={min}
                max={max}
                step={step}
                checked={checked}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onFocus={onFocus}
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
          </>
        )}
      </div>
      {inputError && (
        <div
          id={`${id}-error`}
          className={`${styles.errorWrapper} ${styles[layout]}`}
        >
          <p className={styles.errorText}>{inputError}</p>
        </div>
      )}
    </div>
  );
}

export { FormField };
