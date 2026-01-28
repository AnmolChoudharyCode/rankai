'use client';

import { useState } from 'react';
import { FAQItem } from '@/lib/api';

interface FAQViewProps {
  extractedFaqs: FAQItem[];
  generatedFaqs: FAQItem[];
  isLoading?: boolean;
  error?: string | null;
}

export default function FAQView({ extractedFaqs, generatedFaqs, isLoading, error }: FAQViewProps) {
  const [openExtractedIndex, setOpenExtractedIndex] = useState<number | null>(0);
  const [openGeneratedIndex, setOpenGeneratedIndex] = useState<number | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center gap-3">
          <svg className="animate-spin h-6 w-6 text-[#272b8b]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-gray-600">Loading FAQs...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <p className="text-sm text-red-600">{error}</p>
      </div>
    );
  }

  const renderFAQItem = (faq: FAQItem, index: number, isOpen: boolean, onToggle: () => void, type: 'extracted' | 'generated', isGenerated: boolean) => {
    return (
      <div
        key={index}
        className={`bg-white border rounded-lg sm:rounded-xl overflow-hidden transition-all duration-500 ${
          isOpen 
            ? 'border-purple-200 shadow-lg shadow-purple-50' 
            : 'border-gray-200 hover:border-purple-100 hover:shadow-md'
        }`}
      >
        <button
          onClick={onToggle}
          className="group w-full px-4 sm:px-5 md:px-6 py-4 sm:py-5 text-left flex items-center justify-between gap-3 sm:gap-4 focus:outline-none rounded-lg sm:rounded-xl transition-all duration-200 hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-transparent cursor-pointer touch-manipulation"
        >
          <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
            {/* Icon */}
            <div className={`flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300 ${
              isOpen
                ? isGenerated
                  ? 'bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-200'
                  : 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-200'
                : isGenerated
                ? 'bg-purple-100 group-hover:bg-purple-200'
                : 'bg-blue-100 group-hover:bg-blue-200'
            }`}>
              {isGenerated ? (
                <svg className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300 ${isOpen ? 'text-white' : 'text-purple-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              ) : (
                <svg className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300 ${isOpen ? 'text-white' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              )}
            </div>
            
            {/* Question */}
            <h3 className={`font-semibold flex-1 text-sm sm:text-base transition-colors duration-200 pr-2 sm:pr-0 ${
              isOpen ? 'text-gray-900' : 'text-gray-800 group-hover:text-gray-900'
            }`}>
              {faq.question}
            </h3>
          </div>

          {/* Chevron Icon */}
          <div className={`flex-shrink-0 transition-all duration-300 ${
            isOpen 
              ? 'rotate-180' 
              : ''
          }`}>
            <svg
              className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-200 ${
                isOpen 
                  ? 'text-purple-600' 
                  : 'text-gray-400 group-hover:text-gray-600'
              }`}
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
        </button>

        {/* Answer with smooth top-to-bottom expansion using CSS Grid */}
        <div
          className="grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden"
          style={{
            gridTemplateRows: isOpen ? '1fr' : '0fr',
            opacity: isOpen ? 1 : 0,
          }}
        >
          <div className="min-h-0">
            <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 ml-11 sm:ml-12 md:ml-14">
              <div
                className="prose prose-sm max-w-none text-gray-700 leading-relaxed text-sm sm:text-base [&_p]:mb-2 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:ml-4 sm:[&_ul]:ml-6 [&_ul]:mb-2 [&_ul]:space-y-1 [&_ol]:list-decimal [&_ol]:ml-4 sm:[&_ol]:ml-6 [&_ol]:mb-2 [&_ol]:space-y-1 [&_li]:mb-1 [&_li]:leading-relaxed [&_a]:text-[#272b8b] [&_a]:font-medium [&_a]:underline [&_a:hover]:text-[#272b8b]/80 [&_a:transition-colors] [&_b]:font-semibold [&_b]:text-gray-900 [&_br]:block [&_br]:mb-2"
                dangerouslySetInnerHTML={{ __html: faq.answer }}
              />
              
              {/* Tag */}
              
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-white via-purple-50/20 to-white rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-xl border border-purple-100/50">
      {/* Header Section */}
      <div className="text-center mb-8 md:mb-12">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-purple-100 to-purple-50 border border-purple-200/80 rounded-full mb-4 sm:mb-6 shadow-sm hover:shadow-md transition-shadow duration-200">
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0L13.09 4.26L17.37 5.35L13.09 6.44L12 10.7L10.91 6.44L6.63 5.35L10.91 4.26L12 0Z" />
            <path d="M12 13.3L13.09 17.56L17.37 18.65L13.09 19.74L12 24L10.91 19.74L6.63 18.65L10.91 17.56L12 13.3Z" />
            <path d="M0 12L4.26 10.91L5.35 6.63L6.44 10.91L10.7 12L6.44 13.09L5.35 17.37L4.26 13.09L0 12Z" />
            <path d="M24 12L19.74 13.09L18.65 17.37L17.56 13.09L13.3 12L17.56 10.91L18.65 6.63L19.74 10.91L24 12Z" />
          </svg>
          <span className="text-purple-700 text-xs sm:text-sm font-semibold">AI Recommendations</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 sm:mb-4 md:mb-5 px-2">
          <span className="text-gray-900">Frequently Asked </span>
          <span className="bg-gradient-to-r from-purple-600 via-purple-600 to-purple-700 bg-clip-text text-transparent">
            Questions
          </span>
        </h1>
        

        {/* Subtitle */}
        <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-2">
          AI-recommended FAQs reflect both user intent and commonly addressed industry questions. This helps your content rank better in AI-generated answers.
        </p>
      </div>

      <div className="space-y-6 md:space-y-8 max-w-4xl mx-auto">
        {/* Extracted FAQs Section */}
        {extractedFaqs && extractedFaqs.length > 0 && (
          <div className="space-y-3 md:space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 pb-3 sm:pb-4 border-b-2 border-blue-100">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">Competitor FAQs</h2>
              </div>
            </div>

            <div className="space-y-3">
              {extractedFaqs.map((faq, index) =>
                renderFAQItem(
                  faq,
                  index,
                  openExtractedIndex === index,
                  () => setOpenExtractedIndex(openExtractedIndex === index ? null : index),
                  'extracted',
                  false
                )
              )}
            </div>
          </div>
        )}

        {/* AI Generated FAQs Section */}
        {generatedFaqs && generatedFaqs.length > 0 && (
          <div className="space-y-3 md:space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 pb-3 sm:pb-4 border-b-2 border-purple-100">
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-purple-500 to-purple-600 rounded-full"></div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">Recommended FAQs</h2>
                <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r from-purple-100 to-purple-50 text-purple-700 text-xs font-bold rounded-full border border-purple-200 shadow-sm">
                  AI
                </span>
                {/* <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full border border-purple-200">
                  {generatedFaqs.length}
                </span> */}
              </div>
              <p className="text-xs sm:text-sm text-gray-500 font-medium ml-3 sm:ml-0">
                Optimized for SEO
              </p>
            </div>

            <div className="space-y-3">
              {generatedFaqs.map((faq, index) =>
                renderFAQItem(
                  faq,
                  index,
                  openGeneratedIndex === index,
                  () => setOpenGeneratedIndex(openGeneratedIndex === index ? null : index),
                  'generated',
                  true
                )
              )}
            </div>
          </div>
        )}

        {/* Empty State */}
        {(!extractedFaqs || extractedFaqs.length === 0) && (!generatedFaqs || generatedFaqs.length === 0) && (
          <div className="text-center py-12">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-gray-500 text-lg font-medium mb-2">No FAQs found</p>
            <p className="text-gray-400 text-sm">FAQs will appear here once generated</p>
          </div>
        )}
      </div>
    </div>
  );
}
