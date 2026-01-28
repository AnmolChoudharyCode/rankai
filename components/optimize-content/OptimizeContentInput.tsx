'use client';

import { useState } from 'react';
import AIFixBanner from '../url-audit/AIFixBanner';

interface OptimizeContentInputProps {
  onProceed: (content: string) => void;
  isLoading?: boolean;
  error?: string | null;
}

export default function OptimizeContentInput({ 
  onProceed, 
  isLoading = false,
  error = null 
}: OptimizeContentInputProps) {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() && !isLoading) {
      onProceed(content);
    }
  };

  return (
    // <div className="bg-white rounded-lg border border-gray-200 p-8 max-w-4xl mx-auto">
    //   <div className="mb-6">
    //     <h1 className="text-3xl font-bold text-gray-900 mb-2">Optimize Content</h1>
    //     <p className="text-gray-600">
    //       Paste your content below and let AI optimize it for better SEO, GEO and LLMs performance
    //     </p>
    //   </div>

    //   {error && (
    //     <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
    //       <p className="text-red-800 text-sm">{error}</p>
    //     </div>
    //   )}

    //   <form onSubmit={handleSubmit} className="space-y-6">
    //     <div>
    //       <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
    //         Content <span className="text-red-500">*</span>
    //       </label>
    //       <textarea
    //         id="content"
    //         value={content}
    //         onChange={(e) => setContent(e.target.value)}
    //         placeholder="Paste your content here..."
    //         required
    //         disabled={isLoading}
    //         rows={15}
    //         className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#272b8b] focus:border-[#272b8b] outline-none resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
    //       />
    //     </div>

    //     <div>
    //       <button
    //         type="submit"
    //         disabled={!content.trim() || isLoading}
    //         className={`flex items-center gap-2 font-medium py-3 px-6 rounded-md transition-colors ${
    //           content.trim() && !isLoading
    //             ? 'bg-[#272b8b] hover:bg-[#272b8b]/80 text-white cursor-pointer'
    //             : 'bg-gray-300 text-gray-500 cursor-not-allowed'
    //         }`}
    //       >
    //         {isLoading ? (
    //           <>
    //             <svg
    //               className="animate-spin h-5 w-5"
    //               xmlns="http://www.w3.org/2000/svg"
    //               fill="none"
    //               viewBox="0 0 24 24"
    //             >
    //               <circle
    //                 className="opacity-25"
    //                 cx="12"
    //                 cy="12"
    //                 r="10"
    //                 stroke="currentColor"
    //                 strokeWidth="4"
    //               ></circle>
    //               <path
    //                 className="opacity-75"
    //                 fill="currentColor"
    //                 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    //               ></path>
    //             </svg>
    //             Optimizing...
    //           </>
    //         ) : (
    //           <>
    //             <svg
    //               className="w-5 h-5"
    //               fill="none"
    //               stroke="currentColor"
    //               viewBox="0 0 24 24"
    //             >
    //               <path
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //                 strokeWidth={2}
    //                 d="M13 10V3L4 14h7v7l9-11h-7z"
    //               />
    //             </svg>
    //             Proceed
    //           </>
    //         )}
    //       </button>
    //     </div>
    //   </form>
    // </div>
    <div>
      <AIFixBanner/>
    </div>
  );
}

