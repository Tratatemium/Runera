import styles from "./RunFormPage.module.css";
import { icons } from "../../components/icons/icons";

import { inputFields } from "../../config/inputFields";

import { Button, ButtonLink, FormField, Panel } from "../../components/ui/";
import { useFormState } from "../../hooks/form/useFormState";
import { useFormHandlers } from "../../hooks/form/useFormHandlers";
import { useRuns } from "../../hooks/useRuns";
import { Run, RunData } from "../../types/runs.types";
import { FormData } from "../../types/forms.types";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRunsContext } from "../../context/RunsContext";
import { getRunData } from "../../utils/runs.utils";
import { normalizeFormValue } from "../../utils/normalize.utils";

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

const ArrowBack = icons.arrowBack;

function RunFormPage() {
  /* ────────────────────────────── */
  /*  new or edit                   */
  /* ────────────────────────────── */

  const { runId } = useParams();
  const { runs } = useRunsContext();

  const isEdit = !!runId;

  const [run, setRun] = useState<Run | undefined>(undefined);

  useEffect(() => {
    if (!runId || !runs) return;
    setRun(runs[runId]);
  }, [runId, runs]);

  const initialValues = run
    ? Object.fromEntries(
        Object.entries(run).map(([k, v]) => [k, normalizeFormValue(v)]),
      )
    : undefined;

  /* ────────────────────────────── */
  /*  state and hooks               */
  /* ────────────────────────────── */

  type RunForm = {
    [K in (typeof runFields)[number]["id"]]: string;
  };

  const formStateHook = useFormState(runFields, initialValues);
  const { formState } = formStateHook;
  const { inputHandlers, handleSubmit } = useFormHandlers(
    runFields,
    formStateHook,
  );

  const { loading, formError, postNewRun, updateRun } = useRuns();

  async function submitRun(data: RunForm) {
    const payload = getRunData(data);
    isEdit ? updateRun(runId, payload) : postNewRun(payload);
  }

  function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    handleSubmit(e, submitRun);
  }

  return (
    <main className={styles.main}>
      <Panel variant="frosted">
        
        <ButtonLink
          linkDirection="."
          linkText="Go Back"
          variant="transparentAccent"
          goBack={true}
        >
          <ArrowBack />
        </ButtonLink>

        <h1 className={styles.title}>{isEdit ? "Edit Run" : "Add New Run"}</h1>
        Update your run details Log your running activity
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
