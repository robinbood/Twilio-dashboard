'use client';

import { DateRangeFilterProps } from '@/types/components';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export function DateRangeFilter({
  value,
  onChange,
}: Omit<DateRangeFilterProps, 'onApply' | 'loading'>) {
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...value,
      from: e.target.value || null,
    });
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...value,
      to: e.target.value || null,
    });
  };

  const handleClear = () => {
    onChange({ from: null, to: null });
  };

  const hasFilters = value.from || value.to;

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4 items-end">
        <div className="flex-1">
          <Input
            type="date"
            label="Start Date"
            value={value.from || ''}
            onChange={handleStartDateChange}
            helperText="Filter logs from this date"
          />
        </div>

        <div className="flex-1">
          <Input
            type="date"
            label="End Date"
            value={value.to || ''}
            onChange={handleEndDateChange}
            helperText="Filter logs until this date"
          />
        </div>

        <div className="flex gap-2">
          {hasFilters && (
            <Button variant="secondary" onClick={handleClear}>
              Clear
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
