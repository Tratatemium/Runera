import type { ErrorData } from "../types/error.types";

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

export { ServerError };
