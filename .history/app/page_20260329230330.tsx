'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { DashboardHeader } from './components/dashboard/DashboardHeader';
import { DateRangeFilter } from './components/dashboard/DateRangeFilter';
import { LogsTable } from './components/dashboard/LogsTable';
import { LoadingState } from './components/dashboard/LoadingState';
import { EmptyState } from './components/dashboard/EmptyState';
import { ErrorState } from './components/dashboard/ErrorState';
import { useTheme } from './components/providers/ThemeProvider';
import type { TwilioCall, TwilioMessage, GroupedLogEntry } from '@/types/dashboard';
import type { FetchCallsResponse, FetchMessagesResponse } from '@/types/api';

export default function Dashboard() {
  const { theme, toggleTheme } = useTheme();

  // Diagnostic logging
  console.log('[Dashboard] Component render');

  // Date range filter state
  const [dateRange, setDateRange] = useState<{
    from: string | null;
    to: string | null;
  }>({ from: null, to: null });

  // Track if this is the initial mount
  const isInitialMount = useRef(true);

  // Use ref to track current dateRange for fetchLogs
  const dateRangeRef = useRef(dateRange);
  dateRangeRef.current = dateRange;

  // Track dateRange changes
  useEffect(() => {
    console.log('[Dashboard] dateRange changed:', dateRange);
  }, [dateRange]);

  // Logs state
  const [logs, setLogs] = useState<{
    calls: TwilioCall[];
    messages: TwilioMessage[];
  }>({ calls: [], messages: [] });

  // Loading state
  const [loading, setLoading] = useState({
    calls: false,
    messages: false,
  });

  // Error state
  const [error, setError] = useState<string | null>(null);

  // Expanded rows state
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  // Group logs by counterparty phone number
  const groupedLogs = useMemo(() => {
    const grouped = new Map<string, GroupedLogEntry>();

    // Process calls
    logs.calls.forEach((call) => {
      const phone = call.counterparty;
      if (!grouped.has(phone)) {
        grouped.set(phone, {
          phoneNumber: phone,
          totalCalls: 0,
          totalMessages: 0,
          calls: [],
          messages: [],
        });
      }
      const entry = grouped.get(phone)!;
      entry.totalCalls++;
      entry.calls.push(call);
    });

    // Process messages
    logs.messages.forEach((message) => {
      const phone = message.counterparty;
      if (!grouped.has(phone)) {
        grouped.set(phone, {
          phoneNumber: phone,
          totalCalls: 0,
          totalMessages: 0,
          calls: [],
          messages: [],
        });
      }
      const entry = grouped.get(phone)!;
      entry.totalMessages++;
      entry.messages.push(message);
    });

    // Convert to array and sort by total activity (descending)
    return Array.from(grouped.values()).sort(
      (a, b) =>
        b.totalCalls + b.totalMessages - (a.totalCalls + a.totalMessages)
    );
  }, [logs]);

  // Fetch logs from API
  const fetchLogs = useCallback(async () => {
    const currentDateRange = dateRangeRef.current;
    console.log('[Dashboard] fetchLogs called, dateRange:', currentDateRange);
    setLoading({ calls: true, messages: true });
    setError(null);

    try {
      // Build query parameters
      const params = new URLSearchParams();
      if (currentDateRange.from) params.append('startDate', currentDateRange.from);
      if (currentDateRange.to) params.append('endDate', currentDateRange.to);

      // Fetch calls and messages in parallel
      const [callsRes, messagesRes] = await Promise.all([
        fetch(`/api/twilio/calls?${params.toString()}`),
        fetch(`/api/twilio/messages?${params.toString()}`),
      ]);

      // Check HTTP status before parsing JSON
      if (!callsRes.ok) {
        throw new Error(`Failed to fetch calls: ${callsRes.status} ${callsRes.statusText}`);
      }
      if (!messagesRes.ok) {
        throw new Error(`Failed to fetch messages: ${messagesRes.status} ${messagesRes.statusText}`);
      }

      const callsData = (await callsRes.json()) as FetchCallsResponse;
      const messagesData = (await messagesRes.json()) as FetchMessagesResponse;

      if (!callsData.success) {
        throw new Error(callsData.error);
      }

      if (!messagesData.success) {
        throw new Error(messagesData.error);
      }

      setLogs({
        calls: callsData.data,
        messages: messagesData.data,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch logs');
    } finally {
      setLoading({ calls: false, messages: false });
    }
  }, []); // Empty dependency array - fetchLogs is now stable

  // Toggle row expansion
  const toggleRow = useCallback((phoneNumber: string) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(phoneNumber)) {
        next.delete(phoneNumber);
      } else {
        next.add(phoneNumber);
      }
      return next;
    });
  }, []);

  // Clear filters
  const clearFilters = useCallback(() => {
    setDateRange({ from: null, to: null });
  }, []);

  // Fetch logs on mount and when date range changes
  useEffect(() => {
    console.log('[Dashboard] useEffect triggered, isInitialMount:', isInitialMount.current, 'dateRange:', dateRange);

    // Only fetch on initial mount or when dateRange changes
    if (isInitialMount.current) {
      console.log('[Dashboard] Initial mount, fetching logs');
      isInitialMount.current = false;
      fetchLogs();
    } else {
      console.log('[Dashboard] Date range changed, fetching logs');
      fetchLogs();
    }
  }, [dateRange, fetchLogs]); // Include fetchLogs in dependencies - now safe since fetchLogs is stable

  // Check if loading
  const isLoading = loading.calls || loading.messages;

  // Check if there are logs
  const hasLogs = logs.calls.length > 0 || logs.messages.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DateRangeFilter
          value={dateRange}
          onChange={setDateRange}
        />

        {isLoading && <LoadingState />}

        {!isLoading && error && (
          <ErrorState error={error} onRetry={fetchLogs} />
        )}

        {!isLoading && !error && !hasLogs && (
          <EmptyState
            message="No logs found for the selected date range"
            onClearFilters={clearFilters}
          />
        )}

        {!isLoading && !error && hasLogs && (
          <LogsTable
            data={groupedLogs}
            expandedRows={expandedRows}
            onToggleRow={toggleRow}
          />
        )}
      </main>
    </div>
  );
}
