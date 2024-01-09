export class ApiError extends Error {}

export class ConnectionError extends ApiError {}

export class InternalServerError extends ApiError {}

export class PayloadError extends ApiError {
  fieldErrors?: Record<string, string>

  constructor(message: string, fieldErrors?: Record<string, string>) {
    super(message)
    this.fieldErrors = fieldErrors
  }
}

export class AuthError extends ApiError {
  fieldErrors?: Record<string, string>

  constructor(message: string, fieldErrors?: Record<string, string>) {
    super(message)
    this.fieldErrors = fieldErrors
  }
}

export class SameQueryError extends ApiError {}