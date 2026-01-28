interface CompetitorCardProps {
  position: number;
  domain: string;
  url: string;
  seoScore: number;
  trend?: 'up' | 'down' | null;
  geoScore: number;

}

export default function CompetitorCard({
  position,
  domain,
  url,
  seoScore,
  trend,
  geoScore
}: CompetitorCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 85) return 'bg-orange-500';
    return 'bg-orange-400';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-4 flex-col md:flex-row">
      {/* Position */}
      <div className="bg-gray-100 rounded-md px-4 py-2 min-w-[60px] text-center">
        <span className="text-lg font-bold text-gray-700">{position}</span>
      </div>

      {/* Competitor Details */}
      <div className="flex-1 min-w-0">
        {/* <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-gray-900">{domain}78</span>
          {trend === 'up' && (
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          )}
          {trend === 'down' && (
            <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17l5-5m0 0l-5-5m5 5H6" />
            </svg>
          )}
        </div> */}
        <div className="flex items-center gap-1 text-sm text-gray-600 max-w-[250px] md:max-w-full">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 truncate cursor-pointer"
          >
            {url}
          </a>
          <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="flex items-center gap-6">
        {/* SEO Score */}
        <div className="min-w-[120px]">
            <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-gray-700">SEO Score</span>
            <span className="text-sm font-bold text-gray-900">{seoScore}</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getScoreColor(seoScore)}`}
                  style={{ width: `${seoScore}%` }}
                />
          </div>
        </div>



         <div className="min-w-[120px]">
            <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-gray-700">GEO Score</span>
            <span className="text-sm font-bold text-gray-900">{geoScore}</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getScoreColor(geoScore)}`}
                  style={{ width: `${geoScore}%` }}
                />
          </div>
        </div>
      </div>
    </div>
  );
}
