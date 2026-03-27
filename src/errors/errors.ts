class AppError extends Error {
  constructor(message: string) {
    (super(message), (this.name = "AppError"));
  }
}

class ApiError extends AppError {
  constructor(
    message: string,
    public status?: number,
    public code?: string,
    public field?: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

class ResponseError extends AppError {
  constructor(message: string) {
    (super(message), (this.name = "ResponseError"));
  }
}

export { ApiError, ResponseError };
