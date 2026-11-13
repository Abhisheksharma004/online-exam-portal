"use client";

import React, { useState } from "react";
import Image from "next/image";

interface LiveCbtDemoProps {
  onOpenFullTest: () => void;
}

export default function LiveCbtDemo({ onOpenFullTest }: LiveCbtDemoProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [paletteStatus, setPaletteStatus] = useState<string>("Not Answered");

  const sampleQuestion = {
    question:
      "Under which Article of the Indian Constitution is the provision for a 'Uniform Civil Code' (UCC) mentioned under the Directive Principles of State Policy?",
    options: [
      "Article 40 (Gram Panchayats)",
      "Article 44 (Uniform Civil Code)",
      "Article 48 (Agriculture and Animal Husbandry)",
      "Article 50 (Separation of Judiciary from Executive)",
    ],
    correctAnswer: 1, // Option B
    explanation:
      "The correct answer is 'Article 44'. Contained within Part IV (Directive Principles of State Policy) of the Constitution of India, Article 44 mandates that the State shall endeavour to secure for the citizens a Uniform Civil Code throughout the territory of India.",
  };

  const handleSelectOption = (index: number) => {
    setSelectedAnswer(index);
    setPaletteStatus("Answered");
  };

  const handleCheckAnswer = () => {
    setShowExplanation(true);
  };

  const handleResetSample = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    setPaletteStatus("Not Answered");
  };

  return (
    <section id="live-cbt" className="scroll-mt-24 py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-block text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-full uppercase tracking-wider">
            Live Exam Simulation
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Authentic Computer-Based Test (CBT) Experience
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Practice with this interactive sample question to experience how seamless,
            precise, and exam-like testing is on &apos;Your Exams Test&apos; portal.
          </p>
        </div>

        {/* Interactive CBT Window Frame */}
        <div className="mt-10 max-w-5xl mx-auto bg-white rounded-xl border-2 border-red-600 shadow-xl overflow-hidden">
          {/* CBT Header Bar */}
          <div className="bg-red-600 text-white px-4 py-3 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded bg-white p-0.5 flex items-center justify-center shrink-0 shadow-xs">
                <Image
                  src="/logo.png"
                  alt="Your Exams Test Logo"
                  width={22}
                  height={22}
                  className="w-5 h-5 object-contain"
                />
              </div>
              <span className="font-black text-sm sm:text-base">
                Your Exams Test - CBT Simulator
              </span>
              <span className="bg-red-700 text-xs px-2 py-0.5 rounded font-mono font-bold">
                Section: General Studies
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white text-red-600 px-3 py-1 rounded-md font-mono font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-inner">
                <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Time Left: 58:42</span>
              </div>
            </div>
          </div>

          {/* CBT Body */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px]">
            {/* Question Area (8 cols) */}
            <div className="lg:col-span-8 p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-gray-200">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <span className="text-sm font-bold text-red-600">
                    Question No. 1
                  </span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded font-medium">
                    +2.0 Marks | -0.50 Negative
                  </span>
                </div>

                {/* Question Text */}
                <p className="text-base sm:text-lg font-semibold text-gray-900 leading-relaxed">
                  {sampleQuestion.question}
                </p>

                {/* Options */}
                <div className="space-y-2.5 pt-2">
                  {sampleQuestion.options.map((opt, idx) => {
                    const isSelected = selectedAnswer === idx;
                    let optionClasses =
                      "border-gray-200 hover:border-red-400 hover:bg-red-50/30 text-gray-800";

                    if (isSelected) {
                      optionClasses = "border-red-600 bg-red-50 text-red-900 font-bold";
                    }
                    if (showExplanation) {
                      if (idx === sampleQuestion.correctAnswer) {
                        optionClasses =
                          "border-emerald-600 bg-emerald-50 text-emerald-900 font-bold";
                      } else if (isSelected) {
                        optionClasses =
                          "border-red-600 bg-red-100 text-red-900 font-bold line-through";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(idx)}
                        className={`w-full text-left p-3 rounded-lg border-2 transition flex items-center gap-3 cursor-pointer ${optionClasses}`}
                      >
                        <span
                          className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold shrink-0 ${
                            isSelected
                              ? "bg-red-600 text-white"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="text-sm sm:text-base">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Section */}
                {showExplanation && (
                  <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs sm:text-sm text-emerald-900 space-y-1">
                    <div className="font-bold flex items-center gap-1.5 text-emerald-800">
                      <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Correct Solution &amp; Explanation:</span>
                    </div>
                    <p>{sampleQuestion.explanation}</p>
                  </div>
                )}
              </div>

              {/* Bottom Action Buttons */}
              <div className="pt-5 border-t border-gray-100 flex flex-wrap gap-2 justify-between items-center">
                <div className="flex gap-2">
                  <button
                    onClick={handleResetSample}
                    className="px-3 py-1.5 text-xs font-semibold text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
                  >
                    Clear Response
                  </button>
                  <button
                    onClick={() => setPaletteStatus("Marked for Review")}
                    className="px-3 py-1.5 text-xs font-semibold text-purple-700 bg-purple-50 border border-purple-200 rounded-md hover:bg-purple-100 cursor-pointer"
                  >
                    Mark for Review
                  </button>
                </div>

                <div className="flex gap-2">
                  {!showExplanation ? (
                    <button
                      onClick={handleCheckAnswer}
                      disabled={selectedAnswer === null}
                      className={`px-4 py-2 text-xs sm:text-sm font-bold text-white rounded-md transition shadow-xs ${
                        selectedAnswer !== null
                          ? "bg-red-600 hover:bg-red-700 cursor-pointer"
                          : "bg-gray-300 cursor-not-allowed"
                      }`}
                    >
                      Check Answer
                    </button>
                  ) : (
                    <button
                      onClick={handleResetSample}
                      className="px-4 py-2 text-xs sm:text-sm font-bold bg-gray-800 text-white rounded-md hover:bg-gray-900 cursor-pointer"
                    >
                      Try Again
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Question Palette Sidebar (4 cols) */}
            <div className="lg:col-span-4 p-5 bg-gray-50 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="pb-3 border-b border-gray-200">
                  <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                    Question Palette
                  </span>
                  <span className="text-xs text-gray-500">
                    Status:{" "}
                    <strong
                      className={
                        paletteStatus === "Answered"
                          ? "text-emerald-600"
                          : paletteStatus === "Marked for Review"
                          ? "text-purple-600"
                          : "text-red-600"
                      }
                    >
                      {paletteStatus}
                    </strong>
                  </span>
                </div>

                {/* Palette Color Legend */}
                <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded bg-emerald-600 text-white font-bold flex items-center justify-center text-[10px]">
                      1
                    </span>
                    <span>Answered</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded bg-red-600 text-white font-bold flex items-center justify-center text-[10px]">
                      0
                    </span>
                    <span>Not Answered</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded bg-purple-600 text-white font-bold flex items-center justify-center text-[10px]">
                      0
                    </span>
                    <span>Review</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded bg-gray-300 text-gray-700 font-bold flex items-center justify-center text-[10px]">
                      99
                    </span>
                    <span>Not Visited</span>
                  </div>
                </div>

                {/* Sample Grid of Question Numbers */}
                <div className="pt-2">
                  <span className="text-xs font-bold text-gray-600 block mb-2">
                    Question Grid (1 - 25):
                  </span>
                  <div className="grid grid-cols-5 gap-1.5">
                    <button
                      className={`h-8 rounded text-xs font-bold text-white flex items-center justify-center shadow-sm ${
                        paletteStatus === "Answered"
                          ? "bg-emerald-600"
                          : paletteStatus === "Marked for Review"
                          ? "bg-purple-600"
                          : "bg-red-600"
                      }`}
                    >
                      01
                    </button>
                    {Array.from({ length: 19 }, (_, i) => (
                      <button
                        key={i + 2}
                        onClick={onOpenFullTest}
                        className="h-8 rounded text-xs font-bold bg-white text-gray-700 border border-gray-300 hover:border-red-400 flex items-center justify-center cursor-pointer"
                      >
                        {(i + 2).toString().padStart(2, "0")}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-200">
                <button
                  onClick={onOpenFullTest}
                  className="w-full py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-md shadow-xs transition cursor-pointer"
                >
                  Open Full 100 Qs Mock Test &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
