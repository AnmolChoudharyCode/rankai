import RecommendationItem from './RecommendationItem';

interface Recommendation {
  title: string;
  description: string;
}

interface PrioritySectionProps {
  priority: 'high' | 'medium' | 'low';
  count: number;
  recommendations: Recommendation[];
}

export default function PrioritySection({ priority, count, recommendations }: PrioritySectionProps) {
  const config = {
    high: {
      label: 'High Priority Issues',
      badgeBg: 'bg-red-600',
      badgeIcon: (
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
    },
    medium: {
      label: 'Medium Priority Issues',
      badgeBg: 'bg-yellow-600',
      badgeIcon: (
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
    },
    low: {
      label: 'Low Priority Suggestions',
      badgeBg: 'bg-blue-600',
      badgeIcon: (
        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      ),
    },
  };

  const { label, badgeBg, badgeIcon } = config[priority];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-semibold text-gray-900">{label}</h2>
        <div className={`${badgeBg} rounded-full p-1.5 flex items-center gap-1.5`}>
          {badgeIcon}
          <span className="text-white text-sm font-medium">{count}</span>
        </div>
      </div>
      <div className="space-y-3">
        {recommendations.map((rec, index) => (
          <RecommendationItem
            key={index}
            priority={priority}
            title={rec.title}
            description={rec.description}
          />
        ))}
      </div>
    </div>
  );
}

