import ExpectedError from "./expected_error.ts";

// Error to throw for known scenarios
class NotAuthenticatedError extends ExpectedError {
  constructor(message: string) {
    super(message);
    this.statusCode = 401;
    this.title = 'Not Authenticated';
    this.message = message || 'The token is blank, invalid or expired';
  }
}

export default NotAuthenticatedError;
