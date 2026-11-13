"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  // Form Fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim() || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!password || password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      try {
        const studentName = email.split("@")[0];
        localStorage.setItem("yet_student_name", studentName);
      } catch {
        // safe fallback
      }
      router.push("/");
    }, 600);
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setErrorMessage("");

    setTimeout(() => {
      setIsLoading(false);
      try {
        localStorage.setItem("yet_student_name", "Aspirant (Google)");
      } catch {
        // safe fallback
      }
      router.push("/");
    }, 600);
  };


  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row font-sans selection:bg-red-100 selection:text-red-800 bg-white">
      {/* =========================================================================
          LEFT / TOP BRAND PANEL
          - Uses the authentic brand colors of the site: red-600, red-700, and red-800
          - Desktop (lg:flex): 50% split screen with brand gradient, logo, pill & features.
          - Mobile (lg:hidden): Curved top hero banner matching image 1.
      ========================================================================== */}
      <div className="relative w-full lg:w-1/2 bg-gradient-to-br from-red-700 via-red-600 to-red-800 text-white flex flex-col justify-between overflow-hidden rounded-b-[36px] lg:rounded-b-none p-6 sm:p-10 lg:p-14 select-none shrink-0 shadow-lg lg:shadow-none">
        {/* Soft Ambient Radial Overlays */}
        <div className="absolute -top-16 -left-16 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/3 -right-20 w-96 h-96 rounded-full bg-red-400/20 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 left-1/4 w-80 h-80 rounded-full bg-black/15 blur-2xl pointer-events-none"></div>

        {/* Geometric Motifs */}
        <div className="absolute top-12 right-12 w-48 h-48 rounded-full border border-white/15 pointer-events-none hidden lg:block"></div>
        <div className="absolute -bottom-12 left-8 w-64 h-64 rounded-full border border-white/15 pointer-events-none hidden lg:block"></div>

        {/* ----------------- Top Header ----------------- */}
        <div className="relative z-10">
          {/* Desktop Brand Header */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-lg bg-white p-2 shadow-md flex items-center justify-center group-hover:scale-105 transition">
                <Image
                  src="/logo.png"
                  alt="Your Exams Test"
                  width={32}
                  height={32}
                  priority
                  className="w-7 h-7 object-contain"
                />
              </div>
              <div className="text-left">
                <div className="text-base font-black text-white tracking-wider leading-none">
                  YOUR EXAMS TEST
                </div>
                <div className="text-[10px] font-bold text-red-100 tracking-widest uppercase mt-1">
                  MOCK TEST &amp; CBT PORTAL
                </div>
              </div>
            </Link>
          </div>

          {/* Mobile Centered Brand Banner */}
          <div className="flex lg:hidden flex-col items-center text-center py-4">
            <Link href="/" className="inline-block group mb-3">
              <div className="w-16 h-16 rounded-2xl bg-white p-2.5 shadow-lg flex items-center justify-center mx-auto group-hover:scale-105 transition">
                <Image
                  src="/logo.png"
                  alt="Your Exams Test"
                  width={48}
                  height={48}
                  priority
                  className="w-10 h-10 object-contain"
                />
              </div>
            </Link>
            <h2 className="text-xl font-black text-white tracking-wider">
              YOUR EXAMS TEST
            </h2>
            <p className="text-[10px] font-bold text-red-100 tracking-widest uppercase mt-0.5">
              MOCK TEST &amp; CBT PORTAL
            </p>

            {/* Pill Badge on Mobile */}
            <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-900/60 border border-white/20 text-xs font-semibold text-white shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
              <span>Secure Access</span>
            </div>
          </div>
        </div>

        {/* ----------------- Desktop Hero & 4 Features ----------------- */}
        <div className="relative z-10 hidden lg:flex flex-col my-auto py-8">
          {/* Secure Access Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-900/40 border border-white/25 text-xs font-semibold text-white w-fit mb-5 shadow-xs backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
            <span>Secure Student Access</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl xl:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3">
            Welcome to <br />
            <span className="text-white drop-shadow-xs">Your Exams Test Portal</span>
          </h1>

          <p className="text-sm text-red-100 leading-relaxed max-w-md mb-8">
            Centralized online examination portal for competitive mock tests, real-time All India Rank, and comprehensive performance analytics.
          </p>

          {/* 4 Feature Items */}
          <div className="space-y-4 max-w-md">
            {/* Feature 1 */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/15 border border-white/25 flex items-center justify-center shrink-0 text-white shadow-xs">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <span className="text-xs font-semibold text-white">
                Secure encrypted examination engine
              </span>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/15 border border-white/25 flex items-center justify-center shrink-0 text-white shadow-xs">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <span className="text-xs font-semibold text-white">
                Real-time All India Rank &amp; percentile
              </span>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/15 border border-white/25 flex items-center justify-center shrink-0 text-white shadow-xs">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </div>
              <span className="text-xs font-semibold text-white">
                Instant bilingual solutions &amp; detailed analysis
              </span>
            </div>

            {/* Feature 4 */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/15 border border-white/25 flex items-center justify-center shrink-0 text-white shadow-xs">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <span className="text-xs font-semibold text-white">
                Curated test series for SSC, Railway &amp; Banking
              </span>
            </div>
          </div>
        </div>

        {/* ----------------- Desktop Footer Copyright ----------------- */}
        <div className="relative z-10 hidden lg:block text-xs text-red-100/70 pt-6">
          © 2026 Your Exams Test. All rights reserved.
        </div>
      </div>

      {/* =========================================================================
          RIGHT / BOTTOM FORM PANEL
          - Clean white background, Google Social Login, and Email / Roll No fields.
      ========================================================================== */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col justify-between items-center px-6 sm:px-12 lg:px-16 py-8 sm:py-12">
        <div className="w-full max-w-[420px] my-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Sign in to your account
            </h1>
            <p className="text-sm text-gray-500 mt-1.5">
              Enter your credentials to access your mock tests and reports
            </p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 text-xs font-semibold text-red-700 flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px] shrink-0 font-bold">
                !
              </span>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Continue with Google Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full py-3 px-4 bg-white hover:bg-gray-50 active:scale-[0.99] border border-gray-300 hover:border-gray-400 rounded-lg text-sm font-bold text-gray-700 transition flex items-center justify-center gap-3 shadow-xs cursor-pointer disabled:opacity-70"
          >
            {/* Official Google G Logo SVG */}
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Modern Divider */}
          <div className="relative flex items-center justify-center my-6">
            <div className="border-t border-gray-200 w-full"></div>
            <span className="bg-white px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider shrink-0">
              or continue with email
            </span>
            <div className="border-t border-gray-200 w-full"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-800 block">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="yourname@gmail.com"
                className="w-full bg-white border border-gray-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-lg px-3.5 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition font-medium"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-800 block">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-white border border-gray-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-lg pl-3.5 pr-11 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-gray-400 hover:text-gray-600 cursor-pointer p-0.5"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                      />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember me & Forgot password row */}
            <div className="flex items-center justify-between pt-1 text-sm">
              <label className="flex items-center gap-2 cursor-pointer select-none text-gray-700 font-medium">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-600 cursor-pointer accent-red-600"
                />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                onClick={() => alert("Password reset instructions sent to your email!")}
                className="font-bold text-red-600 hover:text-red-700 hover:underline cursor-pointer"
              >
                Forgot password?
              </button>
            </div>

            {/* Primary Sign In Button - Official Brand Red */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-red-600 hover:bg-red-700 active:scale-[0.99] text-white font-bold rounded-lg transition shadow-md shadow-red-600/25 cursor-pointer flex items-center justify-center gap-2 mt-4 text-sm disabled:opacity-70"
            >
              {isLoading ? (
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <span>Sign In with Email</span>
              )}
            </button>
          </form>


        </div>

        {/* Form Bottom Copyright & Nav */}
        <div className="text-center text-xs text-gray-400 mt-8 pt-4 space-y-2">
          <div className="flex items-center justify-center gap-4">
            <Link href="/" className="font-bold text-gray-500 hover:text-red-600 transition flex items-center gap-1">
              <span>← Back to Home</span>
            </Link>
            <span>•</span>
            <Link href="/admin" className="font-bold text-gray-500 hover:text-red-600 transition">
              Admin Login Portal →
            </Link>
          </div>
          <div>© 2026 Your Exams Test. All rights reserved.</div>
        </div>
      </div>
    </div>
  );
}
