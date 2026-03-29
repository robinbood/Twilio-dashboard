'use client';

import { ErrorStateProps } from '@/types/components';
import { Button } from '../ui/Button';

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <svg
        className="w-16 h-16 text-red-500 dark:text-red-400 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <p className="text-gray-900 dark:text-gray-100 text-lg font-medium mb-2">
        Error loading logs
      </p>
      <p className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-6">
        {error}
      </p>
      {onRetry && <Button onClick={onRetry}>Retry</Button>}
    </div>
  );
}
