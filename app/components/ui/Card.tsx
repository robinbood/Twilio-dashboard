import type { CardProps } from '@/types/components';

export function Card({
  children,
  className = '',
  padding = 'md',
}: CardProps) {
  const baseStyles =
    'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm';

  const paddingStyles = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  const combinedClassName = `${baseStyles} ${paddingStyles[padding]} ${className}`;

  return <div className={combinedClassName}>{children}</div>;
}
