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
  hydrateRunsState: (runs: RunsState) => void;
  clearRunsState: () => void;
  postNewRunState: (newRun: Run) => void;
  updateRunState: (updatedRun: Run) => void;
  deleteRunState: (id: string) => void;
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
