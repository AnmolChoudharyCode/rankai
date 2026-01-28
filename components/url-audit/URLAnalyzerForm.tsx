'use client';

import { useState } from 'react';
import AuditResults from './AuditResults';
import { getSEOIssues, getRawHTML, getOverview, SEOIssuesResponse, RawHTMLResponse, OverviewResponse } from '@/lib/api';

export default function URLAnalyzerForm() {
  const [url, setUrl] = useState('');
  const [geoRegion, setGeoRegion] = useState('United States');
  const [primaryKeyword, setPrimaryKeyword] = useState('');
  const [secondaryKeyword, setSecondaryKeyword] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [seoData, setSeoData] = useState<SEOIssuesResponse | null>(null);
  const [rawHtmlData, setRawHtmlData] = useState<RawHTMLResponse | null>(null);
  const [overviewData, setOverviewData] = useState<OverviewResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim() && primaryKeyword.trim() && secondaryKeyword.trim()) {
      setIsLoading(true);
      setError(null);
      try {
        const payload = {
          url: url.trim(),
          primaryKeyword: primaryKeyword.trim(),
          secondaryKeyword: secondaryKeyword.trim(),
        };
        
        // Fetch all APIs in parallel
        const [seoDataResult, rawHtmlResult, overviewResult] = await Promise.all([
          getSEOIssues(payload),
          getRawHTML(payload),
          getOverview(payload),
        ]);
        
        setSeoData(seoDataResult);
        setRawHtmlData(rawHtmlResult);
        setOverviewData(overviewResult);
        setShowResults(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch audit data');
        console.error('Error fetching audit data:', err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">URL Analyzer</h1>
        <p className="text-sm sm:text-base text-gray-600">
          Get comprehensive SEO insights and recommendations for any webpage
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {/* Paste URL Field */}
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
            Paste URL <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
            </div>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/page"
              required
              className="w-full pl-10 pr-4 text-black py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#272b8b] focus:border-[#272b8b] outline-none"
            />
          </div>
        </div>

        {/* Primary and Secondary Keywords */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Primary Keyword */}
          <div>
            <label htmlFor="primaryKeyword" className="block text-sm font-medium text-gray-700 mb-2">
              Primary Keyword <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="primaryKeyword"
                value={primaryKeyword}
                onChange={(e) => setPrimaryKeyword(e.target.value)}
                placeholder="e.g., SEO tools"
                required
                className="w-full pl-10 text-black pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#272b8b] focus:border-[#272b8b] outline-none"
              />
            </div>
          </div>

          {/* Secondary Keyword */}
          <div>
            <label htmlFor="secondaryKeyword" className="block text-sm font-medium text-gray-700 mb-2">
              Secondary Keyword <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="secondaryKeyword"
                value={secondaryKeyword}
                onChange={(e) => setSecondaryKeyword(e.target.value)}
                placeholder="e.g., marketing"
                required
                className="w-full pl-10 pr-4 py-3 text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-[#272b8b] focus:border-[#272b8b] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Run Audit Button */}
        <div>
          <button
            type="submit"
            disabled={!url.trim() || !primaryKeyword.trim() || !secondaryKeyword.trim() || isLoading}
            className={`flex items-center gap-2 font-medium py-3 px-6 rounded-md transition-colors ${
              url.trim() && primaryKeyword.trim() && secondaryKeyword.trim() && !isLoading
                ? 'bg-[#272b8b] hover:bg-[#272b8b]/80 text-white cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Run Audit
              </>
            )}
          </button>
        </div>
      </form>

      {/* Audit Results */}
      {showResults && seoData && rawHtmlData && overviewData && (
        <AuditResults 
          url={url} 
          geoRegion={geoRegion} 
          primaryKeyword={primaryKeyword}
          secondaryKeyword={secondaryKeyword}
          seoData={seoData} 
          rawHtmlData={rawHtmlData} 
          overviewData={overviewData} 
        />
      )}
    </div>
  );
}

