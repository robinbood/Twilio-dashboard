'use client';

import React from 'react';
import { LogRowProps } from '@/types/components';
import { Badge } from '../ui/Badge';
import { formatPhoneNumber } from '@/lib/utils/phone';

export const LogRow = React.memo(({ entry, isExpanded, onToggle }: LogRowProps) => {
  console.log('[LogRow] Render called for:', entry.phoneNumber, 'isExpanded:', isExpanded);
  const startTime = performance.now();

  const totalActivity = entry.totalCalls + entry.totalMessages;

  return (
    <div
      className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors cursor-pointer"
      onClick={onToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle();
        }
      }}
    >
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="flex-1">
            <p className="font-medium text-gray-900 dark:text-gray-100">
              {formatPhoneNumber(entry.phoneNumber)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {totalActivity} {totalActivity === 1 ? 'interaction' : 'interactions'}
            </p>
          </div>

          <div className="flex gap-3">
            <Badge variant="info" size="md">
              <span className="flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                {entry.totalCalls} {entry.totalCalls === 1 ? 'Call' : 'Calls'}
              </span>
            </Badge>

            <Badge variant="success" size="md">
              <span className="flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                {entry.totalMessages} {entry.totalMessages === 1 ? 'Message' : 'Messages'}
              </span>
            </Badge>
          </div>
        </div>

        <div className="ml-4">
          <svg
            className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform ${
              isExpanded ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
});
