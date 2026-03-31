import type { Run } from "../../types/runs.types";

import styles from "./RunItem.module.css";
import { icons } from "../icons/icons";

import { getWeatherIcon } from "../../utils/icons.utils";

const {
  delete: DeleteIcon,
  edit: EditIcon,
  clock: ClockIcon,
  speed: SpeedIcon,
  calendar: CalendarIcon,
} = icons;

interface RunItemProps {
  run: Run;
}

function RunItem({ run }: RunItemProps) {
  return (
    <div className={styles.runWrapper}>
      <div className={styles.runInfo}>
        <h1 className={styles.runHeading}>
          <span className={styles.distanceKm}>{run.distanceKm}</span>
          {run.title && <span className={styles.title}>{run.title}</span>}
        </h1>
        <p className={styles.timing}>
          <span className={styles.duration}>
            <ClockIcon />
            {run.formattedDuration}
          </span>
          <span className={styles.pace}>
            <SpeedIcon />
            {run.formattedPace}
          </span>
        </p>
        <p className={styles.circumstances}>
          <span className={styles.date}>
            <CalendarIcon />
            {run.date}
          </span>
          {run.weather && (
            <span className={styles.weather}>
              {getWeatherIcon(run.weather)}
            </span>
          )}
        </p>
      </div>
      <div className={styles.runActions}>
        <button
          className={styles.acyionButton}
          type="button"
          onClick={() => {}}
        >
          <DeleteIcon />
        </button>
        <button
          className={styles.acyionButton}
          type="button"
          onClick={() => {}}
        >
          <EditIcon />
        </button>
      </div>
    </div>
  );
}

export { RunItem };
