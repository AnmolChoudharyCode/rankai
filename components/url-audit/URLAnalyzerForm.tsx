'use client';

import { useState, useEffect } from 'react';
import AuditResults from './AuditResults';
import { getSEOIssues, getRawHTML, getOverview, SEOIssuesResponse, RawHTMLResponse, OverviewResponse, getIndustries, getPageTypes, Competitor, FAQResponse, EvaluatePageResponse } from '@/lib/api';

const STORAGE_KEY = 'url-audit-data';
const FROM_DASHBOARD_FLAG = 'url-audit-from-dashboard';

interface StoredAuditData {
  url: string;
  geoRegion: string;
  primaryKeyword: string;
  secondaryKeyword: string;
  industry: string;
  pageType: string;
  seoData: SEOIssuesResponse;
  rawHtmlData: RawHTMLResponse;
  overviewData: OverviewResponse;
  competitors?: Competitor[];
  faqsData?: FAQResponse;
  evaluationData?: EvaluatePageResponse;
  timestamp: number;
}

const animatedDottedLineStyle = `
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .animated-dotted-circle {
    animation: rotate 2s linear infinite;
    transform-origin: center;
  }
`;

const LOADING_MESSAGES = [
  'Scanning the page…',
  'Crunching SEO signals…',
  'Decoding search intent…',
  'Mapping site structure…',
  'Evaluating keyword relevance…',
  'Analyzing geographic signals…',
  'Checking technical health…',
  'Aligning with ranking factors…',
  'Identifying optimization gaps…',
  'Crafting actionable recommendations…',
];

