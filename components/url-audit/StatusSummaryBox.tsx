interface StatusSummaryBoxProps {
  type: 'passed' | 'warnings' | 'failed';
  count: number;
}

export default function StatusSummaryBox({ type, count }: StatusSummaryBoxProps) {
  const config = {
    passed: {
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      textColor: 'text-green-700',
      label: 'Passed',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
    },
    warnings: {
      bgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-600',
      textColor: 'text-yellow-700',
      label: 'Warnings',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      ),
    },
    failed: {
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
      textColor: 'text-red-700',
      label: 'Failed',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      ),
    },
  };

  const { bgColor, iconColor, textColor, label, icon } = config[type];

  return (
    <div className={`${bgColor} rounded-lg p-4 flex items-center gap-3`}>
      <div className={iconColor}>{icon}</div>
      <div>
        <span className={`font-medium ${textColor}`}>{label}</span>
        <span className={`ml-2 font-bold ${textColor}`}>{count}</span>
      </div>
    </div>
  );
}

