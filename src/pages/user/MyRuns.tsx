import styles from "./MyRuns.module.css";

import { useRuns } from "../../hooks/useRuns";
import { useRunsContext } from "../../context/RunsContext";
import { useEffect, useMemo } from "react";

import { Button } from "../../components/Button";
import { Loading } from "../../components/Loading";
import { RunItem } from "../../components/runs/RunItem";
import { getWeatherIcon } from "../../utils/icons.utils";
import { Run } from "../../types/runs.types";

function MyRuns() {
  const { runs } = useRunsContext();
  const { loading, getMyRuns, postNewRun } = useRuns();

  useEffect(() => {
    getMyRuns();
  }, [getMyRuns]);

  const runsArray = useMemo(() => Object.values(runs), [runs]);

  function handleNewRun() {
    const payload = {
      startTime: "2026-03-29T19:42:31.123Z",
      durationSec: 61,
      distanceMeters: 378,
      title: "Morning run",
      notes: "Nice run overall.",
      perceivedEffort: 5,
      weather: "sunny",
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

  return loading !== "fetchingRuns" ? (
    <main className={styles.main}>
      <div className={styles.runsWrapper}>
        {runsArray.map((run) => (
          <RunItem run={run} key={run.runId} />
        ))}
      </div>
      <Button
        buttonText="+ Log a Run"
        type="button"
        variant="primary"
        onClick={handleNewRun}
        isSubmitting={loading === "creatingRun"}
      />
    </main>
  ) : (
    <Loading />
  );
}

export { MyRuns };
