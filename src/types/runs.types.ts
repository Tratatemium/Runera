import type { Dispatch, SetStateAction } from "react";

interface Run {
  runId: string;
  userId: string;
  startTime: string;
  durationSec: number;
  distanceMeters: number;
}

type RunsState = Record<string, Run>;

interface RunsContextValue {
  runs: RunsState;
  hydrateRuns: (runs: RunsState) => void;
  clearRuns: () => void;
  addRun: (newRun: Run) => void;
  updateRun: (updatedRun: Run) => void;
  deleteRun: (id: string) => void;
}

export type { Run, RunsState, RunsContextValue };
