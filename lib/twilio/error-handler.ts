export class TwilioError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code?: string
  ) {
    super(message);
    this.name = 'TwilioError';
  }
}

export function handleTwilioError(error: unknown): TwilioError {
  if (error instanceof TwilioError) {
    return error;
  }

  if (error instanceof Error) {
    // Map Twilio SDK errors to our error types
    if (error.message.includes('Authentication')) {
      return new TwilioError('Invalid Twilio credentials', 401, 'AUTH_ERROR');
    }
    if (error.message.includes('Rate limit')) {
      return new TwilioError('Rate limit exceeded', 429, 'RATE_LIMIT');
    }
    if (error.message.includes('Missing Twilio credentials')) {
      return new TwilioError('Missing Twilio credentials', 500, 'MISSING_CREDENTIALS');
    }
  }

  return new TwilioError('An unexpected error occurred', 500, 'UNKNOWN_ERROR');
}
