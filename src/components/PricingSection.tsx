"use client";

import React from "react";

interface PricingSectionProps {
  onSelectPlan: (planName: string) => void;
}

export default function PricingSection({ onSelectPlan }: PricingSectionProps) {
  const plans = [
    {
      id: "free",
      name: "Free Starter Pass",
      tagline: "Essential practice for beginners starting exam preparation.",
      price: "0",
      period: "Lifetime Free",
      isPopular: false,
      features: [
        "15+ Full-Length Mock Tests",
        "Instant Scorecard & Accuracy Rate",
        "Bilingual Interface (English & Hindi)",
        "Sectional Practice Quizzes",
        "Community Discussion Access",
      ],
      buttonText: "Start Free Practice",
      buttonStyle: "bg-white text-red-600 border-2 border-red-600 hover:bg-red-50",
    },
    {
      id: "pro",
      name: "Pro Aspirant Pass",
      tagline: "Most popular choice for focused aspirants targeting 2026 exams.",
      price: "299",
      period: "Valid for 6 Months",
      isPopular: true,
      features: [
        "Unlimited Mock Tests (SSC, Railway, Banking)",
        "Real TCS Exam Interface & CBT Simulator",
        "Real-Time All India Rank & Percentile",
        "In-depth Step-by-Step Solutions",
        "Weak Subject & Time Allocation Analytics",
        "Previous 5 Years Question Papers",
      ],
      buttonText: "Get Pro Pass",
      buttonStyle: "bg-red-600 text-white hover:bg-red-700 shadow-md shadow-red-200",
    },
    {
      id: "ultimate",
      name: "Ultimate Master Pass",
      tagline: "Complete preparation suite across all government exams.",
      price: "499",
      period: "Valid for 12 Months",
      isPopular: false,
      features: [
        "Access to All 500+ Exam Test Series",
        "Unlimited Re-attempts on Every Test",
        "10+ Years Chapter-wise Solved PYQs",
        "Custom Quiz Generator by Topic",
        "Downloadable PDF Solutions",
        "24x7 Priority Technical & Doubt Support",
      ],
      buttonText: "Get Ultimate Pass",
      buttonStyle: "bg-white text-red-600 border-2 border-red-600 hover:bg-red-50",
    },
  ];

  return (
    <section id="pricing" className="scroll-mt-24 py-20 bg-gray-50 border-t border-red-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-block text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-full uppercase tracking-wider">
            Transparent Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Affordable Test Series Passes for Every Aspirant
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Choose the pass that best fits your preparation goals. Start practicing with free tests or unlock complete test series access.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-lg p-6 sm:p-8 flex flex-col justify-between transition relative border-2 ${
                plan.isPopular
                  ? "border-red-600 shadow-xl shadow-red-100 ring-2 ring-red-600/20 md:-translate-y-2"
                  : "border-gray-200 hover:border-red-300 shadow-sm"
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm">
                  Most Popular
                </div>
              )}

              <div>
                {/* Plan Header */}
                <div className="border-b border-gray-100 pb-5">
                  <h3 className="text-xl font-black text-gray-900">{plan.name}</h3>
                  <p className="text-xs text-gray-500 mt-1 min-h-[32px]">{plan.tagline}</p>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-base font-bold text-gray-500">₹</span>
                    <span className="text-4xl font-black text-gray-900 tracking-tight">{plan.price}</span>
                    <span className="text-xs font-semibold text-gray-500 ml-1">/ {plan.period}</span>
                  </div>
                </div>

                {/* Features List */}
                <ul className="py-6 space-y-3 text-xs sm:text-sm text-gray-700">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <svg
                        className="w-4 h-4 text-red-600 shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={() => onSelectPlan(plan.name)}
                  className={`w-full py-3 rounded-md font-bold text-sm transition cursor-pointer flex items-center justify-center gap-1.5 ${plan.buttonStyle}`}
                >
                  <span>{plan.buttonText}</span>
                  <span>&rarr;</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-12 bg-white border border-red-200 rounded-lg p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-red-50 text-red-600 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <span className="font-bold text-gray-900 block">100% Secure Payments &amp; Instant Activation</span>
              <span>All major UPI apps (GPay, PhonePe, Paytm), NetBanking, and RuPay cards accepted.</span>
            </div>
          </div>
          <div className="shrink-0 font-bold text-red-600">
            No Auto-Renewal &bull; Cancel Anytime
          </div>
        </div>
      </div>
    </section>
  );
}

