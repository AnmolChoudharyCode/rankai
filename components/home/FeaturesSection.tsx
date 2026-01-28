'use client';

import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

export default function FeaturesSection() {
  const [animationData, setAnimationData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load the Lottie JSON file
    const loadAnimation = async () => {
      try {
        const response = await fetch('/Lottie/cycle-boy.json');
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
  const features = [
    {
      icon: (
        <svg className="w-8 h-8 text-[#272b8b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'AI-Powered Analysis',
      description: 'Leverage advanced artificial intelligence to analyze our content and get actionable insights instantly.',
    },
    {
      icon: (
        <svg className="w-8 h-8 text-[#272b8b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Real-Time Optimization',
      description: 'Get instant recommendations and optimize our content on the fly for better SEO performance.',
    },
    {
      icon: (
        <svg className="w-8 h-8 text-[#272b8b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Comprehensive Reports',
      description: 'Access detailed analytics and reports to track our content performance and SEO improvements.',
    },
    {
      icon: (
        <svg className="w-8 h-8 text-[#272b8b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: 'Secure & Reliable',
      description: 'Our data is protected with enterprise-grade security and 99.9% uptime guarantee.',
    },
    {
      icon: (
        <svg className="w-8 h-8 text-[#272b8b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Team Collaboration',
      description: 'Work seamlessly with our JM Financial colleagues and share insights across.',
    },
    {
      icon: (
        <svg className="w-8 h-8 text-[#272b8b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'GEO Support',
      description: 'Optimize for any Gen AI Engine with our advanced GEO targeting capabilities.',
    },
  ];

  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 mb-8 sm:mb-12">
        {/* Text Content - Left Side */}
        <div className="flex-1 text-center lg:text-left lg:pl-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            Powerful Features for Our Team
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            Everything our team needs to create, optimize, and analyze content that ranks higher and performs better.
          </p>
        </div>

        {/* Lottie Animation - Right Side */}
        <div className="flex-1 flex justify-center items-center">
          <div className="w-full max-w-md" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

