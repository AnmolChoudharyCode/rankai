export default function SEOTipsSidebar() {
  const tips = [
    'Focus on long-tail keywords with lower competition',
    'Optimize meta descriptions to improve click-through rates',
    'Use header tags (H1, H2, H3) to structure your content',
    'Include internal links to improve site navigation',
    'Ensure your content provides unique value to readers',
    'Optimize images with descriptive alt text',
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <svg className="w-5 h-5 text-yellow-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
        </svg>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Tips for Better SEO</h2>
      </div>
      <p className="text-sm text-gray-600 mb-4 sm:mb-6">
        Follow these best practices to improve your content's search engine performance.
      </p>
      <ul className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
        {tips.map((tip, index) => (
          <li key={index} className="flex items-start gap-2 sm:gap-3">
            <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm text-gray-700">{tip}</span>
          </li>
        ))}
      </ul>
      {/* <button className="w-full bg-[#272b8b] hover:bg-[#272b8b]/80 text-white font-medium py-2.5 px-4 rounded-md transition-colors text-sm cursor-pointer">
        Learn More
      </button> */}
    </div>
  );
}

