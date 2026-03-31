'use client';

import React from 'react';
import { LogsTableProps } from '@/types/components';
import { LogRow } from './LogRow';
import { LogDetails } from './LogDetails';

export const LogsTable = React.memo(({ data, expandedRows, onToggleRow }: LogsTableProps) => {
  console.log('[LogsTable] Render called, data length:', data.length, 'expandedRows size:', expandedRows.size);
  const startTime = performance.now();

  if (data.length === 0) {
    return (
      <div className="text-center py-12">
        <svg
          className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          No logs found
        </p>
        <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
          Try adjusting your date range filters
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="px-6 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Phone Number
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Calls
            </p>
          </div>
        </div>
      </div>

      <div>
        {data.map((entry) => (
          <div key={entry.phoneNumber}>
            <LogRow
              entry={entry}
              isExpanded={expandedRows.has(entry.phoneNumber)}
              onToggle={onToggleRow}
            />
            {expandedRows.has(entry.phoneNumber) && (
              <LogDetails calls={entry.calls} messages={entry.messages} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
  const endTime = performance.now();
  console.log(`[LogsTable] Render completed in ${(endTime - startTime).toFixed(2)}ms`);
}, (prevProps, nextProps) => {
  // Custom comparison function to prevent unnecessary re-renders
  // Only re-render if data, expandedRows content, or onToggleRow changes
  if (prevProps.data !== nextProps.data) {
    console.log('[LogsTable] Re-rendering: data changed');
    return false;
  }

  if (prevProps.onToggleRow !== nextProps.onToggleRow) {
    console.log('[LogsTable] Re-rendering: onToggleRow changed');
    return false;
  }

  // Compare expandedRows by content, not by reference
  if (prevProps.expandedRows.size !== nextProps.expandedRows.size) {
    console.log('[LogsTable] Re-rendering: expandedRows size changed');
    return false;
  }

  // Check if the content of expandedRows is the same
  for (const phone of prevProps.expandedRows) {
    if (!nextProps.expandedRows.has(phone)) {
      console.log('[LogsTable] Re-rendering: expandedRows content changed');
      return false;
    }
  }

  console.log('[LogsTable] Skipping re-render: props are the same');
  return true;
});

