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

const weatherLabelMap: Record<NonNullable<Run["weather"]>, string> = {
  sunny: "Sunny",
  partly_cloudy: "Partly cloudy",
  cloudy: "Cloudy",
  rain: "Rain",
  snow: "Snow",
  windy: "Windy",
  hot: "Hot",
  cold: "Cold",
};

function RunItem({ run }: RunItemProps) {
  const weatherLabel = run.weather ? weatherLabelMap[run.weather] : null;

  return (
    <article className={styles.runWrapper} aria-label={`${run.distanceKm} kilometer run`}>
      <div className={styles.runInfo}>
        <div className={styles.runHeading}>
          <h2 className={styles.distanceKm}>{`${run.distanceKm} km`}</h2>
          {run.title && <p className={styles.runTitle}>{run.title}</p>}
        </div>
        <p className={styles.timing}>
          <span className={styles.duration}>
            <ClockIcon aria-hidden="true" focusable="false" />
            {run.formattedDuration}
          </span>
          <span aria-hidden="true">•</span>
          <span className={styles.pace}>
            <SpeedIcon aria-hidden="true" focusable="false" />
            {run.formattedPace}
          </span>
        </p>
        <p className={styles.circumstances}>
          <time className={styles.date} dateTime={run.startTime}>
            <CalendarIcon aria-hidden="true" focusable="false" />
            {run.date}
          </time>
          {run.weather && (
            <span className={styles.weather} aria-label={weatherLabel ?? undefined}>
              {getWeatherIcon(run.weather)}
            </span>
          )}
        </p>
      </div>
      <div className={styles.runActions} aria-label="Run actions">
        <button
          className={styles.actionButton}
          type="button"
          onClick={() => {}}
          aria-label={`Delete ${run.distanceKm} kilometer run from ${run.date}`}
          title="Delete run"
        >
          <DeleteIcon aria-hidden="true" focusable="false" />
        </button>
        <button
          className={styles.actionButton}
          type="button"
          onClick={() => {}}
          aria-label={`Edit ${run.distanceKm} kilometer run from ${run.date}`}
          title="Edit run"
        >
          <EditIcon aria-hidden="true" focusable="false" />
        </button>
      </div>
    </article>
  );
}

export { RunItem };
