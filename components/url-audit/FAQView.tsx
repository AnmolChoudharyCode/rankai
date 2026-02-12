'use client';

import { useState } from 'react';
import { FAQItem } from '@/lib/api';
import { Sparkles, Target, Zap, Layers, Info } from 'lucide-react';
import Accordion from './Accordion';

interface FAQViewProps {
  extractedFaqs: FAQItem[];
  generatedFaqs: FAQItem[];
  isLoading?: boolean;
  error?: string | null;
}

export default function FAQView({ extractedFaqs, generatedFaqs, isLoading, error }: FAQViewProps) {
  // Don't render anything when loading - unified banner handles it
  if (isLoading) {
    return null;
  }

  // Show error
  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <p className="text-sm text-red-600">{error}</p>
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
            <span className="px-3 py-1 bg-[#272b8b]0/20 text-indigo-300 rounded-full text-[10px] font-black uppercase tracking-widest border border-[#272b8b]">
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
        
        {/* LEFT COLUMN: COMPETITOR RESEARCH */}
        <div className="xl:col-span-5">
          <div className="bg-slate-50 border border-slate-200 rounded-[32px] p-6 md:p-8 h-full">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-600 shadow-sm">
                <Target size={24} />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Competitor FAQs</h2>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Research Reference</p>
              </div>
            </div>

            <div className="space-y-2">
              {extractedFaqs && extractedFaqs.length > 0 ? (
                extractedFaqs.map((faq, index) => (
                  <Accordion 
                    key={index} 
                    faq={faq} 
                    type="competitor" 
                  />
                ))
              ) : (
                <div className="text-center py-8 text-slate-500 text-sm">
                  No competitor FAQs found
                </div>
              )}
            </div>
            
            {extractedFaqs && extractedFaqs.length > 0 && (
              <div className="mt-8 flex items-start gap-3 p-4 bg-blue-50/50 border border-blue-100 rounded-2xl text-blue-800">
                <Info size={16} className="mt-0.5 flex-shrink-0" />
                <p className="text-xs font-medium leading-relaxed">
                  These questions were extracted from the top 5 ranking pages for your target keywords.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: AI RECOMMENDATIONS */}
        <div className="xl:col-span-7">
          <div className="bg-gradient-to-br from-indigo-50/30 via-white to-purple-50/30 border-2 border-indigo-100 rounded-[40px] p-6 md:p-10 shadow-xl shadow-indigo-100/10 h-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-[#272b8b] rounded-[24px] flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                  <Zap size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">AI Suggestions</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <Sparkles size={14} className="text-[#272b8b]" />
                    <span className="text-[#272b8b]  text-xs font-black uppercase tracking-widest">Optimized Content</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {generatedFaqs && generatedFaqs.length > 0 ? (
                generatedFaqs.map((faq, index) => (
                  <Accordion 
                    key={index} 
                    faq={faq} 
                    type="recommended" 
                    isOpenByDefault={index === 0}
                  />
                ))
              ) : (
                <div className="text-center py-8 text-slate-500 text-sm">
                  No AI suggestions found
                </div>
              )}
            </div>

            <div className="mt-12 p-6 bg-slate-900 rounded-[32px] text-white flex items-center gap-6">
              <Sparkles className="text-indigo-400 flex-shrink-0" size={24} />
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
