class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

class ApiValidationError extends ApiError {
  constructor(
    message: string,
    status: number,
    public field: string,
  ) {
    super(message, status);
  }
}

class ApiLoginError extends ApiError {}
class ApiAuthError extends ApiError {}
class ApiGuardError extends ApiError {}
class ApiNotFoundError extends ApiError {}

export {
  ApiError,
  ApiValidationError,
  ApiLoginError,
  ApiAuthError,
  ApiGuardError,
  ApiNotFoundError,
};
