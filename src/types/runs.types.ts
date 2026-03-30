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
  stateHydrateRuns: (runs: RunsState) => void;
  stateClearRuns: () => void;
  statePostNewRun: (newRun: Run) => void;
  stateUpdateRun: (updatedRun: Run) => void;
  stateDeleteRun: (id: string) => void;
}

interface RunApi {
  runId: string;
  userId: string;
  startTime: string;
  durationSec: number;
  distanceMeters: number;
  createdAt: string;
  updatedAt: string;
}

type RunApiResponse = { runData: RunApi };
type MyRunsApiResponse = { myRuns: RunApi[] };

interface RunData {
  startTime: string;
  durationSec: number;
  distanceMeters: number;
}

export type {
  Run,
  RunsState,
  RunsContextValue,
  RunApi,
  RunApiResponse,
  MyRunsApiResponse,
  RunData,
};
