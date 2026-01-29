'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import ScoreCard from './ScoreCard';
import StatusSummaryBox from './StatusSummaryBox';
import SEOCheckItem from './SEOCheckItem';
import AIFixBanner from './AIFixBanner';
import PrioritySection from './PrioritySection';
import RawHTMLViewer from './RawHTMLViewer';
import CompetitorsView from './CompetitorsView';
import ScoreGauge from './ScoreGauge';
import FAQView from './FAQView';
import EvaluatePageView from './EvaluatePageView';
import {
  SEOIssuesResponse,
  RawHTMLResponse,
  OverviewResponse,
  getCompetitors,
  Competitor,
  getFAQs,
  FAQResponse,
  evaluatePage,
  EvaluatePageResponse,
  EvaluatePageRequest,
} from '@/lib/api';

interface AuditResultsProps {
  url: string;
  geoRegion: string;
  primaryKeyword: string;
  secondaryKeyword: string;
  industry:string;
  pageType:string;
  seoData: SEOIssuesResponse;
  rawHtmlData: RawHTMLResponse;
  overviewData: OverviewResponse;
}

function extractDomain(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace('www.', '');
  } catch {
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?([^\/]+)/);
    return match ? match[1] : url;
  }
}

export default function AuditResults({ url, geoRegion, primaryKeyword, secondaryKeyword,industry,pageType, seoData, rawHtmlData, overviewData }: AuditResultsProps) {
  const [activeTab, setActiveTab] = useState('Summary');
  const [activeSubTab, setActiveSubTab] = useState<'SEO' | 'GEO'>('SEO');
  const [filters, setFilters] = useState<{
    passed: boolean;
    failed: boolean;
  }>({
    passed: true,
    failed: true,
  });
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [competitorsLoading, setCompetitorsLoading] = useState(false);
  const [competitorsError, setCompetitorsError] = useState<string | null>(null);
  const competitorsFetchedRef = useRef(false);
  
  const [faqs, setFaqs] = useState<FAQResponse | null>(null);
  const [faqsLoading, setFaqsLoading] = useState(false);
  const [faqsError, setFaqsError] = useState<string | null>(null);
  const faqsFetchedRef = useRef(false);

  const [evaluation, setEvaluation] = useState<EvaluatePageResponse | null>(null);
  const [evaluationLoading, setEvaluationLoading] = useState(false);
  const [evaluationError, setEvaluationError] = useState<string | null>(null);
  const evaluationFetchedRef = useRef(false);

  const tabs = [
    'Summary',
    'SEO & GEO Insights',
    'AI Recommendations',
    'Raw HTML',
    'Competitors',
  ];

  // Fetch competitors data once when component mounts
  useEffect(() => {
    const fetchCompetitors = async () => {
      if (!url || !primaryKeyword || !secondaryKeyword || competitorsFetchedRef.current) {
        return;
      }

      setCompetitorsLoading(true);
      setCompetitorsError(null);
      competitorsFetchedRef.current = true;
      
      try {
        const payload = {
          url: url.trim(),
          primaryKeyword: primaryKeyword.trim(),
          secondaryKeyword: secondaryKeyword.trim(),
        };
        
        const response = await getCompetitors(payload);
        
        // Filter for fetchResponse: true and map to Competitor format
        const filteredCompetitors: Competitor[] = response
          .filter(item => item.fetchResponse === true)
          .map((item, index) => ({
            position: index + 1,
            domain: extractDomain(item.url),
            url: item.url,
            seoScore: item.seoScore,
            geoScore: item.geoScore,
          }));
        
        // Sort by seoScore descending
        filteredCompetitors.sort((a, b) => b.seoScore - a.seoScore);
        
        // Update positions after sorting
        filteredCompetitors.forEach((competitor, index) => {
          competitor.position = index + 1;
        });
        
        setCompetitors(filteredCompetitors);
      } catch (err) {
        setCompetitorsError(err instanceof Error ? err.message : 'Failed to fetch competitors');
        console.error('Error fetching competitors:', err);
        competitorsFetchedRef.current = false; // Allow retry on error
      } finally {
        setCompetitorsLoading(false);
      }
    };

    fetchCompetitors();
  }, [url, primaryKeyword, secondaryKeyword]);

  // Fetch FAQs data once when component mounts
  useEffect(() => {
    const fetchFAQs = async () => {
      if (!url || !primaryKeyword || !secondaryKeyword || faqsFetchedRef.current) {
        return;
      }

      setFaqsLoading(true);
      setFaqsError(null);
      faqsFetchedRef.current = true;
      
      try {
        const payload = {
          url: url.trim(),
          primaryKeyword: primaryKeyword.trim(),
          secondaryKeyword: secondaryKeyword.trim(),
        };
        
        const response = await getFAQs(payload);
        setFaqs(response);
      } catch (err) {
        setFaqsError(err instanceof Error ? err.message : 'Failed to fetch FAQs');
        console.error('Error fetching FAQs:', err);
        faqsFetchedRef.current = false; // Allow retry on error
      } finally {
        setFaqsLoading(false);
      }
    };

    fetchFAQs();
  }, [url, primaryKeyword, secondaryKeyword]);

  // Fetch AI evaluation once when component mounts
  useEffect(() => {
    const fetchEvaluation = async () => {
      if (!url || !primaryKeyword || !secondaryKeyword || evaluationFetchedRef.current) {
        return;
      }

      setEvaluationLoading(true);
      setEvaluationError(null);
      evaluationFetchedRef.current = true;

      try {
        const payload: EvaluatePageRequest = {
          page_context: {
            url: url.trim(),
            page_type: 'Informational',
            primary_keyword: primaryKeyword.trim(),
            geo_context: geoRegion || 'India',
            industry: 'Financial Services',
          },
          page_content: '',
        };

        const response = await evaluatePage(payload);
        setEvaluation(response);
      } catch (err) {
        setEvaluationError(err instanceof Error ? err.message : 'Failed to evaluate page');
        console.error('Error evaluating page:', err);
        evaluationFetchedRef.current = false; // Allow retry on error
      } finally {
        setEvaluationLoading(false);
      }
    };

    fetchEvaluation();
  }, [url, primaryKeyword, secondaryKeyword, geoRegion]);

  // Helper function to map API check status to UI status
  const getStatus = (pass: boolean, severity: string): 'passed' | 'failed' => {
    if (pass) {
      return 'passed';
    }
    return 'failed'; // All non-passed items (including warnings) are treated as issues/failed
  };

  // Filter and process SEO checks
  const seoChecks = useMemo(() => {
    return seoData.checks
      .filter(check => check.seoCheck)
      .sort((a, b) => a.order - b.order)
      .map(check => ({
        status: getStatus(check.pass, check.seoSeverity),
        title: check.title,
        description: check.description || '',
        severity: (check.seoSeverity || check.severity) as 'HIGH' | 'Medium' | 'Low' | undefined, // Use seoSeverity or fallback to general severity
      }))
      .filter(check => {
        if (check.status === 'passed') return filters.passed;
        if (check.status === 'failed') return filters.failed;
        return true;
      });
  }, [seoData, filters]);

  // Filter and process GEO checks
  const geoChecks = useMemo(() => {
    return seoData.checks
      .filter(check => check.geoCheck)
      .sort((a, b) => a.order - b.order)
      .map(check => ({
        status: getStatus(check.pass, check.geoSeverity),
        title: check.title,
        description: check.description || '',
        severity: (check.geoSeverity || check.severity) as 'HIGH' | 'Medium' | 'Low' | undefined, // Use geoSeverity or fallback to general severity
      }))
      .filter(check => {
        if (check.status === 'passed') return filters.passed;
        if (check.status === 'failed') return filters.failed;
        return true;
      });
  }, [seoData, filters]);

  const seoCounts = useMemo(() => {
    const seoFiltered = seoData.checks.filter(check => check.seoCheck);
    const passed = seoFiltered.filter(check => check.pass).length;
    const failed = seoFiltered.filter(check => !check.pass).length; // All non-passed items (including warnings) are issues
    return { passed, failed };
  }, [seoData]);

  // Calculate counts for GEO
  const geoCounts = useMemo(() => {
    const geoFiltered = seoData.checks.filter(check => check.geoCheck);
    const passed = geoFiltered.filter(check => check.pass).length;
    const failed = geoFiltered.filter(check => !check.pass).length; // All non-passed items (including warnings) are issues
    return { passed, failed };
  }, [seoData]);

  return (
    <div className="bg-white rounded-lg border border-gray-200 mt-8 max-w-4xl mx-auto">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
                activeTab === tab
                  ? 'border-[#272b8b] text-[#272b8b]'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              {tab === 'AI Recommendations' && (
                <svg 
                  className={`w-7 h-7 ${activeTab === tab ? 'text-yellow-500' : 'text-yellow-500'}`} 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0L13.09 4.26L17.37 5.35L13.09 6.44L12 10.7L10.91 6.44L6.63 5.35L10.91 4.26L12 0Z" />
                  <path d="M12 13.3L13.09 17.56L17.37 18.65L13.09 19.74L12 24L10.91 19.74L6.63 18.65L10.91 17.56L12 13.3Z" />
                  <path d="M0 12L4.26 10.91L5.35 6.63L6.44 10.91L10.7 12L6.44 13.09L5.35 17.37L4.26 13.09L0 12Z" />
                  <path d="M24 12L19.74 13.09L18.65 17.37L17.56 13.09L13.3 12L17.56 10.91L18.65 6.63L19.74 10.91L24 12Z" />
                </svg>
              )}
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4 md:p-8 ">
        {activeTab === 'Summary' && (
          <div className="space-y-6">
            {/* Page Title */}
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Page Title</p>
                <p className="text-gray-900">
                  {overviewData.pageTitle || 'N/A'}
                </p>
              </div>
            </div>

            {/* Meta Description */}
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Meta Description</p>
                <p className="text-gray-900">
                  {overviewData.metaDescription || 'N/A'}
                </p>
              </div>
            </div>

            {/* Content Word Count */}
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Content Word Count</p>
                <p className="text-gray-900">
                  {overviewData.contentWordCount ? `${overviewData.contentWordCount.toLocaleString()} words` : 'N/A'}
                </p>
              </div>
            </div>

            {/* Performance Scores */}
            {/* <div>
              <p className="text-sm font-medium text-gray-500 mb-4">Performance Scores</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <ScoreCard score={87} label="Technical SEO optimization" color="blue" />
                <ScoreCard score={92} label={`Optimized for ${geoRegion}`} color="green" />
                <ScoreCard score={78} label="Content structure quality" color="purple" />
                <ScoreCard score={86} label="Combined performance" color="orange" />
              </div>
            </div> */}

            {/* Analyzed URL */}
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Analyzed URL:</span> {url}
              </p>
            </div>
          </div>
        )}

        {activeTab === 'SEO & GEO Insights' && (
          <div className="space-y-6">
            {/* Pill Navigation */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-10">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <button
                  onClick={() => setActiveSubTab('SEO')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                    activeSubTab === 'SEO'
                      ? 'bg-[#272b8b] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  SEO
                </button>
                <button
                  onClick={() => setActiveSubTab('GEO')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                    activeSubTab === 'GEO'
                      ? 'bg-[#272b8b] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  GEO
                </button>
              </div>
              <div className="flex justify-center sm:justify-end">
                {activeSubTab === 'SEO' && (
                  <ScoreGauge score={seoData.seoScore} label="SEO Score" />
                )}
                {activeSubTab === 'GEO' && (
                  <ScoreGauge score={seoData.geoScore} label="GEO Score" />
                )}
              </div>
            </div>

            {/* SEO Content */}
            {activeSubTab === 'SEO' && (
              <div className="space-y-6">
                {/* Filter Buttons */}
                <div className="flex items-center gap-1.5 sm:gap-3 mt-8 sm:mt-0">
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, passed: !prev.passed }))}
                    className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs font-medium transition-colors flex items-center gap-1 sm:gap-2 ${
                      filters.passed
                        ? 'bg-green-100 text-green-700 border-2 border-green-500'
                        : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200'
                    }`}
                  >
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="whitespace-nowrap">Passed ({seoCounts.passed})</span>
                  </button>
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, failed: !prev.failed }))}
                    className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs font-medium transition-colors flex items-center gap-1 sm:gap-2 ${
                      filters.failed
                        ? 'bg-red-100 text-red-700 border-2 border-red-500'
                        : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200'
                    }`}
                  >
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="whitespace-nowrap">Issue ({seoCounts.failed})</span>
                  </button>
                  <button
                      onClick={() => setFilters({ passed: true, failed: true })}
                      className="p-1.5 sm:p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors border border-gray-300 flex items-center justify-center"
                      title="Reset Filters"
                    >
                      <svg 
                        className="w-4 h-4 sm:w-5 sm:h-5" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                        />
                      </svg>
                  </button>
                </div>

                {/* SEO Checks List */}
                <div className="space-y-3">
                  {seoChecks.map((check, index) => (
                    <SEOCheckItem
                      key={index}
                      status={check.status}
                      title={check.title}
                      description={check.description}
                      severity={check.severity}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* GEO Content */}
            {activeSubTab === 'GEO' && (
              <div className="space-y-6">
                {/* Filter Buttons */}
                <div className="flex items-center gap-1.5 sm:gap-3 mt-8 sm:mt-0">
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, passed: !prev.passed }))}
                    className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs font-medium transition-colors flex items-center gap-1 sm:gap-2 ${
                      filters.passed
                        ? 'bg-green-100 text-green-700 border-2 border-green-500'
                        : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200'
                    }`}
                  >
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="whitespace-nowrap">Passed ({geoCounts.passed})</span>
                  </button>
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, failed: !prev.failed }))}
                    className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs font-medium transition-colors flex items-center gap-1 sm:gap-2 ${
                      filters.failed
                        ? 'bg-red-100 text-red-700 border-2 border-red-500'
                        : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200'
                    }`}
                  >
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="whitespace-nowrap">Issue ({geoCounts.failed})</span>
                  </button>
                  <button
                      onClick={() => setFilters({ passed: true, failed: true })}
                      className="p-1.5 sm:p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors border border-gray-300 flex items-center justify-center"
                      title="Reset Filters"
                    >
                      <svg 
                        className="w-4 h-4 sm:w-5 sm:h-5" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                        />
                      </svg>
                  </button>
                </div>

                {/* GEO Checks List */}
                <div className="space-y-3">
                  {geoChecks.map((check, index) => (
                    <SEOCheckItem
                      key={index}
                      status={check.status}
                      title={check.title}
                      description={check.description}
                      severity={check.severity}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'AI Recommendations' && (
          <div className="space-y-8">
            {/* AI Fix Banner */}
            {/* <AIFixBanner /> */}

            <EvaluatePageView
              data={evaluation}
              isLoading={evaluationLoading}
              error={evaluationError}
            />

            {/* FAQs Section */}
            <FAQView
              extractedFaqs={faqs?.extractedFaqs || []}
              generatedFaqs={faqs?.generatedFaqs || []}
              isLoading={faqsLoading}
              error={faqsError}
            />
          </div>
        )}

        {activeTab === 'Raw HTML' && (
          <RawHTMLViewer html={rawHtmlData.html} />
        )}

        {activeTab === 'Competitors' && (
          <CompetitorsView 
            competitors={competitors}
            isLoading={competitorsLoading}
            error={competitorsError}
          />
        )}

        {activeTab !== 'Summary' && activeTab !== 'SEO & GEO Insights' && activeTab !== 'AI Recommendations' && activeTab !== 'Raw HTML' && activeTab !== 'Competitors' && (
          <div className="text-center py-12 text-gray-500">
            <p>Content for {activeTab} tab will be displayed here.</p>
          </div>
        )}
      </div>
    </div>
  );
}

