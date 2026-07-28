export class AppError extends Error {
  constructor(
    message: string,
    public code: string = "INTERNAL_ERROR",
    public statusCode: number = 500,
  ) {
    super(message)
    this.name = "AppError"
  }
}

export class DatabaseError extends AppError {
  constructor(message: string, public cause?: unknown) {
    super(message, "DATABASE_ERROR", 500)
    this.name = "DatabaseError"
  }
}

export class ValidationError extends AppError {
  constructor(message: string, public issues?: unknown) {
    super(message, "VALIDATION_ERROR", 400)
    this.name = "ValidationError"
  }
}

export class PermissionError extends AppError {
  constructor(message = "You do not have permission to perform this action") {
    super(message, "PERMISSION_ERROR", 403)
    this.name = "PermissionError"
  }
}

export class NotFoundError extends AppError {
  constructor(resource = "Resource") {
    super(`${resource} not found`, "NOT_FOUND", 404)
    this.name = "NotFoundError"
  }
}
