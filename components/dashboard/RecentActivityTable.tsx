interface ActivityItem {
  title: string;
  date: string;
  seoScore: number;
  geoScore: number;
}

interface RecentActivityTableProps {
  activities: ActivityItem[];
}

export default function RecentActivityTable({ activities }: RecentActivityTableProps) {
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch (error) {
      return dateString;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'bg-green-500';
    if (score >= 75) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Recent Activity</h2>
      </div>
      
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SEO Score
              </th>
               <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                GEO Score
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {activities.map((activity, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 lg:px-6 py-4">
                  <span className="text-sm text-gray-900">{activity.title}</span>
                </td>
                <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-600">{formatDate(activity.date)}</span>
                </td>
                <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-20 lg:w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getScoreColor(activity.seoScore)}`}
                        style={{ width: `${activity.seoScore}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{activity.seoScore}</span>
                  </div>
                </td>
                <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-20 lg:w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getScoreColor(activity.geoScore)}`}
                        style={{ width: `${activity.geoScore}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{activity.geoScore}</span>
                  </div>
                </td>
                {/* <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                  <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors cursor-pointer">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden divide-y divide-gray-200">
        {activities.map((activity, index) => (
          <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between gap-3 mb-3">
              <span className="text-xs text-gray-500 whitespace-nowrap">{formatDate(activity.date)}</span>
            </div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">{activity.title}</h3>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-1">
                <div className="text-gray-900 font-semibold text-sm">Seo score</div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getScoreColor(activity.seoScore)}`}
                    style={{ width: `${activity.seoScore}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-900">{activity.seoScore}</span>
              </div>
            </div>

               <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-1">
                <div className="text-gray-900 font-semibold text-sm">Geo score</div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getScoreColor(activity.geoScore)}`}
                    style={{ width: `${activity.geoScore}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-900">{activity.geoScore}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

