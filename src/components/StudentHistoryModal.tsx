"use client";

import React from "react";

interface AttemptRecord {
  id: string;
  testTitle: string;
  category: string;
  score: string;
  maxScore: string;
  accuracy: string;
  rank: string;
  totalParticipants: string;
  date: string;
}

interface StudentHistoryModalProps {
  studentName: string;
  isOpen: boolean;
  onClose: () => void;
  onExploreTests: () => void;
}

export default function StudentHistoryModal({
  studentName,
  isOpen,
  onClose,
  onExploreTests,
}: StudentHistoryModalProps) {
  if (!isOpen) return null;

  const mockAttempts: AttemptRecord[] = [
    {
      id: "attempt-1",
      testTitle: "SSC CGL 2026 Tier-1 : Full Length Mock Test 01",
      category: "SSC CGL",
      score: "172",
      maxScore: "200",
      accuracy: "91%",
      rank: "#86",
      totalParticipants: "14,820",
      date: "Yesterday at 4:30 PM",
    },
    {
      id: "attempt-2",
      testTitle: "RRB NTPC CBT-1 : All India Live Mega Mock",
      category: "RRB NTPC",
      score: "88",
      maxScore: "100",
      accuracy: "93%",
      rank: "#42",
      totalParticipants: "18,920",
      date: "3 days ago",
    },
    {
      id: "attempt-3",
      testTitle: "SSC CHSL 10+2 Tier-1 : Speed Drill Mock Test",
      category: "SSC CHSL",
      score: "154",
      maxScore: "200",
      accuracy: "84%",
      rank: "#210",
      totalParticipants: "11,250",
      date: "5 days ago",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-2xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl border border-gray-200 max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-800 text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/15 border border-white/20 flex items-center justify-center text-white font-black text-sm uppercase">
              {studentName.charAt(0)}
            </div>
            <div>
              <h3 className="text-base font-black tracking-tight">{studentName}&apos;s Test History</h3>
              <p className="text-[11px] text-red-100">Performance Analytics &amp; All India Rank Log</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition cursor-pointer text-sm"
          >
            ✕
          </button>
        </div>

        {/* Overview Stats Strip */}
        <div className="bg-red-50/60 border-b border-red-100 px-6 py-4 grid grid-cols-3 gap-3 text-center shrink-0">
          <div className="bg-white p-2.5 rounded-lg border border-red-100">
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Tests Taken</div>
            <div className="text-xl font-black text-gray-900 mt-0.5">3 Completed</div>
          </div>
          <div className="bg-white p-2.5 rounded-lg border border-red-100">
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Average Accuracy</div>
            <div className="text-xl font-black text-emerald-600 mt-0.5">89.3%</div>
          </div>
          <div className="bg-white p-2.5 rounded-lg border border-red-100">
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Best AIR Rank</div>
            <div className="text-xl font-black text-red-600 mt-0.5">#42</div>
          </div>
        </div>

        {/* Attempts List */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Recent Examination Attempts</h4>
            <span className="text-[11px] font-semibold text-gray-400">Showing last 3 mock tests</span>
          </div>

          <div className="space-y-3">
            {mockAttempts.map((attempt) => (
              <div
                key={attempt.id}
                className="p-4 rounded-xl border border-gray-200 bg-white hover:border-red-300 hover:shadow-sm transition space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-700">
                        {attempt.category}
                      </span>
                      <span className="text-xs text-gray-400">• {attempt.date}</span>
                    </div>
                    <div className="font-bold text-gray-900 text-sm mt-1">{attempt.testTitle}</div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-green-100 text-green-800 self-start sm:self-auto">
                    Completed ✓
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 bg-gray-50 p-2.5 rounded-lg text-xs">
                  <div>
                    <span className="text-gray-500 block text-[10px] uppercase font-bold">Total Score</span>
                    <span className="font-black text-gray-900 text-sm">
                      {attempt.score} <span className="text-[10px] font-normal text-gray-500">/ {attempt.maxScore}</span>
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px] uppercase font-bold">Accuracy</span>
                    <span className="font-black text-emerald-600 text-sm">{attempt.accuracy}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px] uppercase font-bold">All India Rank</span>
                    <span className="font-black text-red-600 text-sm">
                      {attempt.rank} <span className="text-[10px] font-normal text-gray-500">/ {attempt.totalParticipants}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-100 transition cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onExploreTests();
            }}
            className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition shadow-2xs cursor-pointer flex items-center gap-1.5"
          >
            <span>Take Another Mock Test</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

