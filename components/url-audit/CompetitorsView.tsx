'use client';

import CompetitorsInfoBanner from './CompetitorsInfoBanner';
import CompetitorCard from './CompetitorCard';
import { Competitor } from '@/lib/api';

interface CompetitorsViewProps {
  competitors: Competitor[];
  isLoading: boolean;
  error: string | null;
}

export default function CompetitorsView({ competitors, isLoading, error }: CompetitorsViewProps) {
     console.log("competitors:",competitors);
  if (isLoading) {
    return (
      <div className="space-y-4">
        <CompetitorsInfoBanner />
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-3">
            <svg className="animate-spin h-6 w-6 text-[#272b8b]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-gray-600">Loading competitors...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <CompetitorsInfoBanner />
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (competitors.length === 0) {
    return (
      <div className="space-y-4">
        <CompetitorsInfoBanner />
        <div className="text-center py-12 text-gray-500">
          <p>No competitors found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <CompetitorsInfoBanner />
      <div className="space-y-3">
        {competitors.map((competitor) => (
          <CompetitorCard
            key={competitor.position}
            position={competitor.position}
            domain={competitor.domain}
            url={competitor.url}
            seoScore={competitor.seoScore}
            geoScore={competitor.geoScore}
            
          />
        ))}
      </div>
    </div>
  );
}
