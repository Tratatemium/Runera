import styles from "./MyRuns.module.css";

import { useRuns } from "../../hooks/useRuns";
import { useRunsContext } from "../../context/RunsContext";
import { useEffect, useMemo } from "react";

import { Button } from "../../components/Button";

function MyRuns() {
  const { runs } = useRunsContext();
  const { isFetching, getMyRuns, postNewRun } = useRuns();

  useEffect(() => {
    getMyRuns();
  }, []);

  const runsArray = useMemo(() => Object.values(runs), [runs]);

  function handleNewRun() {
    const payload = {
      startTime: "2026-03-29T19:42:31.123Z",
      durationSec: 61,
      distanceMeters: 378,
    };
    postNewRun(payload);
  }

  return (
    <main className={styles.main}>
      <div className={styles.runsWrapper}>
        {runsArray.map((run) => {
          return (
            <div key={run.runId} className={styles.runWrapper}>
              {Object.entries(run).map(([key, value]) => {
                return (
                  <p key={key} className={styles.runField}>
                    <span className={styles.key}>{key}:</span>
                    <span className={styles.value}>{value}</span>
                  </p>
                );
              })}
            </div>
          );
        })}
      </div>
      <Button
        buttonText="+ Log a Run"
        type="button"
        variant="primary"
        onClick={handleNewRun}
        isSubmitting={isFetching}
      />
    </main>
  );
}

export { MyRuns };
