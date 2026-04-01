import styles from "./RunFormPage.module.css";

import { inputFields } from "../../config/inputFields";

import { Button, ButtonLink, FormField, Panel } from "../../components/ui/";
import { useFormState } from "../../hooks/form/useFormState";
import { useFormHandlers } from "../../hooks/form/useFormHandlers";
import { useRuns } from "../../hooks/useRuns";

const runFields = [
  inputFields.title,
  inputFields.distanceKm,
  inputFields.durationH,
  inputFields.durationM,
  inputFields.durationS,
  inputFields.startTime,
  inputFields.weatherSunny,
  inputFields.weatherPartlyCloudy,
  inputFields.weatherCloudy,
  inputFields.weatherRain,
  inputFields.weatherSnow,
  inputFields.weatherWindy,
  inputFields.weatherHot,
  inputFields.weatherCold,
  inputFields.perceivedEffort,
  inputFields.notes,
] as const;

const fieldOptionsMap = Object.fromEntries(
  runFields.map((field) => {
    const { validator: _, normalizator: __, ...options } = field;
    return [field.id, options];
  }),
);

function RunFormPage() {
  type RunForm = {
    [K in (typeof runFields)[number]["id"]]: string;
  };

  const formStateHook = useFormState(runFields);
  const { formState } = formStateHook;
  const { inputHandlers, handleSubmit } = useFormHandlers(
    runFields,
    formStateHook,
  );

  const { loading, formError, postNewRun, updateRun } = useRuns();

  function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(formState);
  }

  return (
    <main className={styles.main}>
      <Panel variant="frosted">
        <form className={styles.form} onSubmit={onSubmit} noValidate>
          <FormField
            {...fieldOptionsMap.title}
            value={formState[fieldOptionsMap.title.id].value}
            {...inputHandlers}
          />

          <FormField
            {...fieldOptionsMap.distanceKm}
            value={formState[fieldOptionsMap.distanceKm.id].value}
            {...inputHandlers}
          />

          <div className={styles.durationWrapper}>
            <span className={styles.durationLabel}>Duration *</span>
            <FormField
              {...fieldOptionsMap.durationH}
              value={formState[fieldOptionsMap.durationH.id].value}
              {...inputHandlers}
            />
            <FormField
              {...fieldOptionsMap.durationM}
              value={formState[fieldOptionsMap.durationM.id].value}
              {...inputHandlers}
            />
            <FormField
              {...fieldOptionsMap.durationS}
              value={formState[fieldOptionsMap.durationS.id].value}
              {...inputHandlers}
            />
          </div>

          <div className={styles.averagePace}>Pace</div>

          <FormField
            {...fieldOptionsMap.startTime}
            value={formState[fieldOptionsMap.startTime.id].value}
            {...inputHandlers}
          />

          <div className={styles.weatherWrapper}>
            <FormField
              {...fieldOptionsMap.weatherSunny}
              value="sunny"
              {...inputHandlers}
            />
            <FormField
              {...fieldOptionsMap.weatherPartlyCloudy}
              value="partly_cloudy"
              {...inputHandlers}
            />
            <FormField
              {...fieldOptionsMap.weatherCloudy}
              value="cloudy"
              {...inputHandlers}
            />
            <FormField
              {...fieldOptionsMap.weatherRain}
              value="rain"
              {...inputHandlers}
            />
            <FormField
              {...fieldOptionsMap.weatherSnow}
              value="snow"
              {...inputHandlers}
            />
            <FormField
              {...fieldOptionsMap.weatherWindy}
              value="windy"
              {...inputHandlers}
            />
            <FormField
              {...fieldOptionsMap.weatherHot}
              value="hot"
              {...inputHandlers}
            />
            <FormField
              {...fieldOptionsMap.weatherCold}
              value="cold"
              {...inputHandlers}
            />
          </div>

          <FormField
            {...fieldOptionsMap.perceivedEffort}
            value={formState[fieldOptionsMap.perceivedEffort.id].value}
            {...inputHandlers}
          />

          <FormField
            {...fieldOptionsMap.notes}
            value={formState[fieldOptionsMap.notes.id].value}
            {...inputHandlers}
          />

          <div className={`${styles.submit} ${formError ? styles.error : ""}`}>
            <Button
              buttonText="Save Run"
              type="submit"
              variant="primary"
              isSubmitting={loading !== "idle"}
            />
            <ButtonLink
              linkDirection="."
              linkText="Cancel"
              variant="secondary"
              goBack={true}
            />
          </div>
        </form>
      </Panel>
    </main>
  );
}

export { RunFormPage };