export default function URLAnalyzerForm() {
  const [url, setUrl] = useState('');
  const [geoRegion, setGeoRegion] = useState('India');
  const [primaryKeyword, setPrimaryKeyword] = useState('');
  const [secondaryKeyword, setSecondaryKeyword] = useState('');
  const [industry, setIndustry] = useState('');
  const [pageType, setPageType] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [seoData, setSeoData] = useState<SEOIssuesResponse | null>(null);
  const [rawHtmlData, setRawHtmlData] = useState<RawHTMLResponse | null>(null);
  const [overviewData, setOverviewData] = useState<OverviewResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentLoadingMessage, setCurrentLoadingMessage] = useState(0);
  const [industries, setIndustries] = useState<string[]>([]);
  const [pageTypes, setPageTypes] = useState<string[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [isRestoring, setIsRestoring] = useState(true);

  // Check if page was loaded via reload or direct link click, and clear data if so
  useEffect(() => {
    // Check navigation type to detect reload (works for browser reloads like F5, Ctrl+R, etc.)
    let isReload = false;
    try {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      isReload = navigation?.type === 'reload';
    } catch (e) {
      // Fallback: if Performance API is not available, assume it's not a reload
      isReload = false;
    }
    
    // Check if we came from Dashboard (flag exists)
    const fromDashboard = sessionStorage.getItem(FROM_DASHBOARD_FLAG) === 'true';
    
    // Check if data exists in sessionStorage
    const stored = sessionStorage.getItem(STORAGE_KEY);
    const hasStoredData = stored !== null;
    
    if (isReload) {
      // Clear sessionStorage on page reload
      sessionStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(FROM_DASHBOARD_FLAG);
      setIsRestoring(false);
      return;
    }
    
    // Check document.referrer to see if we came from dashboard
    // This is a fallback if the flag wasn't set in time
    const referrer = typeof document !== 'undefined' ? document.referrer : '';
    // Check if referrer is the dashboard (same origin and path is '/' or empty)
    let referrerIsDashboard = false;
    if (referrer && typeof window !== 'undefined') {
      const origin = window.location.origin;
      referrerIsDashboard = 
        (referrer.endsWith('/') || referrer === origin || referrer === origin + '/') &&
        !referrer.includes('/url-audit');
    }
    const cameFromDashboard = fromDashboard || referrerIsDashboard;
    
    // If flag is NOT set and we didn't come from dashboard, this is a direct navigation - clear data
    if (!fromDashboard && !cameFromDashboard) {
      // Direct navigation (not from dashboard) - clear all data
      if (hasStoredData) {
        sessionStorage.removeItem(STORAGE_KEY);
      }
      sessionStorage.removeItem(FROM_DASHBOARD_FLAG);
      setIsRestoring(false);
      return;
    }
    
    // If we have stored data, restore it (only if flag is set or came from dashboard)
    if (hasStoredData && (fromDashboard || cameFromDashboard)) {
      try {
        const parsedData: StoredAuditData = JSON.parse(stored!);
        // Restore form inputs and audit data
        setUrl(parsedData.url || '');
        setGeoRegion(parsedData.geoRegion || 'India');
        setPrimaryKeyword(parsedData.primaryKeyword || '');
        setSecondaryKeyword(parsedData.secondaryKeyword || '');
        setIndustry(parsedData.industry || '');
        setPageType(parsedData.pageType || '');
        
        // Restore audit results if they exist
        if (parsedData.seoData && parsedData.rawHtmlData && parsedData.overviewData) {
          setSeoData(parsedData.seoData);
          setRawHtmlData(parsedData.rawHtmlData);
          setOverviewData(parsedData.overviewData);
          setShowResults(true);
        }
        
        // Set flag if it wasn't set (for next navigation)
        if (!fromDashboard && cameFromDashboard) {
          sessionStorage.setItem(FROM_DASHBOARD_FLAG, 'true');
        }
      } catch (err) {
        console.error('Error restoring audit data:', err);
        // Clear corrupted data
        sessionStorage.removeItem(STORAGE_KEY);
        sessionStorage.removeItem(FROM_DASHBOARD_FLAG);
      }
    }
    
    setIsRestoring(false);
  }, []);

  // Fetch industries and page types on mount
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        setLoadingOptions(true);
        const [industriesData, pageTypesData] = await Promise.all([
          getIndustries(),
          getPageTypes(),
        ]);
        setIndustries(industriesData);
        setPageTypes(pageTypesData);
      } catch (err) {
        console.error('Error fetching options:', err);
        // Set empty arrays on error so form can still be used
        setIndustries([]);
        setPageTypes([]);
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchOptions();
  }, []);

  // Cycle through loading messages when loading
  useEffect(() => {
    if (!isLoading) {
      setCurrentLoadingMessage(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentLoadingMessage((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isLoading]);

  // Save audit data to sessionStorage whenever it changes
  useEffect(() => {
    if (seoData && rawHtmlData && overviewData && !isRestoring) {
      try {
        const dataToStore: StoredAuditData = {
          url,
          geoRegion,
          primaryKeyword,
          secondaryKeyword,
          industry,
          pageType,
          seoData,
          rawHtmlData,
          overviewData,
          timestamp: Date.now(),
        };
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore));
      } catch (err) {
        console.error('Error saving audit data to sessionStorage:', err);
      }
    }
  }, [seoData, rawHtmlData, overviewData, url, geoRegion, primaryKeyword, secondaryKeyword, industry, pageType, isRestoring]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim() && primaryKeyword.trim() && secondaryKeyword.trim()) {
      setIsLoading(true);
      setError(null);
      // Clear previous results when starting a new audit
      setShowResults(false);
      setSeoData(null);
      setRawHtmlData(null);
      setOverviewData(null);
      
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
        // Clear sessionStorage on error
        sessionStorage.removeItem(STORAGE_KEY);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <style>{animatedDottedLineStyle}</style>
      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">URL Analyzer</h1>
        <p className="text-sm sm:text-base text-gray-600">
          Get comprehensive SEO insights and recommendations for any webpage
        </p>
      </div>

      {/* Loading Status Display */}
      {/* {isLoading && (
        <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-4">
            <svg className="animate-spin h-6 w-6 text-[#272b8b]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-lg font-medium text-gray-800 animate-pulse">
              {LOADING_MESSAGES[currentLoadingMessage]}
            </p>
          </div>
        </div>
      )} */}

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

         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-2">
              Industry
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
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
              <select
                id="industry"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                disabled={loadingOptions}
                className="w-full pl-10 pr-10 text-black py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#272b8b] focus:border-[#272b8b] outline-none appearance-none bg-white cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed disabled:border-gray-200 transition-all hover:border-gray-400"
              >
                <option value="" disabled>Select Industry</option>
                {industries.map((ind) => (
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

        
          <div>
            <label htmlFor="pagetype" className="block text-sm font-medium text-gray-700 mb-2">
              Page type
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
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
              <select
                id="pagetype"
                value={pageType}
                onChange={(e) => setPageType(e.target.value)}
                disabled={loadingOptions}
                className="w-full pl-10 pr-10 text-black py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#272b8b] focus:border-[#272b8b] outline-none appearance-none bg-white cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed disabled:border-gray-200 transition-all hover:border-gray-400"
              >
                <option value="" disabled>Select Page Type</option>
                {pageTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
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
            className={`flex items-center gap-2 font-medium rounded-md border border-[#c5c1c1] p-2  text-[#c5c1c1] ${
              url.trim() && primaryKeyword.trim() && secondaryKeyword.trim() && !isLoading
                ? 'bg-[#272b8b] hover:bg-[#272b8b]/80 text-white cursor-pointer py-3 px-6 transition-colors '
                : 'cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <>
                <div className="">
          <div className="flex items-center gap-4">
            <svg className="h-5 w-5 animated-dotted-circle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
              <circle 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="#272b8b" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeDasharray="4 4"
                fill="none"
              />
            </svg>
            <p className="text-sm font-normal text-gray-800 animate-pulse">
              {LOADING_MESSAGES[currentLoadingMessage]}
            </p>
          </div>
        </div>
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
          industry={industry}
          pageType={pageType}
          rawHtmlData={rawHtmlData} 
          overviewData={overviewData}
          storageKey={STORAGE_KEY}
        />
      )}
    </div>
    </>
  );
}

