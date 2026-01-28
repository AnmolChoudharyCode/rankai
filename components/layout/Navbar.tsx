'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import LoginModal from './LoginModal';

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const footerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Find footer element
    const footer = document.querySelector('footer');
    if (!footer) return;

    footerRef.current = footer;

    // Create Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // If footer is intersecting (visible in viewport), hide navbar
          setIsFooterVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of footer is visible
        rootMargin: '0px',
      }
    );

    observer.observe(footer);

    // Cleanup
    return () => {
      if (footer) {
        observer.unobserve(footer);
      }
    };
  }, [pathname]); // Re-run when route changes
  
  const navLinks = [
    { name: 'Dashboard', href: '/' },
    { name: 'URL Audit', href: '/url-audit' },
    // { name: 'Optimize Content', href: '/optimize-content' },
    // { name: 'Generate Content', href: '/generate-content' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 transition-transform duration-300 ${
        isFooterVisible ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo and Navigation Links */}
        <div className="flex items-center gap-4 sm:gap-4">
          {/* JM Financial Logo */}
          <Link href="/" className="flex items-center cursor-pointer">
            <Image
              src="/Image/rank-ai.png"
              alt="Rank AI"
              width={120}
              height={40}
              className="h-8 sm:h-10 w-auto object-contain"
              priority
              unoptimized
            />
          </Link>
          

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'text-[#272b8b] border-b-2 border-[#272b8b] pb-1'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Login Button and Mobile Menu Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Desktop Login Button */}
          {/* <button
            onClick={() => setIsLoginModalOpen(true)}
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#272b8b] text-white rounded-md hover:opacity-90 transition-opacity text-sm font-medium cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            Login
          </button> */}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 mt-3 pt-3 pb-3">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-2 text-sm font-medium transition-colors rounded-md ${
                    isActive
                      ? 'text-[#272b8b] bg-[#272b8b]/10'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            {/* Mobile Login Button */}
            {/* <button
              onClick={() => {
                setIsLoginModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-2 mt-2 border-t border-gray-200 pt-3 text-sm font-medium text-[#272b8b] hover:bg-gray-50 rounded-md transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Login
            </button> */}
          </div>
        </div>
      )}

      {/* Login Modal */}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </nav>
  );
}

