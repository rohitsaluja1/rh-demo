import React from 'react';

interface StatusPillProps {
  status: 'Matched' | 'Unmatched' | 'Partial';
  className?: string;
}

export const StatusPill: React.FC<StatusPillProps> = ({ status, className = '' }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'Matched':
        return {
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          borderColor: 'border-green-200',
          dotColor: 'bg-green-500'
        };
      case 'Unmatched':
        return {
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-800',
          borderColor: 'border-yellow-200',
          dotColor: 'bg-yellow-500'
        };
      case 'Partial':
        return {
          bgColor: 'bg-orange-100',
          textColor: 'text-orange-800',
          borderColor: 'border-orange-200',
          dotColor: 'bg-orange-500'
        };
      default:
        return {
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          borderColor: 'border-gray-200',
          dotColor: 'bg-gray-500'
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config.bgColor} ${config.textColor} ${config.borderColor} ${className}`}>
      <div className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`}></div>
      {status}
    </div>
  );
};