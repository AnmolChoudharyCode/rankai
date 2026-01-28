import OutputSection from './OutputSection';
import { type OptimizeContentResponse } from '@/lib/api';

interface OptimizeContentOutputProps {
  originalContent: string;
  optimizedData: OptimizeContentResponse | null;
  onBack: () => void;
}

export default function OptimizeContentOutput({ 
  originalContent, 
  optimizedData,
  onBack 
}: OptimizeContentOutputProps) {
  // Show error state if no data
  if (!optimizedData) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <p className="text-gray-600 mb-4">No optimized data available.</p>
          <button
            onClick={onBack}
            className="text-[#272b8b] hover:underline"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  // Format FAQs for display
  const formattedFAQs = optimizedData.FAQs
    .map((faq) => `Q: ${faq.question}\nA: ${faq.answer}`)
    .join('\n\n');

  // Format Table of Contents for display
  const formattedTOC = optimizedData['Table of Contents'].join('\n');

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Input
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Optimized Content</h1>
        <p className="text-gray-600">
          Your content has been optimized. Review and copy each section as needed.
        </p>
      </div>

      {/* Title */}
      <OutputSection
        title="Title"
        content={optimizedData.Title}
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        }
      />

      {/* Meta Description */}
      <OutputSection
        title="Meta Description"
        content={optimizedData['Meta Description']}
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        }
      />

      {/* H1 */}
      <OutputSection
        title="H1"
        content={optimizedData.H1}
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19V5h14v14H5z" />
          </svg>
        }
      />

      {/* Table of Contents */}
      <OutputSection
        title="Table of Contents (TOC)"
        content={formattedTOC}
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        }
      />

      {/* H2 Headings */}
      <OutputSection
        title="H2 Headings"
        content={optimizedData['H2 Headings'].join('\n')}
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19V5h14v14H5z" />
          </svg>
        }
      />

      {/* H3 Headings */}
      <OutputSection
        title="H3 Headings"
        content={optimizedData['H3 Headings'].join('\n')}
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19V5h14v14H5z" />
          </svg>
        }
      />

      {/* Content */}
      <OutputSection
        title="Content"
        content={optimizedData.Content}
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        }
      />

      {/* FAQs */}
      <OutputSection
        title="FAQs"
        content={formattedFAQs}
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
      />

      {/* Schema Markup */}
      <OutputSection
        title="Schema Markup"
        content={optimizedData['Schema Markup']}
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        }
      />
    </div>
  );
}

