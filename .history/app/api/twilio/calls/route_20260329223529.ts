import { NextRequest, NextResponse } from 'next/server';
import { fetchCallsFromTwilio } from '@/lib/twilio/calls';
import { handleTwilioError } from '@/lib/twilio/error-handler';
import { isValidDate, isValidLimit } from '@/lib/utils/validation';
import type { FetchCallsResponse } from '@/types/api';

export async function GET(request: NextRequest) {
  try {
    // Parse query parameters
    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const limit = parseInt(searchParams.get('limit') || '1000', 10);

    // Validate parameters
    if (startDate && !isValidDate(startDate)) {
      return NextResponse.json<FetchCallsResponse>(
        { success: false, error: 'Invalid startDate format. Use YYYY-MM-DD' },
        { status: 400 }
      );
    }

    if (endDate && !isValidDate(endDate)) {
      return NextResponse.json<FetchCallsResponse>(
        { success: false, error: 'Invalid endDate format. Use YYYY-MM-DD' },
        { status: 400 }
      );
    }

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      return NextResponse.json<FetchCallsResponse>(
        { success: false, error: 'startDate cannot be after endDate' },
        { status: 400 }
      );
    }

    if (!isValidLimit(limit)) {
      return NextResponse.json<FetchCallsResponse>(
        { success: false, error: 'limit must be between 1 and 10000' },
        { status: 400 }
      );
    }

    // Fetch calls from Twilio
    const calls = await fetchCallsFromTwilio({
      startDate,
      endDate,
      limit,
    });

    return NextResponse.json<FetchCallsResponse>({
      success: true,
      data: calls,
      meta: {
        total: calls.length,
        filtered: calls.length,
        dateRange: {
          from: startDate || 'all',
          to: endDate || 'all',
        },
      },
    });
  } catch (error) {
    console.error('[API Error] /api/twilio/calls:', error);

    const twilioError = handleTwilioError(error);

    return NextResponse.json<FetchCallsResponse>(
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
