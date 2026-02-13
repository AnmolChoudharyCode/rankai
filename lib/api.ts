/**
 * API Utility Functions
 * 
 * This file provides helper functions for making API calls
 * using the environment-specific configuration.
 */

import { getApiUrl, getBackendUrl, config } from './config';

/**
 * Generic fetch wrapper with error handling
 */
async function fetchWithErrorHandling(
  url: string,
  options?: RequestInit
): Promise<Response> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      // Log technical details for debugging, but show user-friendly message
      console.error(`API Error: ${response.status} ${response.statusText}`);
      throw new Error('Unable to process your request. Please try again later.');
    }

    return response;
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
}

/**
 * Make an API call to the API base URL
 */
export async function apiCall<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = getApiUrl(endpoint);
  const response = await fetchWithErrorHandling(url, options);
  
  // Handle 204 No Content responses
  if (response.status === 204) {
    console.error('API returned empty response (204 No Content)');
  }
  
  // Get response text first (can only read once)
  const text = await response.text();
  
  // Check if response is empty
  if (!text || text.trim().length === 0) {
    console.error('API returned empty response');
  }
  
  // Check content type if available
  const contentType = response.headers.get('content-type');
  if (contentType && !contentType.includes('application/json') && !contentType.includes('text/json')) {
    console.error(`API returned non-JSON response (${contentType})`);
    throw new Error('Unable to process the response. Please try again later.');
  }
  
  // Try to parse JSON, with better error handling
  try {
    return JSON.parse(text) as T;
  } catch (error) {
    if (error instanceof SyntaxError) {
      // Log technical details for debugging
      console.error('Failed to parse JSON response:', error);
      throw new Error('Unable to process the data. Please try again later.');
    }
    throw error;
  }
}

/**
 * Make a backend API call
 */
export async function backendCall<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = getBackendUrl(endpoint);
  const response = await fetchWithErrorHandling(url, options);
  
  // Handle 204 No Content responses
  if (response.status === 204) {
    console.error('API returned empty response (204 No Content)');
  }
  
  // Get response text first (can only read once)
  const text = await response.text();
  
  // Check if response is empty
  if (!text || text.trim().length === 0) {
    console.error('API returned empty response');
  }
  
  // Check content type if available
  const contentType = response.headers.get('content-type');
  if (contentType && !contentType.includes('application/json') && !contentType.includes('text/json')) {
    console.error(`API returned non-JSON response (${contentType})`);
    throw new Error('Unable to process the response. Please try again later.');
  }
  
  // Try to parse JSON, with better error handling
  try {
    return JSON.parse(text) as T;
  } catch (error) {
    if (error instanceof SyntaxError) {
      // Log technical details for debugging
      console.error('Failed to parse JSON response:', error);
      throw new Error('Unable to process the data. Please try again later.');
    }
    throw error;
  }
}

/**
 * Optimize Content API
 */

