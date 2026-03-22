import type { ErrorData, ParsedServerError } from "../types/error.types";

import { config } from "../config/config";
class ServerError extends Error {
  status: number;
  data: ErrorData;

  constructor(message: string, status: number, data: ErrorData) {
    super(message);
    this.name = "ServerError";
    this.status = status;
    this.data = data;
  }
}

function joinUrl(urlPart1: string, urlPart2: string) {
  return `${urlPart1.replace(/\/+$/, "")}/${urlPart2.replace(/^\/+/, "")}`;
}

async function apiRequest<T>(path: string, options: RequestInit): Promise<T> {
  const response = await fetch(joinUrl(config.BASE_URL, path), {
    credentials: "include",
    ...options,
  });

  let data;

  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new ServerError(
      data?.error?.message ?? "Server error",
      response.status,
      data,
    );
  }

  return data.data ?? data;
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
