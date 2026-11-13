import React from "react";

export default function FeaturesSection() {
  return (
    <section id="features" className="scroll-mt-24 py-16 bg-red-50/50 border-y border-red-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-block text-xs font-bold text-red-600 bg-white border border-red-200 px-3 py-1 rounded uppercase tracking-wider">
            Why Choose Us
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Why Hundreds of Thousands of Aspirants Choose &apos;Your Exams Test&apos;
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            We don&apos;t just provide practice questions — we condition your mind for real exam-hall
            pressure, accuracy, and speed management.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-5 rounded-lg border border-red-200 hover:shadow-md transition">
            <div className="w-10 h-10 rounded-md bg-red-100 text-red-600 flex items-center justify-center mb-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 text-base mb-1.5">
              Authentic NTA / TCS CBT Interface
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Exact countdown timers, color-coded question palette, and layout identical
              to official exam halls.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg border border-red-200 hover:shadow-md transition">
            <div className="w-10 h-10 rounded-md bg-red-100 text-red-600 flex items-center justify-center mb-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 text-base mb-1.5">
              Instant All India Rank &amp; Percentile
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Know your real standing among thousands of candidates with precision
              percentile rankings.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg border border-red-200 hover:shadow-md transition">
            <div className="w-10 h-10 rounded-md bg-red-100 text-red-600 flex items-center justify-center mb-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 text-base mb-1.5">
              In-Depth Step-by-Step Solutions
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Every question includes clear concept breakdown, shortcuts, and tricks in both
              English and Hindi.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg border border-red-200 hover:shadow-md transition">
            <div className="w-10 h-10 rounded-md bg-red-100 text-red-600 flex items-center justify-center mb-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 text-base mb-1.5">
              Mobile &amp; Laptop Optimized
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Lag-free, responsive experience across any smartphone, tablet, or PC anytime,
              anywhere.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
