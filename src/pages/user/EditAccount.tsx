import styles from "./EditAccount.module.css";

import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useFormState } from "../../hooks/form/useFormState";
import { useFormHandlers } from "../../hooks/form/useFormHandlers";

import { inputFields } from "../../config/inputFields";
import { getUserData } from "../../utils/user.utils";

import { Button, ButtonLink, FormField, Panel } from "../../components/ui/";

const userFields = [
  inputFields.username,
  inputFields.email,
  inputFields.password,
] as const;

function EditAccount() {
  // REVIEW: `submitUserEdit` is empty — this entire form is non-functional.
  // `isSubmitting` and `formError` are never updated (setters are destructured away).
  // The commented-out type and the `disabled={true}` on the button suggest this is intentionally
  // unfinished, but this should be documented or the route should be hidden until implemented.
  const [isSubmitting] = useState(false);
  const [formError] = useState<string | undefined>(undefined);

  const { user } = useAuthContext();
  const formStateHook = useFormState(userFields, getUserData(user));
  const { formState } = formStateHook;
  const { inputHandlers, handleSubmit } = useFormHandlers(
    userFields,
    formStateHook,
  );

  function submitUserEdit() {}

  function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    handleSubmit(e, submitUserEdit);
  }

  return (
    <main className={styles.main}>
      <Panel variant="frosted">
        <form className={styles.form} onSubmit={onSubmit} noValidate>
          {userFields.map((field) => (
            <FormField
              key={field.id}
              {...field}
              layout="row"
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
            <div
              className={`${styles.submit} ${formError ? styles.error : ""}`}
            >
              <Button
                buttonText="Save changes"
                type="submit"
                variant="primary"
                isSubmitting={isSubmitting}
                disabled={
                  true
                } /* REVIEW: Extra space before `{true}` — formatting issue. */
                title="Not implemented yet"
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
      </Panel>
    </main>
  );
}

export { EditAccount };
