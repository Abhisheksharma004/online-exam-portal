import React from "react";

export default function StatsBar() {
  return (
    <section className="bg-red-600 text-white py-8 border-y border-red-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-black">500+</div>
            <div className="text-xs sm:text-sm font-medium text-red-100">
              Government Exams Covered
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-black">10,000+</div>
            <div className="text-xs sm:text-sm font-medium text-red-100">
              Mock Tests &amp; Quizzes
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-black">2,50,000+</div>
            <div className="text-xs sm:text-sm font-medium text-red-100">
              Registered Aspirants
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-black">99.4%</div>
            <div className="text-xs sm:text-sm font-medium text-red-100">
              Real Exam Pattern Accuracy
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
