import type { RunData } from "../../types/runs.types";

import styles from "./MyRuns.module.css";
import { icons } from "../../components/icons/icons";

import { useRuns } from "../../hooks/useRuns";
import { useRunsContext } from "../../context/RunsContext";
import { useEffect, useMemo, useRef, useState } from "react";

import { Loading } from "../../components/ui/";
import { RunItem } from "../../components/runs/RunItem";
import { useNavigate } from "react-router-dom";

const { spinner: SpinnerIcon, plus: PlusIcon } = icons;

function MyRuns() {
  const { runs, isHydaratingRuns } = useRunsContext();
  const { loading, loadingRunId, postNewRun, deleteRun } = useRuns();
  const [enteringRunIds, setEnteringRunIds] = useState<Record<string, true>>(
    {},
  );
  const prevRunIdsRef = useRef<Set<string>>(new Set());
  const hasInitializedRef = useRef(false);

  const runsArray = useMemo(() => {
    if (!runs) return [];
    return Object.values(runs);
  }, [runs]);

  useEffect(() => {
    const currentRunIds = new Set(runsArray.map((run) => run.runId));

    if (!hasInitializedRef.current) {
      prevRunIdsRef.current = currentRunIds;
      hasInitializedRef.current = true;
      return;
    }

    const addedRunIds: string[] = [];
    currentRunIds.forEach((runId) => {
      if (!prevRunIdsRef.current.has(runId)) {
        addedRunIds.push(runId);
      }
    });

    if (addedRunIds.length > 0) {
      setEnteringRunIds((prev) => {
        const next = { ...prev };
        addedRunIds.forEach((runId) => {
          next[runId] = true;
        });
        return next;
      });
    }

    prevRunIdsRef.current = currentRunIds;
  }, [runsArray]);
  const navigate = useNavigate()
  function handleNewRun() {
    navigate("/user/new-run")
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

  return !isHydaratingRuns ? (
    <main className={styles.main}>
      <div className={styles.runsWrapper}>
        {runsArray.map((run) => (
          <RunItem
            run={run}
            loading={loading}
            loadingRunId={loadingRunId}
            onDelete={deleteRun}
            isEntering={Boolean(enteringRunIds[run.runId])}
            key={run.runId}
          />
        ))}
      </div>
      <button
        className={styles.addRunButton}
        type="button"
        onClick={handleNewRun}
        disabled={loading === "creatingRun"}
        aria-label="Add new run"
      >
        {loading === "creatingRun" ? <SpinnerIcon /> : <PlusIcon />}
      </button>
    </main>
  ) : (
    <Loading />
  );
}

export { MyRuns };
