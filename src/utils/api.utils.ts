import { ApiResponse } from "../types/api.types";
import { ApiError } from "../errors/errors";

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

function handleServerErrors(response: Response, data: ApiResponse) {
  const status = response.status;
  const message = data.error?.message ?? "Unknown server error.";
  const code = data.error?.name;
  const field = data.error?.field;

  const isLoginError = code === "LoginError";
  if (status === 401 && !isLoginError) {
    window.dispatchEvent(new Event("unauthorized"));
  }

  throw new ApiError(message, status, code, field);
}

export { joinUrl, getResponseData, handleServerErrors };
