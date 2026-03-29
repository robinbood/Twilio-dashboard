import { Twilio } from 'twilio';

let twilioClient: Twilio | null = null;

export function getTwilioClient(): Twilio {
  if (!twilioClient) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const apiKeySid = process.env.TWILIO_API_KEY_SID;
    const apiKeySecret = process.env.TWILIO_API_KEY_SECRET;

    if (!accountSid || !apiKeySid || !apiKeySecret) {
      throw new Error('Missing Twilio credentials in environment variables');
    }

    // Validate Account SID format (should start with 'AC')
    if (!accountSid.startsWith('AC')) {
      throw new Error('Invalid TWILIO_ACCOUNT_SID format: must start with "AC"');
    }

    // Validate API Key SID format (should start with 'SK')
    if (!apiKeySid.startsWith('SK')) {
      throw new Error('Invalid TWILIO_API_KEY_SID format: must start with "SK"');
    }

    // Validate API Key Secret is not empty
    if (apiKeySecret.trim().length === 0) {
      throw new Error('Invalid TWILIO_API_KEY_SECRET: cannot be empty');
    }

    twilioClient = new Twilio(apiKeySid, apiKeySecret, { accountSid });
  }

  return twilioClient;
}
