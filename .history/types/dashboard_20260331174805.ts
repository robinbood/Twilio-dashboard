/**
 * Represents a Twilio call log entry
 */
export interface TwilioCall {
  sid: string;
  parentCallSid?: string;
  from: string;
  to: string;
  direction: 'inbound' | 'outbound' | 'outbound-dial' | 'outbound-api';
  status:
    | 'queued'
    | 'ringing'
    | 'in-progress'
    | 'completed'
    | 'failed'
    | 'busy'
    | 'no-answer'
    | 'canceled';
  startTime: string;
  endTime?: string;
  duration?: number;
  price?: string;
  priceUnit?: string;
  counterparty: string;
}

/**
 * Represents a Twilio SMS message log entry
 */
export interface TwilioMessage {
  sid: string;
  from: string;
  to: string;
  direction: 'inbound' | 'outbound' | 'outbound-reply' | 'outbound-api';
  status:
    | 'queued'
    | 'sent'
    | 'sending'
    | 'received'
    | 'delivered'
    | 'undelivered'
    | 'failed';
  dateSent: string;
  dateCreated: string;
  dateUpdated?: string;
  body: string;
  numSegments?: number;
  price?: string;
  priceUnit?: string;
  counterparty: string;
}

/**
 * Represents logs grouped by Twilio phone number (the 'to' field for inbound communications)
 */
export interface GroupedLogEntry {
  phoneNumber: string;
  totalCalls: number;
  totalMessages: number;
  calls: TwilioCall[];
  messages: TwilioMessage[];
}

/**
 * Date range filter state
 */
export interface DateRange {
  from: string | null;
  to: string | null;
}

/**
 * Dashboard loading state
 */
export interface DashboardLoadingState {
  calls: boolean;
  messages: boolean;
}

/**
 * Dashboard state
 */
export interface DashboardState {
  dateRange: DateRange;
  logs: {
    calls: TwilioCall[];
    messages: TwilioMessage[];
  };
  groupedLogs: GroupedLogEntry[];
  loading: DashboardLoadingState;
  error: string | null;
  expandedRows: Set<string>;
}
