"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  // Form Fields
  const [adminEmail, setAdminEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberSession, setRememberSession] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!adminEmail.trim()) {
      setErrorMessage("Please enter your admin email address.");
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
        localStorage.setItem("yet_admin_logged_in", "true");
        localStorage.setItem("yet_admin_user", adminEmail.split("@")[0] || "Admin");
      } catch {
        // safe fallback
      }
      alert("Admin authenticated successfully! Entering Admin Console.");
      router.push("/admin/dashboard");
    }, 600);
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row font-sans selection:bg-red-100 selection:text-red-900 bg-white">
      {/* =========================================================================
          LEFT / TOP ADMIN BRAND PANEL
      ========================================================================== */}
      <div className="relative w-full lg:w-1/2 bg-gradient-to-br from-red-700 via-red-600 to-red-800 text-white flex flex-col justify-between overflow-hidden rounded-b-[36px] lg:rounded-b-none p-6 sm:p-10 lg:p-14 select-none shrink-0 shadow-lg lg:shadow-none">
        {/* Soft Ambient Radial Overlays */}
        <div className="absolute -top-16 -left-16 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/3 -right-20 w-96 h-96 rounded-full bg-red-400/20 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 left-1/4 w-80 h-80 rounded-full bg-black/20 blur-2xl pointer-events-none"></div>

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
                  ADMIN CONTROL PANEL
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
              ADMIN CONTROL PANEL
            </p>

            {/* Pill Badge on Mobile */}
            <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-900/60 border border-white/20 text-xs font-semibold text-white shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Admin Access</span>
            </div>
          </div>
        </div>

        {/* ----------------- Desktop Hero & 4 Admin Capabilities ----------------- */}
        <div className="relative z-10 hidden lg:flex flex-col my-auto py-8">
          {/* Admin Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-900/40 border border-white/25 text-xs font-semibold text-white w-fit mb-5 shadow-xs backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Admin Access Portal</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl xl:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3">
            Welcome to <br />
            <span className="text-white drop-shadow-xs">Admin Portal</span>
          </h1>

          <p className="text-sm text-red-100 leading-relaxed max-w-md mb-8">
            Manage competitive examination mock tests, question banks, student results, and platform analytics.
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
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <span className="text-xs font-semibold text-white">
                Admin Management &amp; Access Controls
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
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <span className="text-xs font-semibold text-white">
                Question Bank Publishing &amp; Test Series Creation
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
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <span className="text-xs font-semibold text-white">
                Student Test Analytics &amp; Scorecard Reports
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <span className="text-xs font-semibold text-white">
                Live CBT Examination Simulator &amp; Monitoring
              </span>
            </div>
          </div>
        </div>

        {/* ----------------- Desktop Footer Copyright ----------------- */}
        <div className="relative z-10 hidden lg:block text-xs text-red-100/70 pt-6">
          © 2026 Your Exams Test. Admin Console.
        </div>
      </div>

      {/* =========================================================================
          RIGHT / BOTTOM ADMIN FORM PANEL
      ========================================================================== */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col justify-between items-center px-6 sm:px-12 lg:px-16 py-8 sm:py-12">
        <div className="w-full max-w-[420px] my-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Admin Login
            </h1>
            <p className="text-sm text-gray-500 mt-1.5">
              Enter your admin credentials to access the console
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

          {/* Admin Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Admin Email */}
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-800 block">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="admin@yourexamstest.com"
                className="w-full bg-white border border-gray-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-lg px-3.5 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition font-medium"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-gray-800 block">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => alert("Password reset instructions sent to your registered admin email.")}
                  className="text-xs font-semibold text-red-600 hover:text-red-700 hover:underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
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

            {/* Remember me */}
            <div className="flex items-center justify-between pt-1 text-sm">
              <label className="flex items-center gap-2 cursor-pointer select-none text-gray-700 font-medium">
                <input
                  type="checkbox"
                  checked={rememberSession}
                  onChange={(e) => setRememberSession(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-600 cursor-pointer accent-red-600"
                />
                <span className="text-xs">Remember Admin Session</span>
              </label>
            </div>

            {/* Primary Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-red-600 hover:bg-red-700 active:scale-[0.99] text-white font-bold rounded-lg transition shadow-md shadow-red-600/25 cursor-pointer flex items-center justify-center gap-2 mt-4 text-sm disabled:opacity-70"
            >
              {isLoading ? (
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Sign In to Admin Console</span>
                </div>
              )}
            </button>
          </form>
        </div>

        {/* Form Bottom Link */}
        <div className="text-center text-xs text-gray-400 mt-8 pt-4 flex items-center justify-center gap-4">
          <Link href="/" className="font-bold text-gray-500 hover:text-red-600 transition flex items-center gap-1">
            <span>← Back to Home</span>
          </Link>
          <span>•</span>
          <Link href="/login" className="font-bold text-gray-500 hover:text-red-600 transition">
            Student Login Portal →
          </Link>
        </div>
      </div>
    </div>
  );
}
