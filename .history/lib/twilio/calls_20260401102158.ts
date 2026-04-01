import type { TwilioCall } from '@/types/dashboard';

export interface FetchCallsOptions {
  startDate?: string | null;
  endDate?: string | null;
  limit?: number;
  direction?: 'inbound' | 'outbound';
  voipNumbers?: string[];
}

export async function fetchCallsFromTwilio(
  options: FetchCallsOptions = {}
): Promise<TwilioCall[]> {
  const { getTwilioClient } = await import('./client');
  const client = getTwilioClient();

  const { startDate, endDate, limit = 1000, direction, voipNumbers } = options;

  // Build filter parameters
  const params: Record<string, any> = {
    limit,
  };

  if (startDate) {
    params.startTimeAfter = new Date(startDate);
  }

  if (endDate) {
    params.startTimeBefore = new Date(endDate);
  }

  if (direction) {
    params.direction = direction;
  }

  if (voipNumbers && voipNumbers.length > 0) {
    params.to = voipNumbers.join(',');
  }

  // Fetch calls from Twilio
  const calls = await client.calls.list(params);

  // Transform to our TwilioCall type
  return calls.map((call) => ({
    sid: call.sid,
    parentCallSid: call.parentCallSid || undefined,
    from: call.from,
    to: call.to,
    direction: call.direction as TwilioCall['direction'],
    status: call.status as TwilioCall['status'],
    startTime: call.startTime?.toISOString() || '',
    endTime: call.endTime?.toISOString(),
    duration: call.duration ? Number(call.duration) : undefined,
    price: call.price,
    priceUnit: call.priceUnit,
    counterparty: call.direction === 'inbound' ? call.from : call.to,
  }));
}
