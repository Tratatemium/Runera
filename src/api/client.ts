import type { ApiResponse } from "../types/api.types";

import { config } from "../config/appConfig";
import {
  joinUrl,
  getResponseData,
  handleServerErrors,
} from "../utils/api.utils";

async function apiRequest<T>(
  path: string,
  options: RequestInit,
): Promise<T | null> {
  const response = await fetch(joinUrl(config.BASE_URL, path), {
    credentials: "include",
    ...options,
  });
  const data = await getResponseData(response);
  if (!response.ok) handleServerErrors(response, data as ApiResponse);

  if (!data) return null;

  return (data as { data: T }).data;
}

export { apiRequest };
