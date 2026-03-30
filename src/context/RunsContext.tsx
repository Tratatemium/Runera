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

  const hydrateRunsState = useCallback((runs: RunsState) => setRuns(runs), []);

  const clearRunsState = useCallback(() => setRuns({}), []);

  const postNewRunState = useCallback((newRun: Run) => {
    setRuns((prev) => ({
      ...prev,
      [newRun.runId]: newRun,
    }));
  }, []);

  const updateRunState = useCallback(
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

  const deleteRunState = useCallback(
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
    if (!user) clearRunsState();
  }, [user, clearRunsState]);

  const value = useMemo(
    () => ({
      runs,
      hydrateRunsState,
      clearRunsState,
      postNewRunState,
      updateRunState,
      deleteRunState,
    }),
    [
      runs,
      hydrateRunsState,
      clearRunsState,
      postNewRunState,
      updateRunState,
      deleteRunState,
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
