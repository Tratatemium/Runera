class ApiError extends Error {
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

export { ApiError };
