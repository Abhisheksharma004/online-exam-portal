"use client";

import React from "react";
import { MockTest } from "@/types/exam";

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  onSearchSubmit: () => void;
  onExploreTestsClick: () => void;
  onStartFeaturedTest: (test: MockTest) => void;
  featuredTest: MockTest;
}

export default function HeroSection({
  searchQuery,
  setSearchQuery,
  onSearchSubmit,
  onExploreTestsClick,
  onStartFeaturedTest,
  featuredTest,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-red-50/70 via-white to-white py-12 sm:py-20 border-b border-red-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & CTA */}
          <div className="lg:col-span-7 space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs sm:text-sm font-semibold bg-red-100 text-red-700 border border-red-200">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
              <span>#1 Ranked Online Exam Practice &amp; Mock Test Portal</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black text-gray-900 tracking-tight leading-[1.18]">
              Accelerate Your Exam Preparation with{" "}
              <span className="text-red-600 underline decoration-red-300 decoration-wavy decoration-2">
                Your Exams Test
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl">
              Authentic Computer-Based Test (CBT) interface for SSC, Railway, Banking, Teaching,
              and Defense exams. Get instant All India Rank (AIR), detailed step-by-step solutions,
              and comprehensive subject-wise performance analysis.
            </p>

            {/* Search Box */}
            <div className="bg-white p-2 rounded-lg border-2 border-red-200 shadow-md shadow-red-100/60 flex flex-col sm:flex-row gap-2 max-w-xl">
              <div className="relative flex-1 flex items-center pl-3">
                <svg
                  className="w-5 h-5 text-gray-400 mr-2 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && onSearchSubmit()}
                  placeholder="Search exam or mock test (e.g., SSC CGL, RRB NTPC...)"
                  className="w-full text-sm bg-transparent outline-none placeholder:text-gray-400 text-gray-900 font-medium"
                />
              </div>
              <button
                onClick={onSearchSubmit}
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2.5 rounded-md text-sm transition cursor-pointer flex items-center justify-center gap-1 shrink-0"
              >
                <span>Search</span>
              </button>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={onExploreTestsClick}
                className="px-5 py-3 rounded-md font-bold text-white bg-red-600 hover:bg-red-700 shadow-sm shadow-red-200 transition cursor-pointer flex items-center gap-2"
              >
                <span>Explore Free Mock Tests</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
              <a
                href="#live-cbt"
                className="px-5 py-3 rounded-md font-bold text-red-600 bg-white hover:bg-red-50 border border-red-600 transition flex items-center gap-2"
              >
                <span>Try Live CBT Interface</span>
              </a>
            </div>

            {/* Key Trust Highlights */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-red-100 max-w-lg">
              <div>
                <div className="text-xl sm:text-2xl font-black text-red-600">
                  100%
                </div>
                <div className="text-xs text-gray-600 font-medium">
                  Latest NTA / TCS Pattern
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-red-600">
                  Bilingual
                </div>
                <div className="text-xs text-gray-600 font-medium">
                  English &amp; Hindi Available
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-red-600">
                  Instant AIR
                </div>
                <div className="text-xs text-gray-600 font-medium">
                  Real-time All India Rank
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Live Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-xl border border-red-200 shadow-lg shadow-red-100/50 p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>

              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
                  </span>
                  <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                    Today&apos;s Featured Test
                  </span>
                </div>
                <span className="text-xs font-bold bg-red-50 text-red-700 px-2 py-0.5 rounded border border-red-200">
                  100% FREE
                </span>
              </div>

              <div className="mt-4 space-y-4">
                <h3 className="text-lg font-bold text-gray-900 leading-snug">
                  {featuredTest.title}
                </h3>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-red-50/70 p-2.5 rounded-md border border-red-100">
                    <span className="text-gray-500 block">Total Questions</span>
                    <span className="text-sm font-black text-gray-900">
                      {featuredTest.questions} Multiple Choice Qs
                    </span>
                  </div>
                  <div className="bg-red-50/70 p-2.5 rounded-md border border-red-100">
                    <span className="text-gray-500 block">Duration</span>
                    <span className="text-sm font-black text-gray-900">
                      {featuredTest.durationMinutes} Minutes
                    </span>
                  </div>
                  <div className="bg-red-50/70 p-2.5 rounded-md border border-red-100">
                    <span className="text-gray-500 block">Max Marks</span>
                    <span className="text-sm font-black text-gray-900">
                      {featuredTest.totalMarks} Marks
                    </span>
                  </div>
                  <div className="bg-red-50/70 p-2.5 rounded-md border border-red-100">
                    <span className="text-gray-500 block">Active Candidates</span>
                    <span className="text-sm font-black text-red-600 flex items-center gap-1.5 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                      <span>{featuredTest.participants.toLocaleString()} Online</span>
                    </span>
                  </div>
                </div>

                {/* Section Breakdown */}
                <div className="text-xs space-y-1.5 pt-1">
                  <span className="font-bold text-gray-700">Sections Covered:</span>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-medium">
                      Reasoning (25)
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-medium">
                      General Awareness (25)
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-medium">
                      Quantitative Aptitude (25)
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-medium">
                      English (25)
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onStartFeaturedTest(featuredTest)}
                  className="w-full mt-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-md transition shadow-sm shadow-red-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Start Test Now</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>

                <p className="text-[11px] text-center text-gray-500">
                  No credit card required. Start practicing in one click.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
