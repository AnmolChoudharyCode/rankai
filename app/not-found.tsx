'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

export default function NotFound() {
  const [animationData, setAnimationData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load the Lottie JSON file
    const loadAnimation = async () => {
      try {
        const response = await fetch('/Lottie/error-page-404.json');
        if (!response.ok) {
          throw new Error('Failed to load animation');
        }
        const data = await response.json();
        setAnimationData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading Lottie animation:', error);
        setIsLoading(false);
      }
    };

    loadAnimation();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Lottie Animation */}
          <div className="flex justify-center md:justify-end">
            <div className="w-full max-w-md" style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {isLoading ? (
                <div className="text-gray-400 animate-pulse">Loading animation...</div>
              ) : animationData ? (
                <Lottie
                  animationData={animationData}
                  loop={true}
                  autoplay={true}
                  style={{ width: '100%', height: '100%', maxWidth: '400px', maxHeight: '400px' }}
                />
              ) : (
                <div className="text-gray-400">Animation not available</div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 justify-center items-center md:items-start text-center md:text-left">
            <div className="mb-4">
              {/* <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1> */}
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">
                Page Not Found
              </h2>
              <p className="text-gray-600 text-lg">
                Sorry, we couldn't find the page you're looking for.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                href="/"
                className="px-6 py-3 bg-[#272b8b] text-white rounded-md font-medium hover:bg-[#272b8b]/80 transition-colors text-center"
              >
                Go to Homepage
              </Link>
              <button
                onClick={() => window.history.back()}
                className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-md font-medium hover:bg-gray-50 transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

