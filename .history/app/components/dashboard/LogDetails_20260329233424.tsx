'use client';

import React from 'react';
import { LogDetailsProps } from '@/types/components';
import { formatDateTime } from '@/lib/utils/date';
import { Badge } from '../ui/Badge';

export const LogDetails = React.memo(({ calls, messages }: LogDetailsProps) => {
  console.log('[LogDetails] Render called, calls:', calls.length, 'messages:', messages.length);
  const startTime = performance.now();

  return (
    <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="space-y-6">
        {/* Calls Section */}
        {calls.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Call Logs ({calls.length})
            </h3>
            <div className="space-y-2">
              {calls.map((call) => (
                <div
                  key={call.sid}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge
                          variant={
                            call.status === 'completed' ? 'success' : 'warning'
                          }
                          size="sm"
                        >
                          {call.status}
                        </Badge>
                        <Badge variant="default" size="sm">
                          {call.direction}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {formatDateTime(call.startTime)}
                      </p>
                    </div>
                    {call.duration !== undefined && (
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {Math.floor(call.duration / 60)}m {call.duration % 60}s
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>From: {call.from}</span>
                    <span>→</span>
                    <span>To: {call.to}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Messages Section */}
        {messages.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Message Logs ({messages.length})
            </h3>
            <div className="space-y-2">
              {messages.map((message) => (
                <div
                  key={message.sid}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge
                          variant={
                            message.status === 'delivered' ||
                            message.status === 'received'
                              ? 'success'
                              : 'warning'
                          }
                          size="sm"
                        >
                          {message.status}
                        </Badge>
                        <Badge variant="default" size="sm">
                          {message.direction}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {formatDateTime(message.dateSent)}
                      </p>
                    </div>
                  </div>
                  <div className="mb-2">
                    <p className="text-gray-900 dark:text-gray-100 break-words">
                      {message.body}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>From: {message.from}</span>
                    <span>→</span>
                    <span>To: {message.to}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {calls.length === 0 && messages.length === 0 && (
          <p className="text-center text-gray-600 dark:text-gray-400 py-4">
            No logs available for this phone number
          </p>
        )}
      </div>
    </div>
  );
  const endTime = performance.now();
  console.log(`[LogDetails] Render completed in ${(endTime - startTime).toFixed(2)}ms`);
});
