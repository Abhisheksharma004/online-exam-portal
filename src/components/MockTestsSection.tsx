"use client";

import React from "react";
import { MockTest } from "@/types/exam";
import MockTestCard from "./MockTestCard";

interface MockTestsSectionProps {
  tests: MockTest[];
  selectedCategory: string;
  searchQuery: string;
  onSelectCategory: (cat: string) => void;
  onResetFilters: () => void;
  onStartTest: (test: MockTest) => void;
}

export default function MockTestsSection({
  tests,
  selectedCategory,
  searchQuery,
  onSelectCategory,
  onResetFilters,
  onStartTest,
}: MockTestsSectionProps) {
  return (
    <section id="mock-tests" className="scroll-mt-24 py-16 bg-red-50/40 border-t border-red-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-red-200">
          <div>
            <div className="inline-block text-xs font-bold text-red-600 bg-white border border-red-200 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              Mock Test Series
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
              Available Mock Tests ({tests.length})
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Active Category: <strong className="text-red-600">{selectedCategory}</strong>
              {searchQuery && (
                <span>
                  {" "}
                  | Search Filter: <span className="underline">{searchQuery}</span>
                </span>
              )}
            </p>
          </div>

          {/* Quick Filter Pill Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            {["ALL", "SSC", "Railway", "Banking", "Teaching"].map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`text-xs font-bold px-3 py-1.5 rounded-md border transition cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-red-600 text-white border-red-600 shadow-xs"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {cat === "ALL" ? "All Exams" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Test Cards Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests.map((test) => (
            <MockTestCard key={test.id} test={test} onStartTest={onStartTest} />
          ))}
        </div>

        {tests.length === 0 && (
          <div className="text-center py-16 bg-white rounded-lg border border-red-200">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-800">No Tests Found</h3>
            <p className="text-sm text-gray-500 mt-1">
              Please try searching with another keyword or change your category filter.
            </p>
            <button
              onClick={onResetFilters}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md text-sm font-bold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
