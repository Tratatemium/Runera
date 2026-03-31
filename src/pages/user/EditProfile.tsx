import styles from "./EditProfile.module.css";

import { useAuthContext } from "../../context/AuthContext";
import { useFormState } from "../../hooks/form/useFormState";
import { useFormHandlers } from "../../hooks/form/useFormHandlers";
import { useUser } from "../../hooks/useUser";

import { inputFields } from "../../config/inputFields";

import { Button, ButtonLink, FormField } from "../../components/ui/";

const userFields = [
  inputFields.firstName,
  inputFields.lastName,
  inputFields.dateOfBirth,
  inputFields.heightCm,
  inputFields.weightKg,
] as const;

function EditProfile() {
  type UserEditForm = {
    [K in (typeof userFields)[number]["id"]]: string;
  };

  const { user } = useAuthContext();
  const formStateHook = useFormState(userFields, user);
  const { formState } = formStateHook;
  const { inputHandlers, handleSubmit } = useFormHandlers(
    userFields,
    formStateHook,
  );

  const { isFetching, formError, updateProfile } = useUser();

  async function submitUserEdit(data: UserEditForm) {
    const payload = {
      profile: data,
    };
    await updateProfile(payload);
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
              isSubmitting={isFetching}
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
