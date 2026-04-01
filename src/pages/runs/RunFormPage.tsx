import styles from "./RunFormPage.module.css";

import { inputFields } from "../../config/inputFields";

import { Button, ButtonLink, FormField, Panel } from "../../components/ui/";
import { useFormState } from "../../hooks/form/useFormState";
import { useFormHandlers } from "../../hooks/form/useFormHandlers";
import { useRuns } from "../../hooks/useRuns";
import { RunData } from "../../types/runs.types";
import { FormData, FormStateValue } from "../../types/forms.types";

const durationFields = [
  inputFields.durationH,
  inputFields.durationM,
  inputFields.durationS,
];

const weatherFields = [
  inputFields.weatherSunny,
  inputFields.weatherPartlyCloudy,
  inputFields.weatherCloudy,
  inputFields.weatherRain,
  inputFields.weatherSnow,
  inputFields.weatherWindy,
  inputFields.weatherHot,
  inputFields.weatherCold,
];

const runFields = [
  inputFields.title,
  inputFields.distanceKm,
  ...durationFields,
  inputFields.startTime,
  ...weatherFields,
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

  function getRunData(data: FormData): RunData {
    const { distanceKm, durationH, durationM, durationS, ...rest } = data;

    return {
      ...rest,
      distanceMeters: Number(distanceKm) * 1000,
      durationSec:
        Number(durationH) * 3600 + Number(durationM) * 60 + Number(durationS),
    } as RunData;
  }

  // function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
  //   e.preventDefault();
  //   console.log(getRunData(formState));
  // }

  async function submitNewRun(data: RunForm) {
    const payload = getRunData(data);
    postNewRun(payload);
  }

  function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    handleSubmit(e, submitNewRun);
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
            inputError={formState[fieldOptionsMap.distanceKm.id].error}
            {...inputHandlers}
          />

          <div className={styles.durationWrapper}>
            <span className={styles.durationLabel}>Duration *</span>
            {durationFields.map((field) => (
              <FormField
                key={field.id}
                {...field}
                value={formState[field.name].value}
                {...inputHandlers}
              />
            ))}
          </div>

          <div className={styles.averagePace}>Pace</div>

          <FormField
            {...fieldOptionsMap.startTime}
            value={formState[fieldOptionsMap.startTime.id].value}
            inputError={formState[fieldOptionsMap.startTime.id].error}
            {...inputHandlers}
          />

          <div className={styles.weatherWrapper}>
            {weatherFields.map((field) => (
              <FormField
                key={field.id}
                {...field}
                value={field.value as string}
                {...inputHandlers}
              />
            ))}
          </div>

          <FormField
            {...fieldOptionsMap.perceivedEffort}
            label={`Effort lavel: ${formState[fieldOptionsMap.perceivedEffort.id].value || "-"}/10`}
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
