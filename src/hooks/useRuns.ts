import type { RunData } from "../types/runs.types";

import { useState } from "react";

import * as runsApi from "../api/runs.api";
import { useRunsContext } from "../context/RunsContext";
import { normalizeRunData, normalizeMyRuns } from "../utils/runs.utils";

interface UseRunsReturn {
  isFetching: boolean;
  formError: string | undefined;
  getMyRuns: () => Promise<void>;
  postNewRun: (payload: RunData) => Promise<void>;
  updateRun: (runId: string, payload: RunData) => Promise<void>;
  deleteRun: (runId: string) => Promise<void>;
}

function useRuns(): UseRunsReturn {
  const [isFetching, setIsFetching] = useState(false);
  const [formError, setFormError] = useState<string | undefined>(undefined);
  const context = useRunsContext();

  async function getMyRuns() {
    setIsFetching(true);
    try {
      const response = await runsApi.getMyRuns();
      context.hydrateRuns(normalizeMyRuns(response));
    } catch (err) {
      console.error(err);
    } finally {
      setIsFetching(false);
    }
  }

  async function postNewRun(payload: RunData) {
    setIsFetching(true);
    try {
      const response = await runsApi.postNewRun(payload);
      context.addRun(normalizeRunData(response));
    } catch (err) {
      console.error(err);
    } finally {
      setIsFetching(false);
    }
  }

  async function updateRun(runId: string, payload: RunData) {
    setIsFetching(true);
    try {
      const response = await runsApi.updateRun(runId, payload);
      context.updateRun(normalizeRunData(response));
    } catch (err) {
      console.error(err);
    } finally {
      setIsFetching(false);
    }
  }

  async function deleteRun(runId: string) {
    setIsFetching(true);
    try {
      await runsApi.deleteRun(runId);
      context.deleteRun(runId);
    } catch (err) {
      console.error(err);
    } finally {
      setIsFetching(false);
    }
  }

  return { isFetching, formError, getMyRuns, postNewRun, updateRun, deleteRun };
}

export { useRuns };
