"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  // Form Fields - Preloaded with the requested admin credentials for convenience
  const [adminEmail, setAdminEmail] = useState("jyotiinfotech.04@gmail.com");
  const [password, setPassword] = useState("Admin@2022");
  const [rememberSession, setRememberSession] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!adminEmail.trim()) {
      setErrorMessage("Please enter your admin email address.");
      return;
    }
    if (!password) {
      setErrorMessage("Please enter your admin password.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: adminEmail.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setErrorMessage(data.error || "Authentication failed. Please check your credentials.");
        setIsLoading(false);
        return;
      }

      setSuccessMessage("Authentication successful! Redirecting to dashboard...");

      try {
        localStorage.setItem("yet_admin_logged_in", "true");
        localStorage.setItem("yet_admin_user", data.user?.name || "Jyoti Infotech Admin");
        localStorage.setItem("yet_admin_email", data.user?.email || adminEmail.trim());
      } catch {
        // safe fallback
      }

      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 500);
    } catch (err: unknown) {
      console.error("Login submission error:", err);
      setErrorMessage(
        "Could not connect to authentication server. Please ensure MySQL is running on port 3306."
      );
      setIsLoading(false);
    }
  };

  const handleFillCredentials = () => {
    setAdminEmail("jyotiinfotech.04@gmail.com");
    setPassword("Admin@2022");
    setErrorMessage("");
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
              <span className="text-2xl font-black text-white tracking-tight leading-none block">
                YOUR EXAMS TEST
              </span>
              <span className="text-[11px] font-bold text-red-100 tracking-widest uppercase mt-1.5 block">
                ADMIN CONTROL PANEL
              </span>
            </Link>
          </div>
        </div>

        {/* ----------------- Desktop Hero Highlights ----------------- */}
        <div className="relative z-10 hidden lg:flex flex-col my-auto py-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-bold tracking-wide w-fit mb-6 border border-white/20">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            <span>MySQL Authenticated Access</span>
          </div>

          <h2 className="text-3xl xl:text-4xl font-black leading-tight text-white tracking-tight">
            Comprehensive Management Console for Mock Tests &amp; CBT Simulator
          </h2>

          <p className="mt-4 text-sm text-red-100/90 leading-relaxed max-w-lg">
            Direct database access to publish test series, monitor live candidates in real-time, inspect question sets, and manage platform passes.
          </p>

          {/* Core Privileges */}
          <div className="mt-8 space-y-3.5 max-w-md">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-md bg-white/20 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-xs font-semibold text-white/95">
                MySQL Database Storage (`admin_users` table)
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-md bg-white/20 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-xs font-semibold text-white/95">
                Full-featured Mock Test Series Publisher &amp; Marking Schemes
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-md bg-white/20 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-xs font-semibold text-white/95">
                Live CBT Anti-Cheating &amp; Aspirant Scorecard Analytics
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
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Admin Login
            </h1>
            <p className="text-sm text-gray-500 mt-1.5">
              Enter your MySQL-verified admin credentials to access the console
            </p>
          </div>

          {/* Quick-fill credentials badge */}
          <div className="mb-5 p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs">
            <div className="flex items-center justify-between text-slate-700 font-bold mb-1">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Configured Credentials</span>
              </span>
              <button
                type="button"
                onClick={handleFillCredentials}
                className="text-[11px] text-red-600 hover:text-red-700 underline font-bold cursor-pointer"
              >
                Auto Fill
              </button>
            </div>
            <div className="text-[11px] text-slate-600 font-mono space-y-0.5">
              <div>User Id: <strong className="text-slate-900">jyotiinfotech.04@gmail.com</strong></div>
              <div>Password: <strong className="text-slate-900">Admin@2022</strong></div>
            </div>
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

          {/* Success Banner */}
          {successMessage && (
            <div className="mb-5 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] shrink-0 font-bold">
                ✓
              </span>
              <span>{successMessage}</span>
            </div>
          )}

          {/* Admin Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Admin Email */}
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-800 block">
                User ID / Admin Email
              </label>
              <input
                type="email"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="jyotiinfotech.04@gmail.com"
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
                  onClick={() => alert("Your configured password in MySQL is Admin@2022")}
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
                  className="w-full bg-white border border-gray-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-lg pl-3.5 pr-11 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition font-medium font-mono"
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
                <span className="text-xs">Remember Admin Session (MySQL)</span>
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
