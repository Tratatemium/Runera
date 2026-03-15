import styles from "./FormField.module.css";

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
  return (
    <div className={styles.formRow}>
      <label htmlFor={id} className={styles.formLabel}>
        {label}
      </label>
      <input
        className={styles.formInput}
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <p className={styles.errorText}>{inputError}</p>
    </div>
  );
}

export { FormField };
