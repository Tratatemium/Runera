import styles from "./FormField.module.css";

interface FormFieldProps {
    id: string,
    label: string,
    type?: string,
    placeholder?: string
}

function FormField({id, label, type ="text", placeholder}: FormFieldProps) {
  return (
    <div className={styles.formRow}>
      <label htmlFor={id} className={styles.formLabel}>
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        className={styles.formInput}
      />
    </div>
  );
}

export { FormField };
