import styles from "./EditProfile.module.css";

import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { updateProfile } from "../../api/users.api";

import { Button } from "../../components/Button";
import { ButtonLink } from "../../components/ButtonLink";
import { FormField } from "../../components/FormField";

import { inputFields } from "../../config/inputFields";
import { useFormState } from "../../hooks/form/useFormState";
import { useFormHandlers } from "../../hooks/form/useFormHandlers";

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

  const { user, updateUser } = useAuthContext();
  const formStateHook = useFormState(userFields, user);
  const { formState } = formStateHook;
  const { inputHandlers, handleSubmit } = useFormHandlers(
    userFields,
    formStateHook,
  );

  useEffect(() => console.log(user), []);

  function normalizeDate(dateString: string) {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 10);
  }

  async function submitUserEdit(data: UserEditForm) {
    const profileData = {
      profile: data,
    };
    console.log(profileData);

    setIsSubmitting(true);
    setFormError(undefined);

    try {
      const response = await updateProfile(profileData);
      const updateFields = response.savedProfile;
      if (updateFields.dateOfBirth) {
        updateFields.dateOfBirth = normalizeDate(updateFields.dateOfBirth);
      }

      const update = { profile: updateFields };
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
            value={formState[field.id].value}
            inputError={formState[field.id].error}
            {...inputHandlers}
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
