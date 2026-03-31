import type { TwilioCall, TwilioMessage } from './dashboard';

/**
 * Request parameters for fetching call logs
 */
export interface FetchCallsRequest {
  startDate?: string;
  endDate?: string;
  limit?: number;
}

/**
 * Request parameters for fetching message logs
 */
export interface FetchMessagesRequest {
  startDate?: string;
  endDate?: string;
  limit?: number;
}

/**
 * Success response for fetching call logs
 */
export interface FetchCallsSuccessResponse {
  success: true;
  data: TwilioCall[];
  meta: {
    total: number;
    filtered: number;
    dateRange: {
      from: string;
      to: string;
    };
  };
}

/**
 * Error response for API calls
 */
export interface FetchErrorResponse {
  success: false;
  error: string;
  details?: {
    code?: string;
    timestamp: string;
    path: string;
  };
}

/**
 * Combined response type for fetching calls
 */
export type FetchCallsResponse = FetchCallsSuccessResponse | FetchErrorResponse;

/**
 * Success response for fetching message logs
 */
export interface FetchMessagesSuccessResponse {
  success: true;
  data: TwilioMessage[];
  meta: {
    total: number;
    filtered: number;
    dateRange: {
      from: string;
      to: string;
    };
  };
}

/**
 * Combined response type for fetching messages
 */
export type FetchMessagesResponse = FetchMessagesSuccessResponse | FetchErrorResponse;

/**
 * Success response for fetching Twilio numbers
 */
export interface FetchNumbersSuccessResponse {
  success: true;
  data: string[];
  meta: {
    total: number;
  };
}

/**
 * Combined response type for fetching Twilio numbers
 */
export type FetchNumbersResponse = FetchNumbersSuccessResponse | FetchErrorResponse;

// Re-export dashboard types for convenience
export type { TwilioCall, TwilioMessage, GroupedLogEntry } from './dashboard';
