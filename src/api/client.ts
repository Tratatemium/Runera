interface ErrorData {
  error: {
    field?: string;
    message: string;
  };
}

interface ParsedServerError {
  fieldErrors?: Record<string, string>;
  generalError?: string;
}

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

async function apiRequest<T>(url: string, options: RequestInit): Promise<T> {
  const response = await fetch(url, {
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
