'use client';

import { useState } from 'react';
import AIFixBanner from '../url-audit/AIFixBanner';

interface GenerateContentInputProps {
  onProceed: (input: string, inputType: string) => void;
}

export default function GenerateContentInput({ onProceed }: GenerateContentInputProps) {
  const [input, setInput] = useState('');
  const [inputType, setInputType] = useState('title');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onProceed(input, inputType);
    }
  };

  const inputTypes = [
    { value: 'title', label: 'Title' },
    { value: 'keyword', label: 'Keyword' },
    { value: 'idea', label: 'Idea' },
    { value: 'topic', label: 'Topic' },
    { value: 'url', label: 'URL' },
  ];

  return (
    // <div className="bg-white rounded-lg border border-gray-200 p-8 max-w-4xl mx-auto">
    //   <div className="mb-6">
    //     <h1 className="text-3xl font-bold text-gray-900 mb-2">Generate Content</h1>
    //     <p className="text-gray-600">
    //       Enter your input below and let AI generate SEO-optimized content for you
    //     </p>
    //   </div>

    //   <form onSubmit={handleSubmit} className="space-y-6">
    //     {/* Input Type Radio Buttons */}
    //     <div>
    //       <label className="block text-sm font-medium text-gray-700 mb-3">
    //         Input Type <span className="text-red-500">*</span>
    //       </label>
    //       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
    //         {inputTypes.map((type) => (
    //           <label
    //             key={type.value}
    //             className={`flex items-center gap-2 p-3 border-2 rounded-md cursor-pointer transition-colors ${
    //               inputType === type.value
    //                 ? 'border-[#272b8b] bg-[#272b8b]/5'
    //                 : 'border-gray-300 hover:border-gray-400'
    //             }`}
    //           >
    //             <input
    //               type="radio"
    //               name="inputType"
    //               value={type.value}
    //               checked={inputType === type.value}
    //               onChange={(e) => setInputType(e.target.value)}
    //               className="w-4 h-4 text-[#272b8b] focus:ring-[#272b8b] focus:ring-2"
    //             />
    //             <span className="text-sm font-medium text-gray-700">{type.label}</span>
    //           </label>
    //         ))}
    //       </div>
    //     </div>

    //     {/* Input Text Box */}
    //     <div>
    //       <label htmlFor="input" className="block text-sm font-medium text-gray-700 mb-2">
    //         {inputTypes.find((t) => t.value === inputType)?.label || 'Input'}{' '}
    //         <span className="text-red-500">*</span>
    //       </label>
    //       <input
    //         id="input"
    //         type="text"
    //         value={input}
    //         onChange={(e) => setInput(e.target.value)}
    //         placeholder={`Enter your ${inputTypes.find((t) => t.value === inputType)?.label.toLowerCase() || 'input'} here...`}
    //         required
    //         className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#272b8b] focus:border-[#272b8b] outline-none"
    //       />
    //     </div>

    //     <div>
    //       <button
    //         type="submit"
    //         disabled={!input.trim()}
    //         className={`flex items-center gap-2 font-medium py-3 px-6 rounded-md transition-colors ${
    //           input.trim()
    //             ? 'bg-[#272b8b] hover:bg-[#272b8b]/80 text-white cursor-pointer'
    //             : 'bg-gray-300 text-gray-500 cursor-not-allowed'
    //         }`}
    //       >
    //         <svg
    //           className="w-5 h-5"
    //           fill="none"
    //           stroke="currentColor"
    //           viewBox="0 0 24 24"
    //         >
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             strokeWidth={2}
    //             d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    //           />
    //         </svg>
    //         Generate Content
    //       </button>
    //     </div>
    //   </form>
    // </div>
    <div>
      <AIFixBanner/>
    </div>
  );
}

