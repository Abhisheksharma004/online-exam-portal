"use client";

import React from "react";

interface CtaBannerProps {
  onStartFreeClick: () => void;
  onLoginClick?: () => void;
}

export default function CtaBanner({ onStartFreeClick, onLoginClick }: CtaBannerProps) {
  return (
    <section className="bg-red-600 text-white py-16 px-4">
      <div className="max-w-5xl mx-auto text-center space-y-6">
        <span className="bg-white text-red-600 text-xs uppercase font-extrabold px-3 py-1 rounded-full shadow">
          Don&apos;t Wait
        </span>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
          Ready to Ace Your Next Competitive Exam?
        </h2>
        <p className="text-red-100 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Take your first free mock test today on &apos;Your Exams Test&apos; and evaluate your
          strengths, weaknesses, and All India Rank.
        </p>
        <div className="pt-2 flex flex-wrap justify-center gap-4">
          <button
            onClick={onStartFreeClick}
            className="px-8 py-3.5 bg-white text-red-600 font-black rounded-lg text-base hover:bg-red-50 shadow-xl transition cursor-pointer"
          >
            Start Free Mock Test
          </button>
          <button
            onClick={onLoginClick}
            className="px-8 py-3.5 bg-red-700 text-white font-bold rounded-lg text-base hover:bg-red-800 border-2 border-white/50 transition cursor-pointer"
          >
            Student Login
          </button>
        </div>
      </div>
    </section>
  );
}
