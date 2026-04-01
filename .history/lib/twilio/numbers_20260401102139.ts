import { getTwilioClient } from './client';
import { handleTwilioError } from './error-handler';

export async function fetchTwilioNumbers(): Promise<string[]> {
  try {
    const client = getTwilioClient();

    // Fetch all incoming phone numbers from Twilio
    const phoneNumbers = await client.incomingPhoneNumbers.list();

    // Filter to only include numbers with voice capability (VoIP numbers)
    return phoneNumbers
      .filter((phoneNumber) => phoneNumber.capabilities.voice === true)
      .map((phoneNumber) => phoneNumber.phoneNumber);
  } catch (error) {
    console.error('[Twilio Error] Failed to fetch phone numbers:', error);
    throw handleTwilioError(error);
  }
}
