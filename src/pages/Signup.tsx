import styles from "./Signup.module.css";
import runners from "../assets/runners-wide-3.jpg";

import { inputFields } from "../config/inputFields";

import { Link } from "react-router-dom";
import { FormField } from "../components/FormField";
import { AuthCard } from "../components/AuthCard";
import { useAuth } from "../hooks/useAuth";
import { useFormState } from "../hooks/form/useFormState";
import { useFormHandlers } from "../hooks/form/useFormHandlers";
import { FormData } from "../types/forms.types";
import { useAuthContext } from "../context/AuthContext";

const signupFooter = (
  <>
    <p>Already have an account?</p>
    <Link to="/login">Log in</Link>
  </>
);

const signupFields = [
  inputFields.username,
  inputFields.email,
  inputFields.password,
  inputFields.confirmPassword,
] as const;

function Signup() {
  type SignupForm = {
    [K in (typeof signupFields)[number]["id"]]: string;
  };

  const { user } = useAuthContext();
  const formStateHook = useFormState(signupFields, user);
  const { formState, mergeErrors } = formStateHook;
  const { inputHandlers, handleSubmit } = useFormHandlers(
    signupFields,
    formStateHook,
  );
  const { signup, isFetching, fieldError, formError } = useAuth();

  async function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    handleSubmit(e, async (data: FormData) => {
      const payload = {
        username: data.username as string,
        email: data.email as string,
        password: data.password as string,
      };
      await signup(payload);
      if (fieldError) mergeErrors(fieldError);
    });
  }

  return (
    <main
      className={styles.main}
      style={{ backgroundImage: `url(${runners})` }}
    >
      <AuthCard
        onSubmit={onSubmit}
        title="Create account"
        subtitle="Start tracking your running journey"
        buttonText="Sign Up"
        footerContent={signupFooter}
        isSubmitting={isFetching}
        formError={formError}
      >
        {signupFields.map((field) => (
          <FormField
            key={field.id}
            id={field.id}
            label={field.label}
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
      </AuthCard>
    </main>
  );
}

export { Signup };
