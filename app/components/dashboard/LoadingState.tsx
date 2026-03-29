'use client';

import { Spinner } from '../ui/Spinner';

export function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Spinner size="lg" />
      <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg">
        Loading logs...
      </p>
    </div>
  );
}
