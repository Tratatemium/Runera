import styles from "./EditAccount.module.css"

import { useState } from "react";
import { useForm } from "../../hooks/useForm";

import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Button } from "../../components/Button";
import { FormField } from "../../components/FormField";

import { inputFields } from "../../config/inputFields";

const userFields = [
  inputFields.username,
  inputFields.email,
  inputFields.password,
] as const;

function EditAccount() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | undefined>(undefined);

  type UserEditForm = {
    [K in (typeof userFields)[number]["id"]]: string;
  };

  const {
    formData,
    inputErrors,
    setServerErrors,
    handleChange,
    handleInputFocus,
    handleInputBlur,
    handleSubmit,
  } = useForm<UserEditForm>(userFields);

  function submitUserEdit() {}

  function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    handleSubmit(e, submitUserEdit);
  }

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <form className={styles.form} onSubmit={onSubmit} noValidate>
          {userFields.map((field) => (
            <FormField
              key={field.id}
              id={field.id}
              label={field.label}
              layout="row"
              type={field.type}
              min={field.min}
              max={field.max}
              step={field.step}
              placeholder={field.placeholder}
              value={formData[field.id]}
              onChange={handleChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              inputError={inputErrors[field.id]}
            />
          ))}

          <div className={styles.submitWrapper}>
            {formError && (
              <div role="alert" className={styles.errorWrapper}>
                <p className={styles.errorText}>{formError}</p>
              </div>
            )}
            <div
              className={`${styles.submit} ${formError ? styles.error : ""}`}
            >
              <Button
                buttonText="Save changes"
                type="submit"
                variant="primary"
                isSubmitting={isSubmitting}
              />
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}

export {EditAccount}