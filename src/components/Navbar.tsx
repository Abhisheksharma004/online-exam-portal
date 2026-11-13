"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface NavbarProps {
  onStartFreeTestClick?: () => void;
  userName?: string | null;
  onLogout?: () => void;
}

export default function Navbar({
  userName,
  onLogout,
}: NavbarProps) {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerButtonRef = useRef<HTMLButtonElement>(null);

  // Close profile dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
      if (
        mobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        hamburgerButtonRef.current &&
        !hamburgerButtonRef.current.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  // Close menus on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setProfileMenuOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Smooth scroll handler with header offset
  const handleScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    sectionId: string
  ) => {
    e.preventDefault();

    // Check if on home page
    if (typeof window !== "undefined" && window.location.pathname !== "/") {
      router.push(`/#${sectionId}`);
      return;
    }

    if (sectionId === "top") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      if (window.history.pushState) {
        window.history.pushState(null, "", window.location.pathname);
      }
      setMobileMenuOpen(false);
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 84;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      if (window.history.pushState) {
        window.history.pushState(null, "", `#${sectionId}`);
      }
    }

    // Close mobile menu gracefully
    if (mobileMenuOpen) {
      setTimeout(() => {
        setMobileMenuOpen(false);
      }, 100);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-red-100 shadow-[0_2px_10px_rgba(220,38,38,0.06)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Image
                  src="/logo.png"
                  alt="Your Exams Test Logo"
                  width={40}
                  height={40}
                  priority
                  className="w-9 h-9 sm:w-10 sm:h-10 object-contain drop-shadow-xs"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-2xl font-black tracking-tight text-gray-900 leading-none whitespace-nowrap">
                  Your Exams <span className="text-red-600">Test</span>
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-gray-500 uppercase tracking-wider mt-1 whitespace-nowrap">
                  Trusted Mock Test Portal
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-700">
            <a
              href="#top"
              onClick={(e) => handleScrollTo(e, "top")}
              className="text-red-600 hover:text-red-700 transition cursor-pointer"
            >
              Home
            </a>
            <a
              href="#mock-tests"
              onClick={(e) => handleScrollTo(e, "mock-tests")}
              className="hover:text-red-600 transition flex items-center gap-1 cursor-pointer"
            >
              <span>Mock Tests</span>
              <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-bold">
                Hot
              </span>
            </a>
            <a
              href="#categories"
              onClick={(e) => handleScrollTo(e, "categories")}
              className="hover:text-red-600 transition cursor-pointer"
            >
              Exam Categories
            </a>
            <a
              href="#live-cbt"
              onClick={(e) => handleScrollTo(e, "live-cbt")}
              className="hover:text-red-600 transition cursor-pointer"
            >
              CBT Simulator
            </a>
            <a
              href="#pricing"
              onClick={(e) => handleScrollTo(e, "pricing")}
              className="hover:text-red-600 transition cursor-pointer"
            >
              Pricing
            </a>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {userName ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100/80 border border-red-200 text-xs font-bold text-red-700 transition cursor-pointer"
                >
                  <span className="w-6 h-6 rounded-md bg-red-600 text-white flex items-center justify-center text-[11px] font-black uppercase">
                    {userName.charAt(0)}
                  </span>
                  <span className="max-w-[120px] truncate">{userName}</span>
                  <svg
                    className={`w-3.5 h-3.5 text-red-600 transition-transform duration-200 ${
                      profileMenuOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Profile Dropdown Card */}
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl py-3 px-4 z-50 animate-in fade-in zoom-in-95 duration-100">
                    <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                      <div className="w-10 h-10 rounded-lg bg-red-600 text-white flex items-center justify-center font-black text-sm uppercase shadow-xs">
                        {userName.charAt(0)}
                      </div>
                      <div className="overflow-hidden">
                        <div className="text-sm font-bold text-gray-900 truncate">
                          {userName}
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                          <span>Active Aspirant</span>
                        </div>
                      </div>
                    </div>

                    <div className="py-2.5 text-xs space-y-1.5 border-b border-gray-100">
                      <div className="flex items-center justify-between text-gray-500 font-medium">
                        <span>Target Exam:</span>
                        <span className="font-bold text-gray-800">SSC &amp; Railway</span>
                      </div>
                      <div className="flex items-center justify-between text-gray-500 font-medium">
                        <span>Pass Status:</span>
                        <span className="font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded text-[10px]">
                          Free Starter
                        </span>
                      </div>
                    </div>

                    <div className="pt-2.5 space-y-1">
                      <a
                        href="#mock-tests"
                        onClick={(e) => {
                          setProfileMenuOpen(false);
                          handleScrollTo(e, "mock-tests");
                        }}
                        className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-50 text-xs font-semibold text-gray-700 transition cursor-pointer"
                      >
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <span>Available Mock Tests</span>
                      </a>
                      <a
                        href="#pricing"
                        onClick={(e) => {
                          setProfileMenuOpen(false);
                          handleScrollTo(e, "pricing");
                        }}
                        className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-50 text-xs font-semibold text-gray-700 transition cursor-pointer"
                      >
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Upgrade Test Pass</span>
                      </a>

                      {onLogout && (
                        <button
                          type="button"
                          onClick={() => {
                            setProfileMenuOpen(false);
                            onLogout();
                          }}
                          className="w-full mt-2 py-2 px-3 rounded-md bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          <span>Sign Out</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-bold text-red-600 border border-red-600 rounded-md hover:bg-red-50 transition cursor-pointer"
              >
                Student Login
              </Link>
            )}

            <Link
              href="/admin"
              className="px-4 py-2 text-sm font-bold text-white bg-red-600 rounded-md hover:bg-red-700 shadow-sm shadow-red-200 transition cursor-pointer flex items-center gap-1.5"
            >
              <span>Admin Login</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              ref={hamburgerButtonRef}
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-700 hover:text-red-600 hover:bg-red-50 active:bg-red-100 border border-gray-200 hover:border-red-200 transition cursor-pointer shrink-0 focus:outline-none"
              aria-label="Toggle Navigation"
              aria-expanded={mobileMenuOpen}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden bg-white border-b border-red-100 px-4 pt-3 pb-6 space-y-1 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150"
        >
          {/* Quick Nav Links */}
          <a
            href="#top"
            onClick={(e) => handleScrollTo(e, "top")}
            className="flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-semibold text-gray-800 hover:text-red-600 hover:bg-red-50 active:bg-red-100 transition cursor-pointer"
          >
            <span>Home</span>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>

          <a
            href="#mock-tests"
            onClick={(e) => handleScrollTo(e, "mock-tests")}
            className="flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-semibold text-gray-800 hover:text-red-600 hover:bg-red-50 active:bg-red-100 transition cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span>Mock Test Series</span>
              <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-bold">
                Hot
              </span>
            </div>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>

          <a
            href="#categories"
            onClick={(e) => handleScrollTo(e, "categories")}
            className="flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-semibold text-gray-800 hover:text-red-600 hover:bg-red-50 active:bg-red-100 transition cursor-pointer"
          >
            <span>Exam Categories</span>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>

          <a
            href="#live-cbt"
            onClick={(e) => handleScrollTo(e, "live-cbt")}
            className="flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-semibold text-gray-800 hover:text-red-600 hover:bg-red-50 active:bg-red-100 transition cursor-pointer"
          >
            <span>Live CBT Simulator Demo</span>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>

          <a
            href="#features"
            onClick={(e) => handleScrollTo(e, "features")}
            className="flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-semibold text-gray-800 hover:text-red-600 hover:bg-red-50 active:bg-red-100 transition cursor-pointer"
          >
            <span>Why Choose Us</span>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>

          <a
            href="#pricing"
            onClick={(e) => handleScrollTo(e, "pricing")}
            className="flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-semibold text-gray-800 hover:text-red-600 hover:bg-red-50 active:bg-red-100 transition cursor-pointer"
          >
            <span>Pricing Plans</span>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>

          <a
            href="#faqs"
            onClick={(e) => handleScrollTo(e, "faqs")}
            className="flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-semibold text-gray-800 hover:text-red-600 hover:bg-red-50 active:bg-red-100 transition cursor-pointer"
          >
            <span>FAQs &amp; Help</span>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>

          {/* User / Auth Section */}
          <div className="pt-3 mt-2 border-t border-gray-100 flex flex-col gap-2">
            {!userName ? (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center text-sm font-bold text-red-600 border border-red-600 rounded-lg hover:bg-red-50 block transition cursor-pointer"
              >
                Student Login Portal
              </Link>
            ) : (
              <div className="flex items-center justify-between p-3 rounded-lg bg-red-50 border border-red-200">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-md bg-red-600 text-white flex items-center justify-center text-xs font-black uppercase">
                    {userName.charAt(0)}
                  </span>
                  <div className="text-xs">
                    <span className="font-bold text-gray-900 block truncate max-w-[140px]">
                      {userName}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-semibold">Active Aspirant</span>
                  </div>
                </div>
                {onLogout && (
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onLogout();
                    }}
                    className="text-xs text-red-600 font-bold hover:underline cursor-pointer"
                  >
                    Sign Out
                  </button>
                )}
              </div>
            )}

            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg flex items-center justify-center gap-2 shadow-xs transition cursor-pointer"
            >
              <span>Admin Management Console</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
