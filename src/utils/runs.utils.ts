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
  const result: RunsState = {};

  for (const key in rawResponse.myRuns) {
    result[key] = normalizeRun(rawResponse.myRuns[key]);
  }

  return result;
}

function normalizeRunData(runData: RunApiResponse): Run {
  return normalizeRun(runData.runData);
}

export { normalizeMyRuns, normalizeRunData };