export interface OptimizeContentRequest {
  user: string; // User ID
  content: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface OptimizeContentResponse {
  Title: string;
  'Meta Description': string;
  H1: string;
  'Table of Contents': string[];
  'H2 Headings': string[];
  'H3 Headings': string[];
  Content: string;
  FAQs: FAQItem[];
  'Schema Markup': string;
}

/**
 * Optimize content API call
 * Endpoint: /api/optimizeContent
 */
export async function optimizeContent(
  payload: OptimizeContentRequest
): Promise<OptimizeContentResponse> {
  return apiCall<OptimizeContentResponse>('/optimizeContent', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/**
 * Example API functions - replace with your actual API endpoints
 */

// Example: Get user data
export async function getUserData(userId: string) {
  return apiCall<{ id: string; name: string }>(`/users/${userId}`);
}

// Example: Post data to backend
export async function postData(data: unknown) {
  return backendCall('/data', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * SEO Issues API
 */
export interface SEOIssuesRequest {
  url: string;
  primaryKeyword: string;
  secondaryKeyword: string;
}

export interface Check {
  order: number;
  title: string;
  description: string;
  pass: boolean;
  severity: 'HIGH' | 'Medium' | 'Low';
  seoCheck: boolean;
  geoCheck: boolean;
  seoSeverity: 'HIGH' | 'Medium' | 'Low';
  geoSeverity: 'HIGH' | 'Medium' | 'Low';
}

export interface SEOIssuesResponse {
  totalChecks: number;
  passedChecks: number;
  failedChecks: number;
  totalScore: number;
  seoScore: number;
  geoScore: number;
  checks: Check[];
}

/**
 * Get SEO issues API call
 * Endpoint: /audit/seo-issues
 */
export async function getSEOIssues(
  payload: SEOIssuesRequest
): Promise<SEOIssuesResponse> {
  return backendCall<SEOIssuesResponse>('/audit/seo-issues', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/**
 * Raw HTML API
 */
export interface RawHTMLResponse {
  html: string;
}

/**
 * Get Raw HTML API call
 * Endpoint: /audit/raw-html
 */
export async function getRawHTML(
  payload: SEOIssuesRequest
): Promise<RawHTMLResponse> {
  return backendCall<RawHTMLResponse>('/audit/raw-html', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/**
 * Overview API
 */
export interface OverviewResponse {
  pageTitle: string;
  metaDescription: string;
  contentWordCount: number;
}

/**
 * Get Overview API call
 * Endpoint: /audit/overview
 */
export async function getOverview(
  payload: SEOIssuesRequest
): Promise<OverviewResponse> {
  return backendCall<OverviewResponse>('/audit/overview', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/**
 * Competitors API
 */
export interface CompetitorApiResponse {
  totalChecks: number;
  passedChecks: number;
  failedChecks: number;
  totalScore: number;
  seoScore: number;
  geoScore: number;
  url: string;
  fetchResponse: boolean;
}

export interface Competitor {
  position: number;
  domain: string;
  url: string;
  seoScore: number;
  trend?: 'up' | 'down' | null;
  geoScore: number;

}

/**
 * Get Competitors API call
 * Endpoint: /audit/competitors
 */
export async function getCompetitors(
  payload: SEOIssuesRequest
): Promise<CompetitorApiResponse[]> {
  return backendCall<CompetitorApiResponse[]>('/audit/competitors', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/**
 * SEO Issues History API
 */
export interface SEOHistoryItem {
  totalChecks: number;
  passedChecks: number;
  failedChecks: number;
  totalScore: number;
  seoScore: number;
  geoScore: number;
  pageTitle: string;
  metaDescription: string;
  contentWordCount: number;
  createdAt: string;
}

export interface SEOHistoryResponse {
  [url: string]: SEOHistoryItem[];
}

/**
 * Get SEO Issues History API call
 * Endpoint: /audit/seo-issues/history
 */
export async function getSEOIssuesHistory(): Promise<SEOHistoryResponse> {
  return backendCall<SEOHistoryResponse>('/audit/seo-issues/history', {
    method: 'GET',
  });
}

/**
 * FAQs API
 */
export interface FAQResponse {
  extractedFaqs: FAQItem[];
  generatedFaqs: FAQItem[];
  totalExtracted: number;
  totalGenerated: number;
}

/**
 * Get FAQs API call
 * Endpoint: /audit/faqs (or verify with backend team for correct endpoint)
 * Payload: { url: string, primaryKeyword: string, secondaryKeyword: string }
 */
export async function getFAQs(
  payload: SEOIssuesRequest,
  useN8n: boolean = false
): Promise<FAQResponse> {
  const endpoint = useN8n ? '/audit/n8n/faq' : '/audit/ai-recommendation/faq';
  return backendCall<FAQResponse>(endpoint, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/**
 * AI Recommendations - Evaluate Page (LLM visibility) API
 */
// export type VisibilityLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface LLMVisibilitySummary {
  primary_blockers: string[];
}

export interface ParameterScore {
  parameter: string;
  info?: string;
  score: number;
  justification: string;
  blocking_issues: string[];
  blocking_blocks?: string[];
  recommended_fixes: string[];
}

export interface CitationConfidence {
  current_state: 'LOW' | 'MEDIUM' | 'HIGH' | 'Moderate';
  why_or_why_not: string;
  what_would_improve_it: string[];
}

export interface RecommendedNextActions {
  quick_wins: string[];
  structural_changes: string[];
}

export interface EvaluatePageResponse {
  llm_visibility_summary?: LLMVisibilitySummary;
  parameter_scores: ParameterScore[];
  citation_confidence: CitationConfidence;
  recommended_next_actions: RecommendedNextActions;
}

export interface PageContext {
  url: string;
  page_type: string;
  primary_keyword: string;
  geo_context: string;
  industry: string;
  score: number;
}

export interface EvaluatePageRequest {
  page_context: PageContext;
  page_content: string;
}

/**
 * Evaluate page for LLM visibility
 * Endpoint: /audit/ai-recommendation/evaluate-page
 */
export async function evaluatePage(
  payload: EvaluatePageRequest,
  useN8n: boolean = false
): Promise<EvaluatePageResponse> {
  const endpoint = useN8n ? '/audit/n8n/evaluate-page' : '/audit/ai-recommendation/evaluate-page';
  return backendCall<EvaluatePageResponse>(endpoint, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/**
 * Get Industries API call
 * Endpoint: /audit/industries
 */
export async function getIndustries(): Promise<string[]> {
  return backendCall<string[]>('/audit/industries', {
    method: 'GET',
  });
}

/**
 * Get Page Types API call
 * Endpoint: /audit/page-type
 */
export async function getPageTypes(): Promise<string[]> {
  return backendCall<string[]>('/audit/page-type', {
    method: 'GET',
  });
}

// Log current environment (useful for debugging)
if (typeof window !== 'undefined') {
  console.log('Current environment:', config.env);
  console.log('API Base URL:', config.apiBaseUrl);
  console.log('Backend URL:', config.backendUrl);
}

