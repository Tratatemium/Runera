import type { ErrorData, ParsedServerError } from "../types/error.types";

import { config } from "../config/appConfig";
import {
  joinUrl,
  getResponseData,
  handleServerErrors,
} from "../utils/api.utils";
import { ServerError } from "./errors";

async function apiRequest<T>(path: string, options: RequestInit): Promise<T> {
  const response = await fetch(joinUrl(config.BASE_URL, path), {
    credentials: "include",
    ...options,
  });
  const data = await getResponseData(response);
  if (!response.ok) handleServerErrors(response, data as ErrorData, path);

  return (data as { data: T }).data;
}

function parseServerError(err: unknown): ParsedServerError {
  if (err instanceof ServerError) {
    const field = err.data?.error?.field;
    const message = err.data?.error?.message;

    if (err.status === 409 && field) {
      return {
        fieldErrors: {
          [field]: `This ${field} already exists`,
        },
      };
    }

    if (err.status === 401) {
      return {
        generalError: "Invalid combination of login and password.",
      };
    }

    return {
      generalError: message || "Something went wrong",
    };
  }

  return {
    generalError: "Unknown error",
  };
}

export { apiRequest, ServerError, parseServerError };
