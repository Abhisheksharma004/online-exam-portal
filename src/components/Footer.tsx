import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-red-200 pt-12 pb-8 text-gray-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Brand */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 flex items-center justify-center shrink-0">
                <Image
                  src="/logo.png"
                  alt="Your Exams Test Logo"
                  width={34}
                  height={34}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <span className="text-xl font-black text-gray-900">
                Your Exams <span className="text-red-600">Test</span>
              </span>
            </Link>
            <p className="text-xs text-gray-500 leading-relaxed">
              India&apos;s leading online examination and mock test platform, dedicated to
              empowering aspirants to succeed in competitive government exams.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-bold text-gray-900 text-sm mb-3">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#mock-tests" className="hover:text-red-600 transition">
                  All Mock Tests
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-red-600 transition">
                  Exam Categories
                </a>
              </li>
              <li>
                <a href="#live-cbt" className="hover:text-red-600 transition">
                  CBT Simulator
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-red-600 transition">
                  Features
                </a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-red-600 transition">
                  FAQs
                </a>
              </li>
              <li>
                <Link href="/admin" className="hover:text-red-600 transition text-gray-400">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Exams */}
          <div>
            <h4 className="font-bold text-gray-900 text-sm mb-3">Popular Exams</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="hover:text-red-600 cursor-pointer">
                  SSC CGL &amp; CHSL 2026
                </span>
              </li>
              <li>
                <span className="hover:text-red-600 cursor-pointer">
                  RRB NTPC &amp; Group D
                </span>
              </li>
              <li>
                <span className="hover:text-red-600 cursor-pointer">
                  IBPS PO &amp; Clerk
                </span>
              </li>
              <li>
                <span className="hover:text-red-600 cursor-pointer">
                  CTET &amp; State Teacher Eligibility
                </span>
              </li>
              <li>
                <span className="hover:text-red-600 cursor-pointer">
                  State Police &amp; Defense
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Help */}
          <div>
            <h4 className="font-bold text-gray-900 text-sm mb-3">Support &amp; Contact</h4>
            <ul className="space-y-2 text-xs text-gray-500">
              <li>Email: support@yourexamstest.com</li>
              <li>Helpline: +91 98765 43210</li>
              <li>Hours: Mon - Sat (9:00 AM to 7:00 PM IST)</li>
              <li className="pt-2">
                <span className="inline-block bg-red-100 text-red-700 font-bold px-2.5 py-1 rounded-md text-[11px]">
                  24x7 Technical Support Available
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-red-100 text-center text-xs text-gray-400 flex flex-col sm:flex-row justify-between items-center gap-2">
          <div>
            © 2026 <strong>Your Exams Test</strong>. All Rights Reserved.
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-red-600">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-red-600">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
