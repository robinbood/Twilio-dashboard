/**
 * Format a phone number to a readable format
 */
export function formatPhoneNumber(phone: string): string {
  const startTime = performance.now();
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');

  // Format based on length
  let result;
  if (cleaned.length === 10) {
    result = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
    result = `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  } else if (cleaned.length === 12 && cleaned.startsWith('1')) {
    result = `+${cleaned.slice(0, 1)} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  } else {
    // Return original if can't format
    result = phone;
  }
  const endTime = performance.now();
  console.log(`[formatPhoneNumber] Formatted in ${(endTime - startTime).toFixed(4)}ms`);
  return result;
}

/**
 * Sanitize a phone number for display
 */
export function sanitizePhoneNumber(phone: string): string {
  // Remove any HTML tags
  return phone.replace(/<[^>]*>/g, '');
}

/**
 * Check if a phone number is valid
 */
export function isValidPhoneNumber(phone: string): boolean {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');

  // Check if it's a valid length (10-15 digits)
  return cleaned.length >= 10 && cleaned.length <= 15;
}
