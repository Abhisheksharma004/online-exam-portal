"use client";

import React from "react";

interface TopAlertBarProps {
  onQuickAction: () => void;
}

export default function TopAlertBar({ onQuickAction }: TopAlertBarProps) {
  return (
    <div className="bg-red-600 text-white text-xs sm:text-sm py-2 px-4 text-center font-medium shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-white text-red-600 animate-pulse">
          LIVE 2026
        </span>
        <span>
          All India Live Mock Test Series: New Free Tests for <strong>SSC CGL, Railway NTPC &amp; Banking</strong> are now live!
        </span>
        <button
          onClick={onQuickAction}
          className="underline underline-offset-2 hover:text-red-100 font-semibold ml-1 cursor-pointer"
        >
          Start Test Now &rarr;
        </button>
      </div>
    </div>
  );
}
