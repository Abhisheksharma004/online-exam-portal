"use client";

import React from "react";
import { MockTest } from "@/types/exam";

interface MockTestCardProps {
  test: MockTest;
  onStartTest: (test: MockTest) => void;
}

export default function MockTestCard({ test, onStartTest }: MockTestCardProps) {
  return (
    <div className="bg-white rounded-lg border border-red-200 hover:border-red-500 shadow-sm hover:shadow-md hover:shadow-red-100/50 transition-all p-5 flex flex-col justify-between group">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded">
            {test.examName}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded flex items-center gap-1">
              <svg className="w-3 h-3 text-amber-500 fill-amber-500" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>{test.rating}</span>
            </span>
            {test.isFree ? (
              <span className="text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded">
                FREE
              </span>
            ) : (
              <span className="text-[11px] font-bold bg-red-600 text-white px-2 py-0.5 rounded">
                PRO
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-gray-900 text-base leading-snug group-hover:text-red-600 transition">
          {test.title}
        </h3>

        {/* Test Specs Grid */}
        <div className="grid grid-cols-3 gap-2 mt-4 text-center text-xs py-2.5 bg-gray-50 rounded-md border border-gray-100">
          <div>
            <span className="text-gray-400 block text-[10px]">Questions</span>
            <span className="font-bold text-gray-800">{test.questions} Qs</span>
          </div>
          <div className="border-x border-gray-200">
            <span className="text-gray-400 block text-[10px]">Duration</span>
            <span className="font-bold text-gray-800">{test.durationMinutes} Mins</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[10px]">Total Marks</span>
            <span className="font-bold text-gray-800">{test.totalMarks} Marks</span>
          </div>
        </div>

        {/* Additional Info */}
        <div className="flex items-center justify-between text-xs text-gray-500 mt-4">
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
            <span>{test.languages.join(" / ")}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span>{test.participants.toLocaleString()} Candidates</span>
          </span>
        </div>
      </div>

      {/* Card Button */}
      <div className="mt-5 pt-4 border-t border-gray-100">
        <button
          onClick={() => onStartTest(test)}
          className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-md transition text-sm flex items-center justify-center gap-1.5 shadow-xs shadow-red-200 cursor-pointer"
        >
          <span>Start Test</span>
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
