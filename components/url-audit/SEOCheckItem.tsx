interface SEOCheckItemProps {
  status: 'passed' | 'failed';
  title: string;
  description: string;
  severity?: 'HIGH' | 'Medium' | 'Low';
}

export default function SEOCheckItem({ status, title, description, severity }: SEOCheckItemProps) {
  const config = {
    passed: {
      iconColor: 'text-green-600',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
    },
    warning: {
      iconColor: 'text-yellow-600',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      ),
    },
    failed: {
      iconColor: 'text-red-600',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      ),
    },
  };

  const { iconColor, icon } = config[status];

  // Severity pill configuration (only show for failed items)
  const severityConfigMap: Record<string, { bgColor: string; textColor: string; label: string }> = {
    HIGH: {
      bgColor: 'bg-red-100',
      textColor: 'text-red-700',
      label: 'HIGH',
    },
    Medium: {
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-700',
      label: 'Medium',
    },
    Low: {
      bgColor: 'bg-green-100',
      textColor: 'text-green-700',
      label: 'Low',
    },
  };

  // Show severity pill for all failed items
  const getSeverityConfig = () => {
    if (status !== 'failed') return null;
    if (!severity || severity.trim() === '') return null;
    
    // Normalize severity value (handle case variations and type)
    const severityStr = String(severity).trim();
    // Try exact match first
    if (severityConfigMap[severityStr]) {
      return severityConfigMap[severityStr];
    }
    // Try case-insensitive match
    const upperSeverity = severityStr.toUpperCase();
    if (upperSeverity === 'HIGH') {
      return severityConfigMap['HIGH'];
    }
    if (upperSeverity === 'MEDIUM' || upperSeverity === 'MED') {
      return severityConfigMap['Medium'];
    }
    if (upperSeverity === 'LOW') {
      return severityConfigMap['Low'];
    }
    return null;
  };

  const severityConfig = getSeverityConfig();

  return (
    <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
      <div className={`mt-0.5 ${iconColor}`}>{icon}</div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          {severityConfig && (
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${severityConfig.bgColor} ${severityConfig.textColor}`}>
              {severityConfig.label}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}

