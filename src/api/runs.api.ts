import type {
  RunApiResponse,
  MyRunsApiResponse,
  RunData,
} from "../types/runs.types";
import { apiRequest } from "./client";
import { API } from "../config/apiConfig";
import { joinUrl, jsonOptions } from "../utils/api.utils";

function getMyRuns() {
  return apiRequest<MyRunsApiResponse>({
    path: API.runs.myRuns,
    assertData: true,
    options: { method: "GET" },
  });
}

function postNewRun(data: RunData) {
  return apiRequest<RunApiResponse>({
    path: API.runs.myRuns,
    assertData: true,
    options: jsonOptions("POST", data),
  });
}

function updateRun(runId: string, data: RunData) {
  return apiRequest<RunApiResponse>({
    path: joinUrl(API.runs.runs, runId),
    assertData: true,
    options: jsonOptions("PATCH", data),
  });
}

function deleteRun(runId: string) {
  return apiRequest({
    path: joinUrl(API.runs.runs, runId),
    assertData: false,
    options: { method: "DELETE" },
  });
}

export { getMyRuns, postNewRun, updateRun, deleteRun };
