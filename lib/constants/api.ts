/**
 * API endpoint constants
 */
export const API_ENDPOINTS = {
  TWILIO_CALLS: '/api/twilio/calls',
  TWILIO_MESSAGES: '/api/twilio/messages',
} as const;

/**
 * Default limit for API requests
 */
export const DEFAULT_LIMIT = 1000;

/**
 * Maximum limit for API requests
 */
export const MAX_LIMIT = 10000;
