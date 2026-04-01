import type { TwilioMessage } from '@/types/dashboard';

export interface FetchMessagesOptions {
  startDate?: string | null;
  endDate?: string | null;
  limit?: number;
  direction?: 'inbound' | 'outbound';
}

export async function fetchMessagesFromTwilio(
  options: FetchMessagesOptions = {}
): Promise<TwilioMessage[]> {
  const { getTwilioClient } = await import('./client');
  const client = getTwilioClient();

  const { startDate, endDate, limit = 1000, direction } = options;

  // Build filter parameters
  const params: Record<string, any> = {
    limit,
  };

  if (startDate) {
    params.dateSentAfter = new Date(startDate);
  }

  if (endDate) {
    params.dateSentBefore = new Date(endDate);
  }

  if (direction) {
    params.direction = direction;
  }

  console.log('[Twilio Messages] Fetching with params:', JSON.stringify(params, null, 2));

  // Fetch messages from Twilio
  const messages = await client.messages.list(params);

  console.log('[Twilio Messages] Fetched', messages.length, 'messages');
  if (messages.length > 0) {
    console.log('[Twilio Messages] First message dateSent:', messages[0].dateSent?.toISOString());
    console.log('[Twilio Messages] Last message dateSent:', messages[messages.length - 1].dateSent?.toISOString());
  }

  // Transform to our TwilioMessage type
  return messages.map((message) => ({
    sid: message.sid,
    from: message.from,
    to: message.to,
    direction: message.direction as TwilioMessage['direction'],
    status: message.status as TwilioMessage['status'],
    dateSent: message.dateSent?.toISOString() || '',
    dateCreated: message.dateCreated?.toISOString() || '',
    dateUpdated: message.dateUpdated?.toISOString(),
    body: message.body,
    numSegments: message.numSegments ? Number(message.numSegments) : undefined,
    price: message.price,
    priceUnit: message.priceUnit,
    counterparty: message.direction === 'inbound' ? message.from : message.to,
  }));
}
