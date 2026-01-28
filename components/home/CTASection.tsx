import Link from 'next/link';

export default function CTASection() {
  return (
    <div className="mb-12 sm:mb-16">
      <div className="bg-white rounded-lg border-2 border-[#272b8b] p-8 sm:p-12 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Start using our internal AI-powered tools today and enhance our team's content quality and SEO performance.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/url-audit"
            className="px-6 py-3 bg-[#272b8b] text-white rounded-md font-medium hover:opacity-90 transition-opacity text-sm sm:text-base cursor-pointer"
          >
            Start Analyzing
          </Link>
          <Link
            href="/"
            className="px-6 py-3 bg-white border-2 border-[#272b8b] text-[#272b8b] rounded-md font-medium hover:bg-[#272b8b]/10 transition-colors text-sm sm:text-base cursor-pointer"
          >
            View Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

