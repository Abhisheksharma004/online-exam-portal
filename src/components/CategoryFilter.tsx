"use client";

import React from "react";
import { ExamCategory } from "@/types/exam";

interface CategoryFilterProps {
  categories: ExamCategory[];
  selectedCategory: string;
  onSelectCategory: (catId: string) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  // Render clean SVG icon for each category
  const renderCategoryIcon = (id: string, isSelected: boolean) => {
    const strokeClass = isSelected ? "text-white" : "text-red-600";
    switch (id) {
      case "SSC":
        return (
          <svg className={`w-7 h-7 ${strokeClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        );
      case "Railway":
        return (
          <svg className={`w-7 h-7 ${strokeClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case "Banking":
        return (
          <svg className={`w-7 h-7 ${strokeClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
          </svg>
        );
      case "Teaching":
        return (
          <svg className={`w-7 h-7 ${strokeClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case "Defense":
        return (
          <svg className={`w-7 h-7 ${strokeClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      default: // ALL
        return (
          <svg className={`w-7 h-7 ${strokeClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        );
    }
  };

  return (
    <section id="categories" className="scroll-mt-24 py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-block text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-full uppercase tracking-wider">
            Exam Categories
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Choose Your Target Exam Category
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Select an exam category to filter live mock tests, sectional speed tests,
            and previous years papers tailored to your syllabus.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`p-3.5 rounded-lg text-center border-2 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer ${
                  isSelected
                    ? "bg-red-600 text-white border-red-600 shadow-md shadow-red-200 scale-102"
                    : "bg-white text-gray-800 border-red-100 hover:border-red-400 hover:bg-red-50/50"
                }`}
              >
                <div className="w-9 h-9 rounded-md flex items-center justify-center">
                  {renderCategoryIcon(cat.id, isSelected)}
                </div>
                <span className="font-bold text-sm leading-snug">{cat.name}</span>
                <span
                  className={`text-[11px] font-medium px-2 py-0.5 rounded ${
                    isSelected
                      ? "bg-red-700 text-white"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
