import styles from "./RunFormPage.module.css";

import { inputFields } from "../../config/inputFields";

import { Button, ButtonLink, FormField, Panel } from "../../components/ui/";

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
  return (
    <main className={styles.main}>
      <Panel variant="frosted">
        <form className={styles.form} onSubmit={() => {}} noValidate>
          <FormField
            {...fieldOptionsMap.title}
            value=""
            onChange={()=>{}}
            // value={formState[fieldOptionsMap.id].value}
            // {...inputHandlers}
          />
        </form>
      </Panel>
    </main>
  );
}

export { RunFormPage };
