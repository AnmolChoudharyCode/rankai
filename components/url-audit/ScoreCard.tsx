interface ScoreCardProps {
  score: number;
  label: string;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

export default function ScoreCard({ score, label, color }: ScoreCardProps) {
  const colorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
    orange: 'text-orange-600',
  };

  const strokeColors = {
    blue: 'stroke-blue-600',
    green: 'stroke-green-600',
    purple: 'stroke-purple-600',
    orange: 'stroke-orange-600',
  };

  const circumference = 2 * Math.PI * 45; // radius = 45
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg border border-gray-200">
      <div className="relative w-24 h-24 mb-3">
        <svg className="transform -rotate-90 w-24 h-24">
          <circle
            cx="48"
            cy="48"
            r="45"
            stroke="currentColor"
            strokeWidth="6"
            fill="none"
            className="text-gray-200"
          />
          <circle
            cx="48"
            cy="48"
            r="45"
            stroke="currentColor"
            strokeWidth="6"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className={`${strokeColors[color]} transition-all duration-500`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-2xl font-bold ${colorClasses[color]}`}>{score}</span>
        </div>
      </div>
      <p className="text-sm text-gray-600 text-center">{label}</p>
    </div>
  );
}

