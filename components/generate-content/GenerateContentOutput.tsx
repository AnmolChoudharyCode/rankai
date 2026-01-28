import OutputSection from '../optimize-content/OutputSection';

interface GenerateContentOutputProps {
  input: string;
  inputType: string;
  onBack: () => void;
}

export default function GenerateContentOutput({ input, inputType, onBack }: GenerateContentOutputProps) {
  // Mock data - will be replaced with backend data
  const outputData = {
    title: 'Complete Guide to Content Marketing Strategy | Example Blog',
    meta: 'Learn how to create an effective content marketing strategy with our comprehensive guide. Includes templates, examples, and best practices for 2025.',
    h1: 'Complete Guide to Content Marketing Strategy',
    h2: [
      'Understanding Content Marketing',
      'Creating Your Content Strategy',
      'Content Distribution Channels',
      'Measuring Content Performance',
    ],
    h3: [
      'Defining Your Target Audience',
      'Content Planning and Calendar',
      'SEO Optimization Techniques',
      'Social Media Integration',
    ],
    toc: `1. Understanding Content Marketing
2. Creating Your Content Strategy
   2.1 Defining Your Target Audience
   2.2 Content Planning and Calendar
3. Content Distribution Channels
   3.1 SEO Optimization Techniques
   3.2 Social Media Integration
4. Measuring Content Performance`,
    content: `Content marketing has become essential for businesses looking to establish a strong online presence and connect with their target audience. In this comprehensive guide, we'll explore the key strategies and best practices that can help you create a successful content marketing campaign.

Understanding Content Marketing

Content marketing is a strategic marketing approach focused on creating and distributing valuable, relevant, and consistent content to attract and retain a clearly defined audience. The goal is to drive profitable customer action.

Creating Your Content Strategy

A well-defined content strategy is the foundation of successful content marketing. It involves understanding your audience, defining your goals, and creating a plan for content creation and distribution.

Defining Your Target Audience

Before creating content, you need to understand who you're creating it for. This involves researching your audience's demographics, interests, pain points, and content preferences.

Content Planning and Calendar

A content calendar helps you plan and organize your content creation efforts. It ensures consistency and helps you align your content with your marketing goals and key dates.

Content Distribution Channels

Once you've created great content, you need to distribute it effectively across various channels to reach your target audience.

SEO Optimization Techniques

Search engine optimization is crucial for making your content discoverable. This includes keyword research, on-page optimization, and building quality backlinks.

Social Media Integration

Social media platforms provide excellent opportunities to distribute and promote your content, engage with your audience, and build your brand presence.

Measuring Content Performance

Tracking and analyzing your content's performance helps you understand what's working and what needs improvement. Key metrics include traffic, engagement, conversions, and ROI.`,
    faqs: `Q: What is content marketing?
A: Content marketing is a strategic marketing approach focused on creating and distributing valuable, relevant content to attract and retain a clearly defined audience.

Q: How do I create a content strategy?
A: Start by defining your target audience, setting clear goals, conducting keyword research, and creating a content calendar that aligns with your business objectives.

Q: What are the best content distribution channels?
A: The best channels depend on your audience and goals, but common channels include your website/blog, social media platforms, email newsletters, and industry publications.

Q: How do I measure content marketing success?
A: Key metrics include website traffic, engagement rates, lead generation, conversion rates, and return on investment (ROI).`,
    schema: `{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Complete Guide to Content Marketing Strategy",
  "description": "Learn how to create an effective content marketing strategy with our comprehensive guide.",
  "author": {
    "@type": "Organization",
    "name": "Example Blog"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Example Blog"
  },
  "datePublished": "2025-01-01",
  "dateModified": "2025-01-01"
}`,
  };

  const inputTypeLabels: Record<string, string> = {
    title: 'Title',
    keyword: 'Keyword',
    idea: 'Idea',
    topic: 'Topic',
    url: 'URL',
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Input
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Generated Content</h1>
        <p className="text-gray-600 mb-2">
          Content generated from your {inputTypeLabels[inputType]?.toLowerCase() || inputType}: <span className="font-semibold text-gray-900">"{input}"</span>
        </p>
        <p className="text-sm text-gray-500">
          Review and copy each section as needed.
        </p>
      </div>

      {/* Title */}
      <OutputSection
        title="Title"
        content={outputData.title}
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        }
      />

      {/* Meta Description */}
      <OutputSection
        title="Meta Description"
        content={outputData.meta}
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        }
      />

      {/* H1 */}
      <OutputSection
        title="H1"
        content={outputData.h1}
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19V5h14v14H5z" />
          </svg>
        }
      />

      {/* Table of Contents */}
      <OutputSection
        title="Table of Contents (TOC)"
        content={outputData.toc}
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        }
      />

      {/* H2 Headings */}
      <OutputSection
        title="H2 Headings"
        content={outputData.h2.join('\n')}
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19V5h14v14H5z" />
          </svg>
        }
      />

      {/* H3 Headings */}
      <OutputSection
        title="H3 Headings"
        content={outputData.h3.join('\n')}
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19V5h14v14H5z" />
          </svg>
        }
      />

      {/* Content */}
      <OutputSection
        title="Content"
        content={outputData.content}
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        }
      />

      {/* FAQs */}
      <OutputSection
        title="FAQs"
        content={outputData.faqs}
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
      />

      {/* Schema Markup */}
      <OutputSection
        title="Schema Markup"
        content={outputData.schema}
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        }
      />
    </div>
  );
}

