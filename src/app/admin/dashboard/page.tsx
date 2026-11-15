"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { mockTestsData } from "@/data/mockTests";
import { MockTest } from "@/types/exam";

type NavSection =
  | "overview"
  | "mock-tests"
  | "live-cbt"
  | "questions"
  | "aspirants"
  | "revenue"
  | "settings";

interface AspirantRecord {
  id: string;
  name: string;
  email: string;
  targetExam: string;
  passTier: "Free Starter" | "6-Month Pass" | "1-Year Ultimate";
  testsTaken: number;
  bestAIR: number;
  averageScore: string;
  lastActive: string;
  status: "Active" | "In Live Test" | "Offline";
}

interface LiveSession {
  id: string;
  aspirantName: string;
  rollNo: string;
  testTitle: string;
  timeLeft: string;
  answeredCount: number;
  totalQuestions: number;
  ipLocation: string;
  tabSwitches: number;
  status: "Normal" | "Warning Flag";
}

interface QuestionItem {
  id: string;
  subject: string;
  topic: string;
  exam: string;
  difficulty: "Easy" | "Moderate" | "Hard";
  questionEn: string;
  questionHi: string;
  options: string[];
  correctOption: number;
}

export default function AdminDashboardPage() {
  const router = useRouter();

  // Navigation State
  const [activeSection, setActiveSection] = useState<NavSection>("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);

  // Admin User Profile (loaded dynamically from MySQL session)
  const [adminUser, setAdminUser] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const cachedEmail = localStorage.getItem("yet_admin_email");
        const cachedName = localStorage.getItem("yet_admin_user");
        if (cachedEmail || cachedName) {
          return {
            name: cachedName || "Jyoti Infotech Admin",
            email: cachedEmail || "jyotiinfotech.04@gmail.com",
            role: "Super Admin",
          };
        }
      } catch {
        // safe fallback
      }
    }
    return {
      name: "Jyoti Infotech Admin",
      email: "jyotiinfotech.04@gmail.com",
      role: "Super Admin",
    };
  });

  useEffect(() => {
    // Fetch authenticated admin profile from MySQL session API
    fetch("/api/admin/me")
      .then((res) => {
        if (res.ok) return res.json();
        return null;
      })
      .then((data) => {
        if (data && data.authenticated && data.user) {
          setAdminUser({
            name: data.user.name || "Jyoti Infotech Admin",
            email: data.user.email || "jyotiinfotech.04@gmail.com",
            role: data.user.role === "super_admin" ? "Super Admin" : data.user.role,
          });
        }
      })
      .catch(() => {
        // network or server error fallback
      });
  }, []);

  // Search & Filters for Mock Tests
  const [testSearch, setTestSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [testsList, setTestsList] = useState<MockTest[]>(mockTestsData);

  // Modal: Create Mock Test
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("SSC");
  const [newExamName, setNewExamName] = useState("SSC CGL");
  const [newQuestions, setNewQuestions] = useState(100);
  const [newDuration, setNewDuration] = useState(60);
  const [newTotalMarks, setNewTotalMarks] = useState(200);
  const [newNegativeMark, setNewNegativeMark] = useState("0.50");
  const [newIsFree, setNewIsFree] = useState(true);

  // Modal: View Candidate Scorecard
  const [selectedCandidate, setSelectedCandidate] = useState<AspirantRecord | null>(null);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Mock Aspirants
  const [aspirantsList] = useState<AspirantRecord[]>([
    {
      id: "ASP-2026-081",
      name: "Pooja Sharma",
      email: "pooja.sharma@gmail.com",
      targetExam: "SSC CGL",
      passTier: "1-Year Ultimate",
      testsTaken: 28,
      bestAIR: 42,
      averageScore: "172.5 / 200",
      lastActive: "10 mins ago",
      status: "In Live Test",
    },
    {
      id: "ASP-2026-082",
      name: "Rahul Verma",
      email: "rahul.v@outlook.com",
      targetExam: "RRB NTPC CBT-1",
      passTier: "6-Month Pass",
      testsTaken: 19,
      bestAIR: 118,
      averageScore: "84.0 / 100",
      lastActive: "35 mins ago",
      status: "Active",
    },
    {
      id: "ASP-2026-083",
      name: "Amit Kumar",
      email: "amit.k99@gmail.com",
      targetExam: "IBPS PO Prelims",
      passTier: "Free Starter",
      testsTaken: 6,
      bestAIR: 954,
      averageScore: "68.5 / 100",
      lastActive: "2 hours ago",
      status: "Offline",
    },
    {
      id: "ASP-2026-084",
      name: "Sneha Patel",
      email: "sneha.p@yahoo.com",
      targetExam: "SSC CHSL",
      passTier: "1-Year Ultimate",
      testsTaken: 34,
      bestAIR: 19,
      averageScore: "181.0 / 200",
      lastActive: "Just now",
      status: "In Live Test",
    },
    {
      id: "ASP-2026-085",
      name: "Vikram Singh Rathore",
      email: "vikram.rathore@gmail.com",
      targetExam: "AFCAT / CDS",
      passTier: "6-Month Pass",
      testsTaken: 22,
      bestAIR: 88,
      averageScore: "216.0 / 300",
      lastActive: "Yesterday",
      status: "Offline",
    },
  ]);

  // Mock Live CBT Sessions
  const [liveSessions, setLiveSessions] = useState<LiveSession[]>([
    {
      id: "SESS-901",
      aspirantName: "Pooja Sharma",
      rollNo: "202604812",
      testTitle: "SSC CGL 2026 Tier-1 : Full Length Mock 01",
      timeLeft: "34m 12s",
      answeredCount: 58,
      totalQuestions: 100,
      ipLocation: "New Delhi, DL (Node-01)",
      tabSwitches: 0,
      status: "Normal",
    },
    {
      id: "SESS-902",
      aspirantName: "Sneha Patel",
      rollNo: "202604925",
      testTitle: "SSC CHSL 10+2 Tier-1 : Speed Drill Mock",
      timeLeft: "18m 45s",
      answeredCount: 76,
      totalQuestions: 100,
      ipLocation: "Ahmedabad, GJ (Node-02)",
      tabSwitches: 0,
      status: "Normal",
    },
    {
      id: "SESS-903",
      aspirantName: "Karan Johri",
      rollNo: "202605118",
      testTitle: "RRB NTPC CBT-1 : All India Mega Mock",
      timeLeft: "52m 10s",
      answeredCount: 39,
      totalQuestions: 100,
      ipLocation: "Lucknow, UP (Node-01)",
      tabSwitches: 2,
      status: "Warning Flag",
    },
  ]);

  // Mock Question Bank
  const [sampleQuestions] = useState<QuestionItem[]>([
    {
      id: "QB-QA-101",
      subject: "Quantitative Aptitude",
      topic: "Compound Interest & Simple Interest",
      exam: "SSC CGL / RRB NTPC",
      difficulty: "Moderate",
      questionEn:
        "The difference between simple interest and compound interest on a certain sum of money for 2 years at 10% per annum is ₹120. Find the principal sum.",
      questionHi:
        "किसी निश्चित धनराशि पर 10% वार्षिक ब्याज की दर से 2 वर्षों के साधारण ब्याज और चक्रवृद्धि ब्याज का अंतर ₹120 है। वह धनराशि ज्ञात कीजिए।",
      options: ["₹10,000", "₹12,000", "₹14,400", "₹15,000"],
      correctOption: 1,
    },
    {
      id: "QB-RE-204",
      subject: "Reasoning Ability",
      topic: "Syllogism & Deductive Logic",
      exam: "IBPS PO / SSC CGL",
      difficulty: "Hard",
      questionEn:
        "Statements: All circles are triangles. Some triangles are rectangles. Conclusion: (I) Some circles are rectangles. (II) Some rectangles are triangles.",
      questionHi:
        "कथन: सभी वृत्त त्रिभुज हैं। कुछ त्रिभुज आयत हैं। निष्कर्ष: (I) कुछ वृत्त आयत हैं। (II) कुछ आयत त्रिभुज हैं।",
      options: ["Only I follows", "Only II follows", "Both I and II follow", "Neither I nor II follows"],
      correctOption: 1,
    },
    {
      id: "QB-GA-318",
      subject: "General Awareness",
      topic: "Indian Polity & Constitution",
      exam: "SSC / Railway / State PSC",
      difficulty: "Easy",
      questionEn:
        "Under which Article of the Constitution of India can the President declare a Financial Emergency?",
      questionHi:
        "भारत के संविधान के किस अनुच्छेद के तहत राष्ट्रपति वित्तीय आपातकाल की घोषणा कर सकते हैं?",
      options: ["Article 352", "Article 356", "Article 360", "Article 368"],
      correctOption: 2,
    },
  ]);

  // Mock Transactions
  const [transactions] = useState([
    { id: "TXN-88412", user: "Pooja Sharma", plan: "1-Year Ultimate Pass", amount: "₹999", status: "Success", time: "Today, 10:14 AM" },
    { id: "TXN-88411", user: "Vikram S.", plan: "6-Month Pass", amount: "₹599", status: "Success", time: "Today, 09:30 AM" },
    { id: "TXN-88410", user: "Sneha Patel", plan: "1-Year Ultimate Pass", amount: "₹999", status: "Success", time: "Yesterday, 07:45 PM" },
    { id: "TXN-88409", user: "Rohan Das", plan: "3-Month Sprint Pass", amount: "₹349", status: "Success", time: "Yesterday, 04:12 PM" },
    { id: "TXN-88408", user: "Meera Nair", plan: "1-Year Ultimate Pass", amount: "₹999", status: "Success", time: "Yesterday, 02:08 PM" },
  ]);

  // Handlers
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {
      // safe fallback
    }
    try {
      localStorage.removeItem("yet_admin_logged_in");
      localStorage.removeItem("yet_admin_user");
      localStorage.removeItem("yet_admin_email");
    } catch {
      // safe fallback
    }
    router.push("/admin");
  };

  const handleCreateMockTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      alert("Please enter a test title.");
      return;
    }

    const created: MockTest = {
      id: `custom-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      examName: newExamName.trim() || newCategory,
      questions: Number(newQuestions) || 100,
      durationMinutes: Number(newDuration) || 60,
      totalMarks: Number(newTotalMarks) || 200,
      languages: ["English", "Hindi"],
      isFree: newIsFree,
      participants: 0,
      rating: 5.0,
      tag: "Live Now",
    };

    setTestsList([created, ...testsList]);
    setIsCreateModalOpen(false);
    setNewTitle("");
    showToast(`"${created.title}" published to live student test catalog!`);
  };

  const handleDeleteTest = (testId: string) => {
    const toDelete = testsList.find((t) => t.id === testId);
    if (!toDelete) return;

    if (confirm(`Are you sure you want to delete "${toDelete.title}"?`)) {
      setTestsList(testsList.filter((t) => t.id !== testId));
      showToast("Mock test deleted successfully.");
    }
  };

  const handleTerminateLiveSession = (sessId: string) => {
    if (confirm("Terminate this candidate session and auto-submit current responses?")) {
      setLiveSessions(liveSessions.filter((s) => s.id !== sessId));
      showToast("Candidate test session auto-submitted.");
    }
  };

  // Filtered Tests
  const filteredTests = testsList.filter((t) => {
    const matchesCategory = selectedCategory === "ALL" || t.category === selectedCategory;
    const matchesQuery =
      t.title.toLowerCase().includes(testSearch.toLowerCase()) ||
      t.examName.toLowerCase().includes(testSearch.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-gray-900 selection:bg-red-100 selection:text-red-700">
      {/* =========================================================================
          1. TOP ADMIN CONTROL HEADER (Clean full-width bar with aligned brand)
      ========================================================================== */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-2xs">
        <div className="w-full px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Left: Mobile Toggle, Brand & Desktop Collapse */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Mobile Drawer Button */}
              <button
                type="button"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-1.5 rounded-md text-gray-600 hover:text-red-600 hover:bg-red-50 border border-gray-200 cursor-pointer"
                aria-label="Toggle Navigation Drawer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* Brand Logo Link */}
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-8 h-8 rounded-md bg-red-600 p-1.5 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <Image
                    src="/logo.png"
                    alt="Your Exams Test Logo"
                    width={28}
                    height={28}
                    priority
                    className="w-5 h-5 object-contain brightness-0 invert"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="text-sm sm:text-base font-black tracking-tight text-gray-900 leading-none">
                    YOUR EXAMS TEST
                  </div>
                  <div className="text-[10px] font-bold text-red-600 tracking-wider uppercase mt-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
                    <span>Admin Control Center</span>
                  </div>
                </div>
              </Link>

              {/* Vertical Divider */}
              <div className="h-6 w-px bg-slate-200 hidden lg:block mx-1"></div>

              {/* Desktop Sidebar Collapse Toggle (Icon only, After Logo) */}
              <button
                type="button"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="hidden lg:flex w-8 h-8 items-center justify-center rounded-md text-slate-600 hover:text-red-600 hover:bg-red-50 border border-slate-200 transition cursor-pointer"
                title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                aria-label="Toggle Sidebar Collapse"
              >
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${isCollapsed ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              </button>
            </div>

            {/* Center: System Status Pill */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>CBT Engine Online (14ms Zero Latency)</span>
              <span className="text-gray-300">|</span>
              <span className="text-gray-500 font-normal">Active Aspirants: 1,842</span>
            </div>

            {/* Right: Quick Actions & Profile */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* "Create Mock Test" Button */}
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(true)}
                className="px-3 py-1.5 rounded-md bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold text-xs shadow-xs transition flex items-center gap-1.5 cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
                <span className="hidden sm:inline">Create Mock Test</span>
                <span className="sm:hidden">Create</span>
              </button>

              {/* View Public Portal */}
              <Link
                href="/"
                className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-md border border-gray-200 hover:border-red-200 text-xs font-bold text-gray-700 hover:text-red-600 transition"
              >
                <span>Live Site</span>
                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>

              {/* Notifications Dropdown Toggle */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="w-8 h-8 rounded-md border border-gray-200 hover:border-red-200 hover:bg-red-50 flex items-center justify-center text-gray-600 hover:text-red-600 transition cursor-pointer relative"
                  aria-label="View Platform Notifications"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-600"></span>
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-xl py-3 px-4 z-50 animate-in fade-in zoom-in-95 duration-100">
                    <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                      <span className="text-xs font-bold text-gray-900 uppercase">System Alerts (3)</span>
                      <button
                        type="button"
                        onClick={() => setNotificationsOpen(false)}
                        className="text-[11px] text-red-600 font-semibold hover:underline cursor-pointer"
                      >
                        Clear All
                      </button>
                    </div>
                    <div className="py-2 space-y-2 text-xs">
                      <div className="p-2 rounded-md bg-red-50/70 border border-red-100">
                        <div className="font-bold text-red-700">Tab-Switch Warning</div>
                        <div className="text-[11px] text-gray-600 mt-0.5">
                          Candidate Karan Johri switched tabs twice during RRB NTPC mock.
                        </div>
                        <div className="text-[10px] text-gray-400 mt-1">4 mins ago</div>
                      </div>
                      <div className="p-2 rounded-md bg-emerald-50 border border-emerald-100">
                        <div className="font-bold text-emerald-800">Pro Pass Purchased</div>
                        <div className="text-[11px] text-gray-600 mt-0.5">
                          Pooja Sharma upgraded to 1-Year Ultimate Pass (₹999).
                        </div>
                        <div className="text-[10px] text-gray-400 mt-1">15 mins ago</div>
                      </div>
                      <div className="p-2 rounded-md bg-gray-50 border border-gray-100">
                        <div className="font-bold text-gray-800">Auto Backup Completed</div>
                        <div className="text-[11px] text-gray-600 mt-0.5">
                          14,500 questions and aspirant scorecards synced to cloud.
                        </div>
                        <div className="text-[10px] text-gray-400 mt-1">1 hour ago</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Admin Profile Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setAdminMenuOpen(!adminMenuOpen)}
                  className="flex items-center gap-2 p-1 rounded-md border border-gray-200 hover:border-red-200 hover:bg-red-50 transition cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-md bg-gradient-to-br from-red-600 to-red-800 text-white font-black text-xs flex items-center justify-center shadow-xs">
                    {adminUser.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="hidden xl:block text-left text-xs pr-1">
                    <div className="font-bold text-gray-900 leading-tight max-w-[150px] truncate">{adminUser.name}</div>
                    <div className="text-[10px] text-gray-500">{adminUser.role}</div>
                  </div>
                  <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {adminMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl py-2 px-3 z-50 animate-in fade-in zoom-in-95 duration-100 text-xs">
                    <div className="pb-2 border-b border-gray-100">
                      <div className="font-bold text-gray-900 truncate">{adminUser.name}</div>
                      <div className="text-[11px] text-gray-500 truncate">{adminUser.email}</div>
                    </div>
                    <div className="py-2 space-y-1">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveSection("settings");
                          setAdminMenuOpen(false);
                        }}
                        className="w-full text-left px-2 py-1.5 rounded-md hover:bg-gray-50 font-semibold text-gray-700 flex items-center gap-2 cursor-pointer"
                      >
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>CBT Platform Settings</span>
                      </button>
                      <Link
                        href="/"
                        className="w-full text-left px-2 py-1.5 rounded-md hover:bg-gray-50 font-semibold text-gray-700 flex items-center gap-2"
                      >
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span>Student Portal Home</span>
                      </Link>
                    </div>
                    <div className="pt-2 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full text-left px-2 py-1.5 rounded-md text-red-600 hover:bg-red-50 font-bold flex items-center gap-2 cursor-pointer"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Log Out Admin</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* =========================================================================
          2. MAIN BODY: SIDEBAR + DASHBOARD CONTENT (Edge-to-edge docking)
      ========================================================================== */}
      <div className="flex-1 flex w-full">
        {/* Left Vertical Sidebar (Desktop & Mobile Collapsible) */}
        <aside
          className={`fixed lg:sticky top-16 z-30 h-[calc(100vh-4rem)] shrink-0 bg-white border-r border-slate-200 p-2.5 flex flex-col justify-between transition-all duration-200 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          } ${isCollapsed ? "lg:w-[68px]" : "lg:w-60"}`}
        >
          <div>
            <nav className="space-y-1 text-xs font-bold">
              {/* 1. Overview */}
              <button
                type="button"
                onClick={() => {
                  setActiveSection("overview");
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center rounded-md transition cursor-pointer text-left relative group ${
                  isCollapsed ? "justify-center p-2.5" : "gap-2.5 px-2.5 py-2"
                } ${
                  activeSection === "overview"
                    ? "bg-red-600 text-white shadow-2xs"
                    : "text-slate-600 hover:text-red-600 hover:bg-red-50/60"
                }`}
                title={isCollapsed ? "Dashboard Overview" : undefined}
              >
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                {!isCollapsed && <span>Dashboard Overview</span>}
                {isCollapsed && (
                  <div className="absolute left-full ml-2.5 px-2 py-1 bg-slate-900 text-white text-[11px] font-semibold rounded-md shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                    Dashboard Overview
                  </div>
                )}
              </button>

              {/* 2. Mock Tests */}
              <button
                type="button"
                onClick={() => {
                  setActiveSection("mock-tests");
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center rounded-md transition cursor-pointer text-left relative group ${
                  isCollapsed ? "justify-center p-2.5" : "justify-between px-2.5 py-2"
                } ${
                  activeSection === "mock-tests"
                    ? "bg-red-600 text-white shadow-2xs"
                    : "text-slate-600 hover:text-red-600 hover:bg-red-50/60"
                }`}
                title={isCollapsed ? "Mock Tests Series" : undefined}
              >
                <div className={`flex items-center ${isCollapsed ? "justify-center" : "gap-2.5"}`}>
                  <div className="relative">
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {isCollapsed && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-600"></span>
                    )}
                  </div>
                  {!isCollapsed && <span>Mock Tests Series</span>}
                </div>
                {!isCollapsed && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-black ${
                      activeSection === "mock-tests" ? "bg-white/20 text-white" : "bg-red-50 text-red-600"
                    }`}
                  >
                    {testsList.length}
                  </span>
                )}
                {isCollapsed && (
                  <div className="absolute left-full ml-2.5 px-2 py-1 bg-slate-900 text-white text-[11px] font-semibold rounded-md shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                    Mock Tests Series ({testsList.length})
                  </div>
                )}
              </button>

              {/* 3. Live CBT */}
              <button
                type="button"
                onClick={() => {
                  setActiveSection("live-cbt");
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center rounded-md transition cursor-pointer text-left relative group ${
                  isCollapsed ? "justify-center p-2.5" : "justify-between px-2.5 py-2"
                } ${
                  activeSection === "live-cbt"
                    ? "bg-red-600 text-white shadow-2xs"
                    : "text-slate-600 hover:text-red-600 hover:bg-red-50/60"
                }`}
                title={isCollapsed ? "Live CBT Sessions" : undefined}
              >
                <div className={`flex items-center ${isCollapsed ? "justify-center" : "gap-2.5"}`}>
                  <div className="relative">
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    {isCollapsed && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    )}
                  </div>
                  {!isCollapsed && <span>Live CBT Sessions</span>}
                </div>
                {!isCollapsed && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                )}
                {isCollapsed && (
                  <div className="absolute left-full ml-2.5 px-2 py-1 bg-slate-900 text-white text-[11px] font-semibold rounded-md shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                    Live CBT Sessions
                  </div>
                )}
              </button>

              {/* 4. Question Bank */}
              <button
                type="button"
                onClick={() => {
                  setActiveSection("questions");
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center rounded-md transition cursor-pointer text-left relative group ${
                  isCollapsed ? "justify-center p-2.5" : "gap-2.5 px-2.5 py-2"
                } ${
                  activeSection === "questions"
                    ? "bg-red-600 text-white shadow-2xs"
                    : "text-slate-600 hover:text-red-600 hover:bg-red-50/60"
                }`}
                title={isCollapsed ? "Question Bank" : undefined}
              >
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {!isCollapsed && <span>Question Bank</span>}
                {isCollapsed && (
                  <div className="absolute left-full ml-2.5 px-2 py-1 bg-slate-900 text-white text-[11px] font-semibold rounded-md shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                    Question Bank (14,500+ Qs)
                  </div>
                )}
              </button>

              {/* 5. Aspirants Directory */}
              <button
                type="button"
                onClick={() => {
                  setActiveSection("aspirants");
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center rounded-md transition cursor-pointer text-left relative group ${
                  isCollapsed ? "justify-center p-2.5" : "gap-2.5 px-2.5 py-2"
                } ${
                  activeSection === "aspirants"
                    ? "bg-red-600 text-white shadow-2xs"
                    : "text-slate-600 hover:text-red-600 hover:bg-red-50/60"
                }`}
                title={isCollapsed ? "Aspirants Directory" : undefined}
              >
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                {!isCollapsed && <span>Aspirants Directory</span>}
                {isCollapsed && (
                  <div className="absolute left-full ml-2.5 px-2 py-1 bg-slate-900 text-white text-[11px] font-semibold rounded-md shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                    Aspirants Directory
                  </div>
                )}
              </button>

              {/* 6. Pass & Revenue */}
              <button
                type="button"
                onClick={() => {
                  setActiveSection("revenue");
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center rounded-md transition cursor-pointer text-left relative group ${
                  isCollapsed ? "justify-center p-2.5" : "gap-2.5 px-2.5 py-2"
                } ${
                  activeSection === "revenue"
                    ? "bg-red-600 text-white shadow-2xs"
                    : "text-slate-600 hover:text-red-600 hover:bg-red-50/60"
                }`}
                title={isCollapsed ? "Pass & Revenue" : undefined}
              >
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {!isCollapsed && <span>Pass &amp; Revenue</span>}
                {isCollapsed && (
                  <div className="absolute left-full ml-2.5 px-2 py-1 bg-slate-900 text-white text-[11px] font-semibold rounded-md shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                    Pass &amp; Revenue Analytics
                  </div>
                )}
              </button>

              {/* 7. Settings */}
              <button
                type="button"
                onClick={() => {
                  setActiveSection("settings");
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center rounded-md transition cursor-pointer text-left relative group ${
                  isCollapsed ? "justify-center p-2.5" : "gap-2.5 px-2.5 py-2"
                } ${
                  activeSection === "settings"
                    ? "bg-red-600 text-white shadow-2xs"
                    : "text-slate-600 hover:text-red-600 hover:bg-red-50/60"
                }`}
                title={isCollapsed ? "CBT Rules & Config" : undefined}
              >
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {!isCollapsed && <span>CBT Rules &amp; Config</span>}
                {isCollapsed && (
                  <div className="absolute left-full ml-2.5 px-2 py-1 bg-slate-900 text-white text-[11px] font-semibold rounded-md shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                    CBT Rules &amp; Config
                  </div>
                )}
              </button>
            </nav>
          </div>

          {/* Sidebar Footer Card */}
          <div className="pt-2 border-t border-slate-100">
            {!isCollapsed ? (
              <div className="p-2.5 rounded-md bg-red-50/70 border border-red-100 text-xs">
                <div className="font-bold text-red-900 flex items-center justify-between">
                  <span>NTA Engine v2.4</span>
                  <span className="text-[9px] bg-red-600 text-white px-1.5 py-0.5 rounded font-black">
                    ACTIVE
                  </span>
                </div>
                <p className="text-[11px] text-red-700/80 mt-1">
                  TCS &amp; NTA authentic exam timing &amp; negative marking synchronized.
                </p>
              </div>
            ) : (
              <div
                className="p-1.5 rounded-md bg-red-50 border border-red-100 text-center"
                title="NTA Engine v2.4 Active"
              >
                <span className="text-[9px] font-black text-red-600 block leading-tight">
                  NTA
                </span>
              </div>
            )}
          </div>
        </aside>

        {/* Mobile Sidebar Backdrop */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 z-20 bg-black/40 backdrop-blur-2xs lg:hidden"
          ></div>
        )}

        {/* Right Content Area (Fills remaining width cleanly) */}
        <main className="flex-1 min-w-0 p-5 sm:p-6 lg:p-8 space-y-6 overflow-y-auto">
          {/* =========================================================================
              VIEW 1: OVERVIEW (METRICS, RECENT STATS & GRAPHS)
          ========================================================================== */}
          {activeSection === "overview" && (
            <div className="space-y-6">
              {/* Header Title */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Examination Command Dashboard
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Real-time mock test metrics, live candidate attempts, and question bank status.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-medium">Last synced: Just now</span>
                  <button
                    type="button"
                    onClick={() => showToast("Metrics refreshed from live CBT nodes.")}
                    className="p-1.5 rounded-md border border-slate-200 hover:bg-slate-100 text-slate-600 transition cursor-pointer"
                    title="Refresh Live Data"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* 4 Core KPI Cards (Clean rounded-lg border radius) */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg p-4 sm:p-5 border border-slate-200 shadow-2xs hover:border-red-200 transition">
                  <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
                    <span>Registered Aspirants</span>
                    <span className="p-1.5 rounded-md bg-red-50 text-red-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </span>
                  </div>
                  <div className="text-2xl font-black text-slate-900 mt-2">1,28,450</div>
                  <div className="text-[11px] text-emerald-600 font-bold mt-1 flex items-center gap-1">
                    <span>&uarr; 14.2%</span>
                    <span className="text-slate-400 font-medium">from last month</span>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 sm:p-5 border border-slate-200 shadow-2xs hover:border-red-200 transition">
                  <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
                    <span>Active Mock Tests</span>
                    <span className="p-1.5 rounded-md bg-red-50 text-red-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </span>
                  </div>
                  <div className="text-2xl font-black text-slate-900 mt-2">{testsList.length} Series</div>
                  <div className="text-[11px] text-emerald-600 font-bold mt-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>100% Live &amp; Bilingual</span>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 sm:p-5 border border-slate-200 shadow-2xs hover:border-red-200 transition">
                  <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
                    <span>Today&apos;s Test Attempts</span>
                    <span className="p-1.5 rounded-md bg-red-50 text-red-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </span>
                  </div>
                  <div className="text-2xl font-black text-slate-900 mt-2">12,840</div>
                  <div className="text-[11px] text-slate-500 font-semibold mt-1">
                    Peak: <span className="font-bold text-slate-800">842 attempts/hr</span>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 sm:p-5 border border-slate-200 shadow-2xs hover:border-red-200 transition">
                  <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
                    <span>Pass Sales &amp; Revenue</span>
                    <span className="p-1.5 rounded-md bg-red-50 text-red-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                  </div>
                  <div className="text-2xl font-black text-red-600 mt-2">₹8,42,600</div>
                  <div className="text-[11px] text-emerald-600 font-bold mt-1 flex items-center gap-1">
                    <span>&uarr; 18.5%</span>
                    <span className="text-slate-400 font-medium">7-day run rate</span>
                  </div>
                </div>
              </div>

              {/* Grid: Live CBT Node Status & Recent Activity (Well-balanced 8:4 ratio) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* 8 Cols: Live Exam Monitoring Snapshot */}
                <div className="lg:col-span-8 bg-white rounded-lg p-5 border border-slate-200 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <h2 className="text-sm font-black text-slate-900">
                        Live Exam Sessions in Progress
                      </h2>
                      <p className="text-xs text-slate-500">
                        Aspirants currently answering timed questions in real CBT simulation.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveSection("live-cbt")}
                      className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                    >
                      <span>View All ({liveSessions.length})</span>
                      <span>&rarr;</span>
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[10px]">
                        <tr>
                          <th className="py-2.5 px-3">Candidate</th>
                          <th className="py-2.5 px-3">Test Series</th>
                          <th className="py-2.5 px-3">Time Left</th>
                          <th className="py-2.5 px-3">Progress</th>
                          <th className="py-2.5 px-3 text-right">Integrity</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {liveSessions.map((s) => (
                          <tr key={s.id} className="hover:bg-slate-50/70 transition">
                            <td className="py-3 px-3 font-bold text-slate-900">
                              {s.aspirantName}
                              <span className="block text-[10px] text-slate-400 font-mono">
                                #{s.rollNo}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-slate-700 max-w-[200px] truncate">
                              {s.testTitle}
                            </td>
                            <td className="py-3 px-3 font-mono font-bold text-red-600">
                              {s.timeLeft}
                            </td>
                            <td className="py-3 px-3">
                              <span className="font-bold text-slate-900">
                                {s.answeredCount}/{s.totalQuestions}
                              </span>
                              <div className="w-24 bg-slate-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
                                <div
                                  className="bg-red-600 h-full rounded-full"
                                  style={{
                                    width: `${(s.answeredCount / s.totalQuestions) * 100}%`,
                                  }}
                                ></div>
                              </div>
                            </td>
                            <td className="py-3 px-3 text-right">
                              {s.status === "Normal" ? (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                  0 Flags
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                                  2 Switches
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 4 Cols: Platform Server Health & Diagnostics */}
                <div className="lg:col-span-4 bg-white rounded-lg p-5 border border-slate-200 shadow-2xs space-y-4">
                  <div className="pb-3 border-b border-slate-100">
                    <h2 className="text-sm font-black text-slate-900">
                      CBT Cluster Nodes
                    </h2>
                    <p className="text-xs text-slate-500">
                      Real-time latency and anti-cheating services.
                    </p>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div className="p-2.5 rounded-md bg-slate-50/80 border border-slate-200 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-slate-900">Primary Node (Mumbai-01)</div>
                        <div className="text-[11px] text-slate-500">Active Sessions: 1,120</div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-black text-[10px] border border-emerald-200">
                        12ms ONLINE
                      </span>
                    </div>

                    <div className="p-2.5 rounded-md bg-slate-50/80 border border-slate-200 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-slate-900">Secondary Node (Delhi-02)</div>
                        <div className="text-[11px] text-slate-500">Active Sessions: 722</div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-black text-[10px] border border-emerald-200">
                        16ms ONLINE
                      </span>
                    </div>

                    <div className="p-2.5 rounded-md bg-slate-50/80 border border-slate-200 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-slate-900">AIR Ranking Calculator</div>
                        <div className="text-[11px] text-slate-500">Live Percentile Algorithm</div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-black text-[10px] border border-emerald-200">
                        ACTIVE
                      </span>
                    </div>

                    <div className="p-2.5 rounded-md bg-slate-50/80 border border-slate-200 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-slate-900">Tab-Switch Detector</div>
                        <div className="text-[11px] text-slate-500">Anti-Cheating Sandbox</div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-black text-[10px] border border-emerald-200">
                        ACTIVE
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 2: MOCK TESTS SERIES MANAGEMENT (CRUD)
          ========================================================================== */}
          {activeSection === "mock-tests" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Mock Test Series Catalog
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Create, edit, configure marking schemes, and publish competitive test series.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(true)}
                  className="px-3.5 py-2 rounded-md bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold text-xs shadow-xs transition flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Create New Mock Test</span>
                </button>
              </div>

              {/* Filters Bar */}
              <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-2xs flex flex-col md:flex-row gap-3 items-center justify-between">
                <div className="relative w-full md:w-96">
                  <svg className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    value={testSearch}
                    onChange={(e) => setTestSearch(e.target.value)}
                    placeholder="Search test series by title, exam, or keyword..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs rounded-md border border-slate-200 focus:outline-none focus:border-red-500 font-medium"
                  />
                </div>

                <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                  {["ALL", "SSC", "Railway", "Banking", "Teaching", "Defense"].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-2.5 py-1 rounded-md text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                        selectedCategory === cat
                          ? "bg-red-600 text-white shadow-2xs"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Test Catalog Table */}
              <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold">
                      <tr>
                        <th className="py-3 px-4">Test Title</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Exam Specs</th>
                        <th className="py-3 px-4">Access Tier</th>
                        <th className="py-3 px-4">Aspirants</th>
                        <th className="py-3 px-4">Rating</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredTests.map((test) => (
                        <tr key={test.id} className="hover:bg-red-50/20 transition">
                          <td className="py-3 px-4 font-bold text-slate-900 max-w-sm">
                            <div className="truncate">{test.title}</div>
                            <span className="text-[10px] text-slate-400 font-mono">
                              ID: {test.id}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold text-[10px]">
                              {test.category}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-slate-600">
                            <div className="font-bold text-slate-800">
                              {test.questions} Qs &bull; {test.durationMinutes} Mins
                            </div>
                            <div className="text-[10px] text-slate-500 mt-0.5">
                              Max Marks: {test.totalMarks}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            {test.isFree ? (
                              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-200">
                                Free Starter
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-bold text-[10px] border border-amber-200">
                                Pro Pass Required
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4 font-black text-slate-900">
                            {test.participants.toLocaleString()}
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-bold text-slate-800">★ {test.rating}</span>
                          </td>
                          <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                            <button
                              type="button"
                              onClick={() => showToast(`Configuring question sets for ${test.title}`)}
                              className="text-slate-600 hover:text-red-600 font-bold text-[11px] cursor-pointer"
                            >
                              Edit Qs
                            </button>
                            <span className="text-slate-300">|</span>
                            <button
                              type="button"
                              onClick={() => handleDeleteTest(test.id)}
                              className="text-red-600 hover:text-red-800 font-bold text-[11px] cursor-pointer"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 3: LIVE CBT SESSIONS MONITOR
          ========================================================================== */}
          {activeSection === "live-cbt" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Real-Time CBT Exam Monitoring
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Live candidate inspection, tab-switch anomaly detection, and session control.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  <span className="text-xs font-bold text-emerald-700">Live Socket Streaming</span>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
                <div className="p-3.5 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 uppercase">
                    Active Candidates in Test Window ({liveSessions.length})
                  </span>
                  <span className="text-xs text-slate-400">Auto-refreshing every 5 seconds</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold">
                      <tr>
                        <th className="py-3 px-4">Aspirant Name</th>
                        <th className="py-3 px-4">Roll Number</th>
                        <th className="py-3 px-4">Active Test Series</th>
                        <th className="py-3 px-4">Time Left</th>
                        <th className="py-3 px-4">Answered</th>
                        <th className="py-3 px-4">IP &amp; Cluster</th>
                        <th className="py-3 px-4">Tab Violations</th>
                        <th className="py-3 px-4 text-right">Emergency Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {liveSessions.map((session) => (
                        <tr key={session.id} className="hover:bg-red-50/20 transition">
                          <td className="py-3 px-4 font-bold text-slate-900">
                            {session.aspirantName}
                          </td>
                          <td className="py-3 px-4 font-mono font-medium text-slate-600">
                            {session.rollNo}
                          </td>
                          <td className="py-3 px-4 text-slate-800 font-medium max-w-xs truncate">
                            {session.testTitle}
                          </td>
                          <td className="py-3 px-4 font-mono font-black text-red-600">
                            {session.timeLeft}
                          </td>
                          <td className="py-3 px-4 font-bold text-slate-900">
                            {session.answeredCount} / {session.totalQuestions}
                          </td>
                          <td className="py-3 px-4 text-[11px] text-slate-500">
                            {session.ipLocation}
                          </td>
                          <td className="py-3 px-4">
                            {session.tabSwitches > 0 ? (
                              <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 font-black text-[10px] border border-red-200">
                                {session.tabSwitches} Switches Warning
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-200">
                                Clean (0)
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => handleTerminateLiveSession(session.id)}
                              className="px-2.5 py-1 rounded-md bg-red-50 hover:bg-red-100 text-red-600 font-bold text-[11px] border border-red-200 transition cursor-pointer"
                            >
                              Auto-Submit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 4: QUESTION BANK REPOSITORY
          ========================================================================== */}
          {activeSection === "questions" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Bilingual Question Bank Repository
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    14,500+ NTA/TCS-pattern questions in English and Hindi with detailed step-by-step solutions.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => showToast("Opening Question Authoring Engine...")}
                  className="px-3.5 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-xs transition cursor-pointer self-start sm:self-auto"
                >
                  + Add New Question
                </button>
              </div>

              {/* Subject Breakdown Cards (rounded-lg) */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs">
                  <div className="text-xs font-bold text-slate-500">Quantitative Aptitude</div>
                  <div className="text-2xl font-black text-slate-900 mt-1">4,200 Qs</div>
                  <div className="text-[11px] text-red-600 font-semibold mt-1">Arithmetic &amp; Advanced</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs">
                  <div className="text-xs font-bold text-slate-500">Reasoning Ability</div>
                  <div className="text-2xl font-black text-slate-900 mt-1">3,850 Qs</div>
                  <div className="text-[11px] text-red-600 font-semibold mt-1">Verbal &amp; Non-Verbal</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs">
                  <div className="text-xs font-bold text-slate-500">General Awareness</div>
                  <div className="text-2xl font-black text-slate-900 mt-1">4,100 Qs</div>
                  <div className="text-[11px] text-red-600 font-semibold mt-1">Static GK &amp; Science</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs">
                  <div className="text-xs font-bold text-slate-500">English Language</div>
                  <div className="text-2xl font-black text-slate-900 mt-1">2,350 Qs</div>
                  <div className="text-[11px] text-red-600 font-semibold mt-1">Grammar &amp; Comprehension</div>
                </div>
              </div>

              {/* Sample Questions Card Preview */}
              <div className="space-y-3.5">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  Sample Repository Questions
                </h3>
                <div className="grid grid-cols-1 gap-3.5">
                  {sampleQuestions.map((q, idx) => (
                    <div
                      key={q.id}
                      className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs space-y-2.5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-slate-400">
                            #{idx + 1} &bull; {q.id}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold">
                            {q.subject}
                          </span>
                          <span className="text-[11px] text-slate-500 font-medium">
                            {q.topic}
                          </span>
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            q.difficulty === "Easy"
                              ? "bg-emerald-50 text-emerald-700"
                              : q.difficulty === "Moderate"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-red-50 text-red-700"
                          }`}
                        >
                          {q.difficulty}
                        </span>
                      </div>

                      {/* Question English */}
                      <div>
                        <span className="text-[10px] font-bold text-red-600 uppercase">English:</span>
                        <p className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">
                          {q.questionEn}
                        </p>
                      </div>

                      {/* Question Hindi */}
                      <div>
                        <span className="text-[10px] font-bold text-red-600 uppercase">हिंदी:</span>
                        <p className="text-xs sm:text-sm font-medium text-slate-800 mt-0.5">
                          {q.questionHi}
                        </p>
                      </div>

                      {/* Options Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1.5">
                        {q.options.map((opt, oIdx) => (
                          <div
                            key={oIdx}
                            className={`p-2 rounded-md text-xs font-medium border ${
                              oIdx === q.correctOption
                                ? "bg-emerald-50 border-emerald-300 text-emerald-800 font-bold"
                                : "bg-slate-50 border-slate-200 text-slate-700"
                            }`}
                          >
                            <span className="font-bold mr-1.5">({String.fromCharCode(65 + oIdx)})</span>
                            <span>{opt}</span>
                            {oIdx === q.correctOption && (
                              <span className="ml-1 text-[10px] text-emerald-600 font-black">
                                &check;
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 5: ASPIRANTS DIRECTORY
          ========================================================================== */}
          {activeSection === "aspirants" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Aspirants &amp; Candidates Directory
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Student profiles, overall test performance, All India Rank (AIR), and Pass status.
                  </p>
                </div>
                <div className="text-xs font-bold text-slate-600">
                  Total Aspirants: <span className="text-red-600">1,28,450</span>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold">
                      <tr>
                        <th className="py-3 px-4">Aspirant ID</th>
                        <th className="py-3 px-4">Candidate Details</th>
                        <th className="py-3 px-4">Target Exam</th>
                        <th className="py-3 px-4">Pass Tier</th>
                        <th className="py-3 px-4">Mocks Attempted</th>
                        <th className="py-3 px-4">Best AIR</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Scorecard</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {aspirantsList.map((asp) => (
                        <tr key={asp.id} className="hover:bg-red-50/20 transition">
                          <td className="py-3 px-4 font-mono font-bold text-slate-500">
                            {asp.id}
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-bold text-slate-900">{asp.name}</div>
                            <div className="text-[10px] text-slate-400">{asp.email}</div>
                          </td>
                          <td className="py-3 px-4 font-bold text-slate-800">
                            {asp.targetExam}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                asp.passTier.includes("Ultimate")
                                  ? "bg-red-50 text-red-700 border border-red-200"
                                  : asp.passTier.includes("6-Month")
                                  ? "bg-amber-50 text-amber-700 border border-amber-200"
                                  : "bg-slate-100 text-slate-600"
                              }`}
                            >
                              {asp.passTier}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-bold text-slate-900">
                            {asp.testsTaken} Tests
                          </td>
                          <td className="py-3 px-4 font-black text-red-600">
                            AIR #{asp.bestAIR}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                asp.status === "In Live Test"
                                  ? "bg-amber-50 text-amber-700 border border-amber-200"
                                  : asp.status === "Active"
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                  : "bg-slate-100 text-slate-500"
                              }`}
                            >
                              {asp.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => setSelectedCandidate(asp)}
                              className="px-2.5 py-1 rounded-md bg-red-600 hover:bg-red-700 text-white font-bold text-[11px] transition cursor-pointer"
                            >
                              Scorecard
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 6: PASS & REVENUE ANALYTICS
          ========================================================================== */}
          {activeSection === "revenue" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Pass Subscriptions &amp; Revenue
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Track Pro Pass upgrades, payment gateway settlements, and subscription growth.
                  </p>
                </div>
                <div className="text-xs font-bold text-slate-500">Currency: INR (₹)</div>
              </div>

              {/* Pass Tier Breakdown Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs">
                  <div className="text-xs font-bold text-slate-500 uppercase">1-Year Ultimate Pass</div>
                  <div className="text-2xl font-black text-slate-900 mt-2">₹5,40,459</div>
                  <div className="text-xs text-emerald-600 font-bold mt-1">541 active subscriptions</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs">
                  <div className="text-xs font-bold text-slate-500 uppercase">6-Month Exam Pass</div>
                  <div className="text-2xl font-black text-slate-900 mt-2">₹2,12,046</div>
                  <div className="text-xs text-emerald-600 font-bold mt-1">354 active subscriptions</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs">
                  <div className="text-xs font-bold text-slate-500 uppercase">3-Month Sprint Pass</div>
                  <div className="text-2xl font-black text-slate-900 mt-2">₹90,095</div>
                  <div className="text-xs text-emerald-600 font-bold mt-1">258 active subscriptions</div>
                </div>
              </div>

              {/* Transactions Table */}
              <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
                <div className="p-3.5 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 uppercase">
                    Recent Pass Orders &amp; Payments
                  </span>
                  <span className="text-xs text-emerald-600 font-bold">100% Gateway Success</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold">
                      <tr>
                        <th className="py-3 px-4">Transaction ID</th>
                        <th className="py-3 px-4">Aspirant</th>
                        <th className="py-3 px-4">Pass Tier</th>
                        <th className="py-3 px-4">Amount Paid</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {transactions.map((t) => (
                        <tr key={t.id} className="hover:bg-slate-50/70 transition">
                          <td className="py-3 px-4 font-mono font-bold text-slate-500">{t.id}</td>
                          <td className="py-3 px-4 font-bold text-slate-900">{t.user}</td>
                          <td className="py-3 px-4 font-medium text-slate-700">{t.plan}</td>
                          <td className="py-3 px-4 font-black text-red-600">{t.amount}</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-200">
                              {t.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right text-slate-500">{t.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 7: CBT RULES & PLATFORM SETTINGS
          ========================================================================== */}
          {activeSection === "settings" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  CBT Simulator Engine Configuration
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Adjust default exam timing rules, negative marking formulas, and anti-cheating protocols.
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs space-y-4 max-w-3xl">
                <div className="space-y-3.5 text-xs">
                  <div>
                    <label className="block font-bold text-slate-800 mb-1">
                      Official Portal Brand Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Your Exams Test"
                      className="w-full p-2.5 rounded-md border border-slate-200 font-medium focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block font-bold text-slate-800 mb-1">
                        Default SSC Negative Marking (Marks per wrong answer)
                      </label>
                      <input
                        type="text"
                        defaultValue="-0.50 (25% penalty)"
                        className="w-full p-2.5 rounded-md border border-slate-200 font-medium focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-800 mb-1">
                        Default Railway Negative Marking
                      </label>
                      <input
                        type="text"
                        defaultValue="-0.33 (33.3% penalty)"
                        className="w-full p-2.5 rounded-md border border-slate-200 font-medium focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>

                  <div className="pt-2 space-y-2.5">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 accent-red-600 rounded"
                      />
                      <span className="font-bold text-slate-800">
                        Enable Full-Screen Anti-Cheating Lock in CBT Simulator
                      </span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 accent-red-600 rounded"
                      />
                      <span className="font-bold text-slate-800">
                        Enforce Bilingual Question Palette (English &amp; Hindi)
                      </span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 accent-red-600 rounded"
                      />
                      <span className="font-bold text-slate-800">
                        Instant All India Rank (AIR) calculation upon mock submission
                      </span>
                    </label>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                    <button
                      type="button"
                      onClick={() => showToast("CBT Engine settings saved successfully!")}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold rounded-md transition shadow-2xs cursor-pointer"
                    >
                      Save Configuration
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* =========================================================================
          MODAL: CREATE NEW MOCK TEST (Clean rounded-lg border radius)
      ========================================================================== */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-5 sm:p-6 shadow-xl border border-red-100 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600"></span>
                <h3 className="text-base font-black text-slate-900">
                  Publish New Mock Test Series
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-red-600 font-bold text-lg transition cursor-pointer"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateMockTest} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Mock Test Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g., SSC CGL 2026 Tier-1 : Mega All India Mock 03"
                  className="w-full p-2.5 rounded-md border border-slate-200 focus:outline-none focus:border-red-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Exam Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full p-2.5 rounded-md border border-slate-200 focus:outline-none focus:border-red-500 bg-white font-medium"
                  >
                    <option value="SSC">SSC</option>
                    <option value="Railway">Railway</option>
                    <option value="Banking">Banking</option>
                    <option value="Teaching">Teaching</option>
                    <option value="Defense">Defense</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Target Exam Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newExamName}
                    onChange={(e) => setNewExamName(e.target.value)}
                    placeholder="e.g. SSC CGL 2026"
                    className="w-full p-2.5 rounded-md border border-slate-200 focus:outline-none focus:border-red-500 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Questions
                  </label>
                  <input
                    type="number"
                    value={newQuestions}
                    onChange={(e) => setNewQuestions(Number(e.target.value))}
                    className="w-full p-2.5 rounded-md border border-slate-200 focus:outline-none focus:border-red-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Duration (Mins)
                  </label>
                  <input
                    type="number"
                    value={newDuration}
                    onChange={(e) => setNewDuration(Number(e.target.value))}
                    className="w-full p-2.5 rounded-md border border-slate-200 focus:outline-none focus:border-red-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Total Marks
                  </label>
                  <input
                    type="number"
                    value={newTotalMarks}
                    onChange={(e) => setNewTotalMarks(Number(e.target.value))}
                    className="w-full p-2.5 rounded-md border border-slate-200 focus:outline-none focus:border-red-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Negative Penalty per wrong answer
                </label>
                <input
                  type="text"
                  value={newNegativeMark}
                  onChange={(e) => setNewNegativeMark(e.target.value)}
                  placeholder="e.g., 0.50 marks"
                  className="w-full p-2.5 rounded-md border border-slate-200 focus:outline-none focus:border-red-500 font-medium"
                />
              </div>

              <div className="p-3 rounded-md bg-slate-50 border border-slate-200 space-y-1.5">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newIsFree}
                    onChange={(e) => setNewIsFree(e.target.checked)}
                    className="w-4 h-4 accent-red-600 rounded"
                  />
                  <div>
                    <span className="font-bold text-slate-900 block">
                      Make this mock test FREE for all aspirants
                    </span>
                    <span className="text-[10px] text-slate-500">
                      Uncheck to require Pro Pass upgrade.
                    </span>
                  </div>
                </label>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-3.5 py-2 rounded-md border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white font-bold cursor-pointer shadow-2xs"
                >
                  Publish Test Series
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: CANDIDATE SCORECARD INSPECTOR (Clean rounded-lg)
      ========================================================================== */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-5 sm:p-6 shadow-xl border border-red-100 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-black text-slate-900">
                  Aspirant Scorecard &amp; AIR
                </h3>
                <span className="text-[10px] text-slate-400 font-mono">
                  ID: {selectedCandidate.id}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCandidate(null)}
                className="text-slate-400 hover:text-red-600 font-bold text-lg cursor-pointer"
              >
                &times;
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-md bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900 text-sm">
                  {selectedCandidate.name}
                </div>
                <div className="text-slate-500 text-[11px] mt-0.5">
                  {selectedCandidate.email}
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-red-50 text-red-700 font-bold text-[10px]">
                    {selectedCandidate.targetExam}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-bold text-[10px]">
                    {selectedCandidate.passTier}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-md bg-red-50 border border-red-100 text-center">
                  <span className="text-slate-500 text-[10px] font-bold block">
                    BEST ALL INDIA RANK
                  </span>
                  <span className="text-xl font-black text-red-600 mt-1 block">
                    AIR #{selectedCandidate.bestAIR}
                  </span>
                </div>
                <div className="p-3 rounded-md bg-emerald-50 border border-emerald-100 text-center">
                  <span className="text-slate-500 text-[10px] font-bold block">
                    AVERAGE SCORE
                  </span>
                  <span className="text-base font-black text-emerald-700 mt-1 block">
                    {selectedCandidate.averageScore}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-md bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex justify-between text-slate-600">
                  <span>Mocks Completed:</span>
                  <span className="font-bold text-slate-900">{selectedCandidate.testsTaken} Tests</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Accuracy Rate:</span>
                  <span className="font-bold text-emerald-600">89.4%</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Avg Time Per Question:</span>
                  <span className="font-bold text-slate-900">42 seconds</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Anti-Cheating Integrity Score:</span>
                  <span className="font-bold text-emerald-600">100% (No Flags)</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedCandidate(null)}
                className="px-3.5 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-bold py-2.5 px-3.5 rounded-md shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-150">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
