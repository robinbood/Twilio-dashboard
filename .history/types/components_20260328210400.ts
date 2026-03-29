import type { GroupedLogEntry, TwilioCall, TwilioMessage } from './dashboard';

/**
 * Props for DashboardHeader component
 */
export interface DashboardHeaderProps {
  onThemeToggle: () => void;
  currentTheme: 'light' | 'dark';
}

/**
 * Props for DateRangeFilter component
 */
export interface DateRangeFilterProps {
  value: {
    from: string | null;
    to: string | null;
  };
  onChange: (range: { from: string | null; to: string | null }) => void;
  onApply: () => void;
  loading?: boolean;
}

/**
 * Props for LogsTable component
 */
export interface LogsTableProps {
  data: GroupedLogEntry[];
  expandedRows: Set<string>;
  onToggleRow: (phoneNumber: string) => void;
}

/**
 * Props for LogRow component
 */
export interface LogRowProps {
  entry: GroupedLogEntry;
  isExpanded: boolean;
  onToggle: () => void;
}

/**
 * Props for LogDetails component
 */
export interface LogDetailsProps {
  calls: TwilioCall[];
  messages: TwilioMessage[];
}

/**
 * Props for EmptyState component
 */
export interface EmptyStateProps {
  message?: string;
  onClearFilters?: () => void;
}

/**
 * Props for ErrorState component
 */
export interface ErrorStateProps {
  error: string;
  onRetry?: () => void;
}

/**
 * Props for Button component
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

/**
 * Props for Card component
 */
export interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

/**
 * Props for Badge component
 */
export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
}

/**
 * Props for Input component
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

/**
 * Props for Spinner component
 */
export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}
