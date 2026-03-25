import styles from "./EditProfile.module.css";

import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { useAuthContext } from "../../context/AuthContext";
import { updateProfile } from "../../api/users.api";

import { Button } from "../../components/Button";
import { ButtonLink } from "../../components/ButtonLink";
import { FormField } from "../../components/FormField";

import { inputFields } from "../../config/inputFields";

const userFields = [
  inputFields.firstName,
  inputFields.lastName,
  inputFields.dateOfBirth,
  inputFields.heightCm,
  inputFields.weightKg,
] as const;

function EditProfile() {
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

  const { updateUser } = useAuthContext();

  async function submitUserEdit(data: UserEditForm) {
    const profileData = {
      profile: data,
    };
    console.log(profileData);

    setIsSubmitting(true);
    setFormError(undefined);

    try {
      const response = await updateProfile(profileData);
      const update = {profile: response.savedProfile};
      updateUser(update);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  }

  function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    handleSubmit(e, submitUserEdit);
  }

  return (
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
          <div className={`${styles.submit} ${formError ? styles.error : ""}`}>
            <Button
              buttonText="Save changes"
              type="submit"
              variant="primary"
              isSubmitting={isSubmitting}
            />
            <ButtonLink
              linkDirection="."
              linkText="Go Back"
              variant="secondary"
              goBack={true}
            />
          </div>
        </div>
      </form>
    </main>
  );
}

export { EditProfile };
