import type { RunData } from "../types/runs.types";

import { useCallback, useState } from "react";

import {
  apiGetMyRuns,
  apiPostNewRun,
  apiUpdateRun,
  apiDeleteRun,
} from "../api/runs.api";
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
  const { stateHydrateRuns, statePostNewRun, stateUpdateRun, stateDeleteRun } =
    useRunsContext();

  const getMyRuns = useCallback(async () => {
    setIsFetching(true);
    try {
      const response = await apiGetMyRuns();
      stateHydrateRuns(normalizeMyRuns(response));
    } catch (err) {
      console.error(err);
    } finally {
      setIsFetching(false);
    }
  }, [stateHydrateRuns]);

  async function postNewRun(payload: RunData) {
    setIsFetching(true);
    setFormError(undefined);
    try {
      const response = await apiPostNewRun(payload);
      statePostNewRun(normalizeRunData(response));
    } catch (err) {
      console.error(err);
    } finally {
      setIsFetching(false);
    }
  }

  async function updateRun(runId: string, payload: RunData) {
    setIsFetching(true);
    setFormError(undefined);
    try {
      const response = await apiUpdateRun(runId, payload);
      stateUpdateRun(normalizeRunData(response));
    } catch (err) {
      console.error(err);
    } finally {
      setIsFetching(false);
    }
  }

  async function deleteRun(runId: string) {
    setIsFetching(true);
    setFormError(undefined);
    try {
      await apiDeleteRun(runId);
      stateDeleteRun(runId);
    } catch (err) {
      console.error(err);
    } finally {
      setIsFetching(false);
    }
  }

  return { isFetching, formError, getMyRuns, postNewRun, updateRun, deleteRun };
}

export { useRuns };
