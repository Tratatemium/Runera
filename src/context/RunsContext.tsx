import type { Run, RunsState, RunsContextValue } from "../types/runs.types";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AppError } from "../errors/errors";
import { useAuthContext } from "./AuthContext";

const RunsContext = createContext<RunsContextValue | undefined>(undefined);

type RunsProviderProps = {
  children: ReactNode;
};

function RunsProvider({ children }: RunsProviderProps) {
  const [runs, setRuns] = useState<RunsState>({});

  const runExists = useCallback((id: string) => Boolean(runs[id]), [runs]);

  const stateHydrateRuns = useCallback((runs: RunsState) => setRuns(runs), []);

  const stateClearRuns = useCallback(() => setRuns({}), []);

  const statePostNewRun = useCallback((newRun: Run) => {
    setRuns((prev) => ({
      ...prev,
      [newRun.runId]: newRun,
    }));
  }, []);

  const stateUpdateRun = useCallback(
    (updatedRun: Run) => {
      setRuns((prev) => {
        if (!runExists(updatedRun.runId)) return prev;
        return {
          ...prev,
          [updatedRun.runId]: updatedRun,
        };
      });
    },
    [runExists],
  );

  const stateDeleteRun = useCallback(
    (id: string) => {
      setRuns((prev) => {
        if (!runExists(id)) return prev;

        const { [id]: _, ...rest } = prev;
        return rest;
      });
    },
    [runExists],
  );

  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) stateClearRuns();
  }, [user, stateClearRuns]);

  const value = useMemo(
    () => ({
      runs,
      stateHydrateRuns,
      stateClearRuns,
      statePostNewRun,
      stateUpdateRun,
      stateDeleteRun,
    }),
    [
      runs,
      stateHydrateRuns,
      stateClearRuns,
      statePostNewRun,
      stateUpdateRun,
      stateDeleteRun,
    ],
  );
  return <RunsContext.Provider value={value}>{children}</RunsContext.Provider>;
}

function useRunsContext() {
  const context = useContext(RunsContext);

  if (!context) {
    throw new AppError("useRunsContext must be used inside RunsProvider");
  }

  return context;
}

export { RunsProvider, useRunsContext };
