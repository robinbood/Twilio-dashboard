/**
 * Validate a date string in ISO format (YYYY-MM-DD)
 * This ensures the date is both valid and in the correct format
 */
export function isValidDate(date: string): boolean {
  if (!date || typeof date !== 'string') {
    return false;
  }

  // Check if it matches YYYY-MM-DD format
  const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!isoDateRegex.test(date)) {
    return false;
  }

  // Parse the date and check if it's valid
  const parsedDate = new Date(date);
  
  // Check if the date is invalid
  if (isNaN(parsedDate.getTime())) {
    return false;
  }

  // Check if the parsed date matches the input (handles cases like 2024-02-30)
  const isoString = parsedDate.toISOString().split('T')[0];
  return isoString === date;
}

/**
 * Validate a date range
 */
export function isValidDateRange(startDate: string, endDate: string): boolean {
  const start = new Date(startDate);
  const end = new Date(endDate);

  return start <= end;
}

/**
 * Sanitize a message body to prevent XSS
 */
export function sanitizeMessageBody(body: string): string {
  // Remove HTML tags
  return body.replace(/<[^>]*>/g, '');
}

/**
 * Validate a limit parameter
 */
export function isValidLimit(limit: number): boolean {
  return !isNaN(limit) && limit >= 1 && limit <= 10000;
}

/**
 * Validate a phone number
 */
export function validatePhoneNumber(phone: string): {
  isValid: boolean;
  error?: string;
} {
  if (!phone || phone.trim() === '') {
    return { isValid: false, error: 'Phone number is required' };
  }

  const cleaned = phone.replace(/\D/g, '');

  if (cleaned.length < 10) {
    return { isValid: false, error: 'Phone number is too short' };
  }

  if (cleaned.length > 15) {
    return { isValid: false, error: 'Phone number is too long' };
  }

  return { isValid: true };
}
