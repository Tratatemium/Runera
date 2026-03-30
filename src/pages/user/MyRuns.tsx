import styles from "./MyRuns.module.css";

import { useRuns } from "../../hooks/useRuns";
import { useRunsContext } from "../../context/RunsContext";
import { useEffect, useMemo } from "react";

import { Button } from "../../components/Button";
import { Loading } from "../../components/Loading";

function MyRuns() {
  const { runs } = useRunsContext();
  const { isFetching, getMyRuns, postNewRun } = useRuns();

  useEffect(() => {
    getMyRuns();
  }, [getMyRuns]);

  const runsArray = useMemo(() => Object.values(runs), [runs]);

  function handleNewRun() {
    const payload = {
      startTime: "2026-03-29T19:42:31.123Z",
      durationSec: 61,
      distanceMeters: 378,
    };
    postNewRun(payload);
  }

  //   function handleUpdate() {
  //     const payload = {
  //       startTime: "2026-03-29T19:42:31.123Z",
  //       durationSec: 3,
  //       distanceMeters: 3,
  //     };
  //     const runId = "eaab0c97-1317-4fc8-8123-4b6f63552f72";
  //     updateRun(runId, payload);
  //   }

  //   function handleDelete() {
  //     const runId = "eaab0c97-1317-4fc8-8123-4b6f63552f72";
  //     deleteRun(runId);
  //   }

  return (
    <main className={styles.main}>
      <div className={styles.runsWrapper}>
        {!isFetching &&
          runsArray.map((run) => {
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
        {isFetching && <Loading />}
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
