interface ErrorData {
  error?: {
    field?: string;
    message: string;
  };
}

interface ParsedServerError {
  fieldErrors?: Record<string, string>;
  generalError?: string;
}

export type { ErrorData, ParsedServerError };
