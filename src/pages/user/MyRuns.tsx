import styles from "./MyRuns.module.css";
import { icons } from "../../components/icons/icons";
import bg from "../../assets/bg1.png";

import { useRuns } from "../../hooks/useRuns";
import { useRunsContext } from "../../context/RunsContext";
import { useEffect, useMemo } from "react";

import { Button, Loading } from "../../components/ui/";
import { RunItem } from "../../components/runs/RunItem";

const { spinner: SpinnerIcon, plus: PlusIcon } = icons;

function MyRuns() {
  const { runs } = useRunsContext();
  const { loading, loadingRunId, getMyRuns, postNewRun, deleteRun } = useRuns();

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

  return loading !== "fetchingRuns" ? (
    <main className={styles.main} style={{ backgroundImage: `url(${bg})` }}>
      <div className={styles.runsWrapper}>
        {runsArray.map((run) => (
          <RunItem
            run={run}
            loading={loading}
            loadingRunId={loadingRunId}
            onDelete={deleteRun}
            key={run.runId}
          />
        ))}
      </div>
      <button
        className={styles.addRunButton}
        type="button"
        onClick={handleNewRun}
        disabled={loading === "creatingRun"}
      >
        {loading === "creatingRun" ? <SpinnerIcon /> : <PlusIcon />}
      </button>
    </main>
  ) : (
    <Loading />
  );
}

export { MyRuns };
