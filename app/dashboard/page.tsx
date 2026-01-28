'use client';

import { useState, useEffect } from 'react';
import RecentActivityTable from '@/components/dashboard/RecentActivityTable';
import SEOTipsSidebar from '@/components/dashboard/SEOTipsSidebar';
import UserDetailsSection from '@/components/dashboard/UserDetailsSection';
import { getSEOIssuesHistory, SEOHistoryResponse } from '@/lib/api';

interface ActivityItem {
  title: string;
  date: string;
  seoScore: number;
  geoScore:number;
}

export default function Dashboard() {
  const [recentActivities, setRecentActivities] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const historyData: SEOHistoryResponse = await getSEOIssuesHistory();
        
        // Flatten the nested object structure and extract activities
        const activities: ActivityItem[] = [];
        
        Object.values(historyData).forEach((items) => {
          items.forEach((item) => {
            activities.push({
              title: item.pageTitle,
              date: item.createdAt,
              seoScore: item.seoScore,
              geoScore: item.geoScore,
            });
          });
        });
        
        // Sort by date (most recent first)
        activities.sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateB - dateA;
        });
        
        setRecentActivities(activities);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch recent activity');
        console.error('Error fetching history:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* User Details and Stats Section */}
        {/* <UserDetailsSection /> */}
        
        {/* Recent Activity and SEO Tips */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2">
            {isLoading ? (
              <div className="bg-white rounded-lg border border-gray-200 p-8">
                <div className="flex items-center justify-center">
                  <div className="flex items-center gap-3">
                    <svg className="animate-spin h-6 w-6 text-[#272b8b]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="text-gray-600">Loading recent activity...</span>
                  </div>
                </div>
              </div>
            ) : error ? (
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              </div>
            ) : (
              <RecentActivityTable activities={recentActivities} />
            )}
          </div>
          <div className="lg:col-span-1">
            <SEOTipsSidebar />
          </div>
        </div>
      </main>
    </div>
  );
}

