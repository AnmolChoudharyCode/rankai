'use client';

import { useState } from 'react';

interface RawHTMLViewerProps {
  html: string;
}

export default function RawHTMLViewer({ html }: RawHTMLViewerProps) {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(html);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // HTML syntax highlighting
  const highlightHTML = (code: string) => {
    let highlighted = code
      // Escape HTML entities first
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    
    // Highlight HTML comments
    highlighted = highlighted.replace(/&lt;!--([^&]*)--&gt;/g, '<span class="text-gray-500">&lt;!--$1--&gt;</span>');
    
    // Highlight DOCTYPE
    highlighted = highlighted.replace(/(&lt;!DOCTYPE\s+html&gt;)/g, '<span class="text-blue-400">$1</span>');
    
    // Highlight opening and closing tags
    highlighted = highlighted.replace(/(&lt;)(\/?)([a-zA-Z][a-zA-Z0-9]*)(\s*)/g, (match, open, slash, tag, space) => {
      return `<span class="text-blue-400">${open}${slash}${tag}</span>${space}`;
    });
    
    // Highlight attributes (before =)
    highlighted = highlighted.replace(/(\s+)([a-zA-Z-]+)(=)/g, '$1<span class="text-green-400">$2</span><span class="text-blue-400">$3</span>');
    
    // Highlight attribute values (in quotes)
    highlighted = highlighted.replace(/(=)(&quot;)([^&]*?)(&quot;)/g, 
      '<span class="text-blue-400">$1</span><span class="text-yellow-300">$2$3$4</span>');
    
    // Highlight closing tag brackets
    highlighted = highlighted.replace(/(&lt;\/)([a-zA-Z]+)(&gt;)/g, 
      '<span class="text-blue-400">$1$2$3</span>');
    
    // Highlight standalone closing brackets
    highlighted = highlighted.replace(/(&lt;\/)([^&]+)(&gt;)/g, 
      '<span class="text-blue-400">$1$2$3</span>');
    
    return highlighted;
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Page HTML Source</h2>
        <div className="relative bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
          {/* Action Buttons */}
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <button
              onClick={toggleExpand}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer"
            >
              {isExpanded ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                  Collapse
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  Expand
                </>
              )}
            </button>
            <button
              onClick={handleCopy}
              className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              {copied ? 'Copied!' : 'Copy HTML'}
            </button>
          </div>

          {/* Code Display */}
          <div 
            className={`p-6 overflow-x-auto transition-all duration-300 ${
              isExpanded ? 'max-h-none' : 'max-h-96 overflow-y-auto'
            }`}
          >
            <pre className="text-sm font-mono text-gray-100 whitespace-pre-wrap">
              <code dangerouslySetInnerHTML={{ __html: highlightHTML(html) }} />
            </pre>
          </div>
          
          {/* Expand/Collapse Overlay Gradient (when collapsed) */}
          {!isExpanded && (
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none" />
          )}
        </div>
      </div>

      {/* Note Banner */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> This is a simplified version of the HTML source. The actual page may contain additional scripts, styles, and dynamic content.
        </p>
      </div>
    </div>
  );
}

