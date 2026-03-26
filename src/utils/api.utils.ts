import type { ErrorData } from "../types/error.types";
import { ServerError } from "../api/errors";

function joinUrl(urlPart1: string, urlPart2: string) {
  return `${urlPart1.replace(/\/+$/, "")}/${urlPart2.replace(/^\/+/, "")}`;
}

async function getResponseData(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function handleServerErrors(response: Response, data: ErrorData, path: string) {
  const status = response.status;

  if (status === 401 && !path.includes("/login")) {
    return window.dispatchEvent(new Event("unauthorized"));
  }

  throw new ServerError(
    data?.error?.message ?? "Server error",
    response.status,
    data,
  );
}

export { joinUrl, getResponseData, handleServerErrors };
