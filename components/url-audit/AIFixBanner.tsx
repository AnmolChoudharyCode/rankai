'use client';

export default function AIFixBanner() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-300 via-indigo-300 to-purple-400
 p-12 text-center shadow-xl">
      {/* Animated background gradient */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_20%,_white,_transparent_50%)]" />
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_70%_80%,_white,_transparent_50%)]" />
      
  
      
      {/* Main content */}
      <div className="relative z-10">
        {/* AI Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 rounded-full opacity-20" />
            <div className="relative bg-white/20 backdrop-blur-sm rounded-full p-4 border-2  animate-pulse">
              <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          </div>
        </div>
  
        {/* Title */}
        <h3 className="text-3xl font-extrabold text-white mb-3 tracking-wide italic">
          Coming Soon
        </h3>
        
      
        
      </div>
    </div>
  );
}

