import { getTwilioClient } from './client';
import { handleTwilioError } from './error-handler';

export async function fetchTwilioNumbers(): Promise<string[]> {
  try {
    const client = getTwilioClient();

    // Fetch all incoming phone numbers from Twilio
    const phoneNumbers = await client.incomingPhoneNumbers.list();

    // Extract phone numbers in E.164 format
    const numbers = phoneNumbers.map((phoneNumber) => phoneNumber.phoneNumber);

    return numbers;
  } catch (error) {
    console.error('[Twilio Error] Failed to fetch phone numbers:', error);
    throw handleTwilioError(error);
  }
}
