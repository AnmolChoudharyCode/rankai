'use client';

import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

export default function WelcomeSection() {
  const [animationData, setAnimationData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load the Lottie JSON file
    const loadAnimation = async () => {
      try {
        const response = await fetch('/Lottie/graph.json');
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
    <div className="mb-6 sm:mb-8">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
        {/* Welcome Text */}
        <div className="text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Welcome to JM Rank AI Marketing Suite
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Internal tool for optimizing content and improving SEO & GEO performance across the organization.
          </p>
        </div>

        {/* Lottie Animation */}
        <div className="flex justify-center items-center">
          <div className="w-full max-w-sm" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {isLoading ? (
              <div className="text-gray-400 animate-pulse">Loading animation...</div>
            ) : animationData ? (
              <Lottie
                animationData={animationData}
                loop={true}
                autoplay={true}
                style={{ width: '100%', height: '100%' }}
              />
            ) : (
              <div className="text-gray-400">Animation not available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

