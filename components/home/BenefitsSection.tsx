export default function BenefitsSection() {
  const benefits = [
    {
      number: '10x',
      title: 'Faster Content Creation',
      description: 'Generate SEO-optimized content in minutes instead of hours.',
    },
    {
      number: '85%',
      title: 'Higher Rankings',
      description: 'Improve our search engine rankings with AI-powered optimization.',
    },
    {
      number: '50%',
      title: 'Time Saved',
      description: 'Automate content analysis and optimization to focus on what matters.',
    },
    {
      number: '24/7',
      title: 'Always Available',
      description: 'Access our internal content tools anytime, anywhere within the organization.',
    },
  ];

  return (
    <div className="mb-12 sm:mb-16">
      <div className="bg-white rounded-lg border border-gray-200 p-8 sm:p-12">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            Why Use Our Internal AI Marketing Suite?
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Empowering JM Financial teams with AI-powered tools to enhance content quality and SEO performance across the organization.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-[#272b8b] mb-2">{benefit.number}</div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-sm sm:text-base text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

