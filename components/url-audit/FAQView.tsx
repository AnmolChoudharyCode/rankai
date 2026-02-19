'use client';

import { FAQItem } from '@/lib/api';
import { Sparkles, Target, Zap, Layers, Info } from 'lucide-react';
import Accordion from './Accordion';

interface FAQViewProps {
  competitorFaqs: FAQItem[];
  recommendedFaqs: FAQItem[];
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export default function FAQView({ competitorFaqs, recommendedFaqs, isLoading, error, onRetry }: FAQViewProps) {
  // Don't render anything when loading - unified banner handles it
  if (isLoading) {
    return null;
  }

  // Show error
  if (error) {
    return (
      <div className="p-6  border-2  rounded-[32px] shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-red-900 mb-1">FAQ Recommendations Failed</h3>
            <p className="text-sm text-red-700 mb-3">{error}</p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#273b8b] text-white text-sm font-semibold rounded-lg transition-colors duration-200 hover:bg-[#1e2d6b]"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Retry FAQ Fetch
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div className="relative overflow-hidden rounded-[32px] bg-slate-900 p-8 md:p-12 shadow-xl border border-white/10">
        <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
          <Layers size={180} className="text-indigo-400 rotate-12" />
        </div>
        
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-6">
            <span className="px-3 py-1 bg-[#272b8b]/20 text-indigo-300 rounded-full text-[10px] font-black uppercase tracking-widest border border-[#272b8b]">
              Content Strategy
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
            FAQ <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Optimization</span>
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed font-medium">
            Review existing competitor patterns and implement AI-generated suggestions to improve your search visibility.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-10">
        
        {/* LEFT COLUMN: COMPETITOR & EXISTING FAQs */}
        <div className="xl:col-span-6 space-y-6">
          {/* COMPETITOR FAQs SECTION */}
          <div className="bg-slate-50 border border-slate-200 rounded-[32px] p-6 md:p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-600 shadow-sm">
                <Target size={24} />
              </div>
              <div className="flex-1 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">Competitor FAQs</h2>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Research Reference</p>
                </div>
                {/* {competitorFaqs && competitorFaqs.length > 0 && (
                  <span className="px-3 py-1 bg-slate-200 text-slate-700 rounded-full text-xs font-bold">
                    {competitorFaqs.length}
                  </span>
                )} */}
              </div>
            </div>

            <div className="space-y-2">
              {competitorFaqs && competitorFaqs.length > 0 ? (
                competitorFaqs.map((faq, index) => (
                  <Accordion 
                    key={index} 
                    faq={faq} 
                    type="competitor" 
                  />
                ))
              ) : (
                <div className="text-center py-12 text-slate-400">
                  <Target size={32} className="mx-auto mb-3 opacity-50" />
                  <p className="text-sm font-medium">No competitor FAQs found</p>
                  <p className="text-xs mt-1 text-slate-400">Competitor data will appear here once available</p>
                </div>
              )}
            </div>
            
            {competitorFaqs && competitorFaqs.length > 0 && (
              <div className="mt-8 flex items-start gap-3 p-4 bg-blue-50/50 border border-blue-100 rounded-2xl text-blue-800">
                <Info size={16} className="mt-0.5 shrink-0" />
                <p className="text-xs font-medium leading-relaxed">
                  These questions were extracted from the top 5 ranking pages for your target keywords.
                </p>
              </div>
            )}
          </div>

        </div>

        {/* RIGHT COLUMN: RECOMMENDED FAQs */}
        <div className="xl:col-span-6 space-y-6">
          
       

          {/* RECOMMENDED FAQs SECTION */}
          <div className="bg-gradient-to-br from-indigo-50/30 via-white to-purple-50/30 border-2 border-indigo-100 rounded-[32px] p-6 md:p-8 shadow-xl shadow-indigo-100/10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
              <div className="flex items-center gap-5 w-full">
                <div className="w-16 h-16 bg-[#272b8b] rounded-[24px] flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                  <Zap size={32} />
                </div>
                <div className="flex-1 flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Recommended FAQs</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <Sparkles size={14} className="text-[#272b8b]" />
                      <span className="text-[#272b8b] text-xs font-black uppercase tracking-widest">AI Optimized</span>
                    </div>
                  </div>
             
                  
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {recommendedFaqs && recommendedFaqs.length > 0 ? (
                recommendedFaqs.map((faq, index) => (
                  <Accordion 
                    key={index} 
                    faq={faq} 
                    type="recommended" 
                    isOpenByDefault={index === 0}
                  />
                ))
              ) : (
                <div className="text-center py-12 text-slate-400">
                  <Sparkles size={32} className="mx-auto mb-3 opacity-50" />
                  <p className="text-sm font-medium">No recommended FAQs found</p>
                  <p className="text-xs mt-1 text-slate-400">AI recommendations will appear here</p>
                </div>
              )}
            </div>

            <div className="mt-8 p-6 bg-slate-900 rounded-[32px] text-white flex items-center gap-6">
              <Sparkles className="text-indigo-400 shrink-0" size={24} />
              <p className="text-slate-400 text-sm font-medium leading-snug">
                These recommendations are tailored to cover user intent patterns not currently addressed on your page.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
