'use client';

export function DashboardHeader() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Twilio Dashboard
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Call and SMS logs grouped by phone number
        </p>
      </div>
    </header>
  );
}
