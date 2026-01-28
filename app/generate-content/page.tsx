'use client';

import { useState } from 'react';
import GenerateContentInput from '@/components/generate-content/GenerateContentInput';
import GenerateContentOutput from '@/components/generate-content/GenerateContentOutput';

export default function GenerateContentPage() {
  const [showOutput, setShowOutput] = useState(false);
  const [input, setInput] = useState('');
  const [inputType, setInputType] = useState('');

  const handleProceed = (content: string, type: string) => {
    setInput(content);
    setInputType(type);
    setShowOutput(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {!showOutput ? (
          <GenerateContentInput onProceed={handleProceed} />
        ) : (
          <GenerateContentOutput 
            input={input}
            inputType={inputType}
            onBack={() => setShowOutput(false)}
          />
        )}
      </main>
    </div>
  );
}

