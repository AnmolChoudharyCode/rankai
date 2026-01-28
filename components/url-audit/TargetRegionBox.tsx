interface TargetRegionBoxProps {
  region: string;
}

export default function TargetRegionBox({ region }: TargetRegionBoxProps) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
      <div className="flex items-start gap-4">
        <div className="mt-1">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div>
          <h3 className="font-bold text-gray-900 mb-1">
            Target Region: {region}
          </h3>
          <p className="text-sm text-gray-700">
            Your content is optimized for the {region} market. Below are region-specific insights and recommendations.
          </p>
        </div>
      </div>
    </div>
  );
}

