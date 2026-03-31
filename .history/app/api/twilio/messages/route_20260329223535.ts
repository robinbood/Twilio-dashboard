import { NextRequest, NextResponse } from 'next/server';
import { fetchMessagesFromTwilio } from '@/lib/twilio/messages';
import { handleTwilioError } from '@/lib/twilio/error-handler';
import { isValidDate, isValidLimit } from '@/lib/utils/validation';
import type { FetchMessagesResponse } from '@/types/api';

export async function GET(request: NextRequest) {
  try {
    // Parse query parameters
    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const limit = parseInt(searchParams.get('limit') || '1000', 10);

    // Validate parameters
    if (startDate && !isValidDate(startDate)) {
      return NextResponse.json<FetchMessagesResponse>(
        { success: false, error: 'Invalid startDate format. Use YYYY-MM-DD' },
        { status: 400 }
      );
    }

    if (endDate && !isValidDate(endDate)) {
      return NextResponse.json<FetchMessagesResponse>(
        { success: false, error: 'Invalid endDate format. Use YYYY-MM-DD' },
        { status: 400 }
      );
    }

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      return NextResponse.json<FetchMessagesResponse>(
        { success: false, error: 'startDate cannot be after endDate' },
        { status: 400 }
      );
    }

    if (!isValidLimit(limit)) {
      return NextResponse.json<FetchMessagesResponse>(
        { success: false, error: 'limit must be between 1 and 10000' },
        { status: 400 }
      );
    }

    // Fetch messages from Twilio
    const messages = await fetchMessagesFromTwilio({
      startDate,
      endDate,
      limit,
    });

    return NextResponse.json<FetchMessagesResponse>({
      success: true,
      data: messages,
      meta: {
        total: messages.length,
        filtered: messages.length,
        dateRange: {
          from: startDate || 'all',
          to: endDate || 'all',
        },
      },
    });
  } catch (error) {
    console.error('[API Error] /api/twilio/messages:', error);

    const twilioError = handleTwilioError(error);

    return NextResponse.json<FetchMessagesResponse>(
      {
        success: false,
        error: twilioError.message,
        details: {
          code: twilioError.code,
          timestamp: new Date().toISOString(),
          path: request.nextUrl.pathname,
        },
      },
      { status: twilioError.statusCode }
    );
  }
}
