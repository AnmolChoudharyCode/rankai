'use client';

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: 'blue' | 'purple' | 'green';
  onClick?: () => void;
}

export default function QuickActionCard({
  title,
  description,
  icon,
  color,
  onClick,
}: QuickActionCardProps) {
  const colorClasses = {
    blue: 'bg-white border-[#272b8b] hover:bg-[#272b8b]/10',
    purple: 'bg-white border-[#272b8b] hover:bg-[#272b8b]/10',
    green: 'bg-white border-[#272b8b] hover:bg-[#272b8b]/10',
  };

  const buttonClasses = {
    blue: 'bg-[#272b8b] hover:opacity-90 text-white',
    purple: 'bg-[#272b8b] hover:opacity-90 text-white',
    green: 'bg-[#272b8b] hover:opacity-90 text-white',
  };

  return (
    <div
      className={`p-4 sm:p-6 rounded-lg border-2 ${colorClasses[color]} transition-colors cursor-pointer`}
      onClick={onClick}
    >
      <div className="mb-3 sm:mb-4">{icon}</div>
      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">{description}</p>
      <button
        className={`flex items-center gap-1 px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer w-full sm:w-auto justify-center ${buttonClasses[color]}`}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.();
        }}
      >
       {title==='Analyze URL' ? 'Get Started':'Coming soon'} 
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

