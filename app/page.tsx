import Dashboard from './dashboard/page';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* <WelcomeSection />
        <QuickActionsSection />
        <FeaturesSection />
        <BenefitsSection />
        <HowItWorksSection />
        <CTASection /> */}
        <Dashboard/>
      </main>
    </div>
  );
}
