import { entries } from "lodash";
import type {
  Run,
  RunApi,
  RunApiResponse,
  MyRunsApiResponse,
  RunsState,
} from "../types/runs.types";

import { normalizeTime } from "./normalize.utils";

function normalizeRun({ createdAt, updatedAt, ...run }: RunApi): Run {
  return {
    ...run,
    startTime: normalizeTime(run.startTime),
  };
}

function normalizeMyRuns(rawResponse: MyRunsApiResponse): RunsState {
  const entries = rawResponse.myRuns.map((run) => [
    run.runId,
    normalizeRun(run),
  ]);
  return Object.fromEntries(entries);
}

function normalizeRunData(runData: RunApiResponse): Run {
  return normalizeRun(runData.runData);
}

export { normalizeMyRuns, normalizeRunData };
