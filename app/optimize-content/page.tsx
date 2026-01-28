'use client';

import { useState } from 'react';
import OptimizeContentInput from '@/components/optimize-content/OptimizeContentInput';
import OptimizeContentOutput from '@/components/optimize-content/OptimizeContentOutput';
import { optimizeContent, type OptimizeContentResponse } from '@/lib/api';
import { getUserId } from '@/lib/user';

export default function OptimizeContentPage() {
  const [showOutput, setShowOutput] = useState(false);
  const [originalContent, setOriginalContent] = useState('');
  const [optimizedData, setOptimizedData] = useState<OptimizeContentResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleProceed = async (content: string) => {
    setOriginalContent(content);
    setIsLoading(true);
    setError(null);

    try {
      const userId = getUserId();
      const response = await optimizeContent({
        user: userId,
        content: content,
      });
      setOptimizedData(response);
      setShowOutput(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to optimize content. Please try again.');
      console.error('Error optimizing content:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {!showOutput ? (
          <OptimizeContentInput 
            onProceed={handleProceed}
            isLoading={isLoading}
            error={error}
          />
        ) : (
          <OptimizeContentOutput 
            originalContent={originalContent}
            optimizedData={optimizedData}
            onBack={() => {
              setShowOutput(false);
              setOptimizedData(null);
              setError(null);
            }}
          />
        )}
      </main>
    </div>
  );
}

