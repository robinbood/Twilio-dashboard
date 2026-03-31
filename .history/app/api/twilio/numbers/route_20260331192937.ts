import { NextResponse } from 'next/server';
import { fetchTwilioNumbers } from '@/lib/twilio/numbers';
import { handleTwilioError } from '@/lib/twilio/error-handler';
import type { FetchNumbersResponse } from '@/types/api';

export async function GET() {
  try {
    // Fetch all Twilio phone numbers
    const numbers = await fetchTwilioNumbers();

    return NextResponse.json<FetchNumbersResponse>({
      success: true,
      data: numbers,
      meta: {
        total: numbers.length,
      },
    });
  } catch (error) {
    console.error('[API Error] /api/twilio/numbers:', error);

    const twilioError = handleTwilioError(error);

    return NextResponse.json<FetchNumbersResponse>(
      {
        success: false,
        error: twilioError.message,
        details: {
          code: twilioError.code,
          timestamp: new Date().toISOString(),
          path: '/api/twilio/numbers',
        },
      },
      { status: twilioError.statusCode }
    );
  }
}
