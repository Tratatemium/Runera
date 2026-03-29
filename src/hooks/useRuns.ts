import type {
  RunApiResponse,
  MyRunsApiResponse,
  RunsState,
  Run,
} from "../types/runs.types";

import { useState } from "react";

import * as runsApi from "../api/runs.api";
import { useRunsContext } from "../context/RunsContext";
import { normalizeRunData, normalizeMyRuns } from "../utils/runs.utils";

interface UseRunsReturn {
  isFetching: boolean;
  formError: string | undefined;
  getMyRuns: () => Promise<void>;
}

function useRuns(): UseRunsReturn {
  const [isFetching, setIsFetching] = useState(false);
  const [formError, setFormError] = useState<string | undefined>(undefined);
  const { hydrateRuns, addRun, updateRun, deleteRun } = useRunsContext();

  async function getMyRuns() {
    setIsFetching(true);
    try {
      const response = await runsApi.getMyRuns();
      hydrateRuns(normalizeMyRuns(response));
    } catch (err) {
      console.error(err);
    } finally {
      setIsFetching(false);
    }
  }

  return { isFetching, formError, getMyRuns };
}

export { useRuns };
