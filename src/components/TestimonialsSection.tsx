import React from "react";

export default function TestimonialsSection() {
  const renderFiveStars = () => (
    <div className="flex items-center gap-1 text-amber-500 mb-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-4 h-4 fill-amber-400 text-amber-400" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-block text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-full uppercase tracking-wider">
            Aspirant Stories
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Success Stories That Inspire
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg border border-red-200 shadow-sm relative">
            {renderFiveStars()}
            <p className="text-sm text-gray-700 italic leading-relaxed">
              &ldquo;The difficulty level of tests on Your Exams Test was remarkably identical
              to what I encountered in my SSC CGL exam hall. The sectional timer and analytics
              were game-changers for my time management.&rdquo;
            </p>
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-sm">
                RS
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-900">Rahul Sharma</h4>
                <p className="text-xs text-red-600 font-semibold">
                  Selected: SSC CGL ASO (2025)
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-red-200 shadow-sm relative">
            {renderFiveStars()}
            <p className="text-sm text-gray-700 italic leading-relaxed">
              &ldquo;I tested several mock test series for Railway NTPC, but the explanations
              and bilingual question quality on this portal were unmatched. Real-time AIR
              drastically boosted my exam confidence.&rdquo;
            </p>
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-sm">
                AK
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-900">Amit Kumar Verma</h4>
                <p className="text-xs text-red-600 font-semibold">
                  Selected: RRB NTPC Station Master
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-red-200 shadow-sm relative">
            {renderFiveStars()}
            <p className="text-sm text-gray-700 italic leading-relaxed">
              &ldquo;In banking prelims, speed and accuracy decide everything. The sectional
              drills and mock speed tests helped me clear IBPS PO on my very first attempt!&rdquo;
            </p>
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-sm">
                PP
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-900">Priya Patel</h4>
                <p className="text-xs text-red-600 font-semibold">
                  Selected: IBPS PO (Scale-1)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
