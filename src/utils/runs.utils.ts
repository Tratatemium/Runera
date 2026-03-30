import type {
  Run,
  RunApi,
  RunApiResponse,
  MyRunsApiResponse,
  RunsState,
} from "../types/runs.types";

import { formatSeconds, normalizeDate, normalizeTime } from "./normalize.utils";

function normalizeRun(run: RunApi): Run {
  const { createdAt: _, updatedAt: __, ...rest } = run;
  return {
    ...rest,
    startTime: normalizeTime(run.startTime),
    date: normalizeDate(run.date),

    formattedDuration: formatSeconds(run.durationSec),
    distanceKm: Math.round(run.distanceMeters / 10) / 100,

    paceSecPerKm: Math.round(run.paceSecPerKm),
    formattedPace: `${formatSeconds(run.paceSecPerKm)} /km`,
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
