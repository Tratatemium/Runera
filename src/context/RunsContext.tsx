import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import type { Run, RunsState, RunsContextValue } from "../types/runs.types";
import { AppError } from "../errors/errors";

const RunsContext = createContext<RunsContextValue | undefined>(undefined);

type RunsProviderProps = {
  children: ReactNode;
};

function RunsProvider({ children }: RunsProviderProps) {
  const [runs, setRuns] = useState<RunsState>({});

  const runExists = useCallback((id: string) => Boolean(runs[id]), [runs]);

  const addRun = useCallback((newRun: Run) => {
    setRuns((prev) => ({
      ...prev,
      [newRun.runId]: newRun,
    }));
  }, []);

  const updateRun = useCallback((updatedRun: Run) => {
    setRuns((prev) => {
      if (!runExists(updatedRun.runId)) return prev;
      return {
        ...prev,
        [updatedRun.runId]: updatedRun,
      };
    });
  }, []);

  const deleteRun = useCallback((id: string) => {
    setRuns((prev) => {
      if (!runExists(id)) return prev;

      const { [id]: _, ...rest } = prev;
      return rest;
    });
  }, []);

  const value = { runs, setRuns, addRun, updateRun, deleteRun };
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
