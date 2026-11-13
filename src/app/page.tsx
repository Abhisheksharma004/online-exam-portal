"use client";

import React, { useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import TopAlertBar from "@/components/TopAlertBar";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import CategoryFilter from "@/components/CategoryFilter";
import MockTestsSection from "@/components/MockTestsSection";
import LiveCbtDemo from "@/components/LiveCbtDemo";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import FaqSection from "@/components/FaqSection";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import { mockTestsData, categoriesList } from "@/data/mockTests";
import { MockTest } from "@/types/exam";

const subscribeStorage = (callback: () => void) => {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

const getStudentSnapshot = () => {
  try {
    return localStorage.getItem("yet_student_name");
  } catch {
    return null;
  }
};

const getServerSnapshot = () => null;

export default function HomePage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [loggedOut, setLoggedOut] = useState(false);

  const storedUser = useSyncExternalStore(subscribeStorage, getStudentSnapshot, getServerSnapshot);
  const loggedInUser = loggedOut ? null : storedUser;

  const handleLogout = () => {
    try {
      localStorage.removeItem("yet_student_name");
    } catch {
      // safe fallback
    }
    setLoggedOut(true);
  };

  // Scroll to tests section with header offset
  const scrollToTests = () => {
    const el = document.getElementById("mock-tests");
    if (el) {
      const headerOffset = 84;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Protect test access: requires login
  const handleStartTest = (test?: MockTest) => {
    if (!loggedInUser) {
      alert("Please login first to start your mock test.");
      router.push("/login");
      return;
    }

    alert(`Welcome ${loggedInUser}! Your test "${test?.title || "Mock Test"}" will start shortly.`);
  };

  // Handle plan selection in Pricing
  const handleSelectPlan = (planName: string) => {
    if (planName.toLowerCase().includes("free")) {
      handleStartTest();
    } else {
      router.push("/login");
    }
  };

  // Filtered Tests
  const filteredTests = mockTestsData.filter((test) => {
    const matchesCat =
      selectedCategory === "ALL" || test.category === selectedCategory;
    const matchesQuery =
      test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.examName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans selection:bg-red-100 selection:text-red-700">
      {/* 1. Top Alert Notification Bar */}
      <TopAlertBar onQuickAction={() => handleStartTest(mockTestsData[0])} />

      {/* 2. Navigation Header */}
      <Navbar
        onStartFreeTestClick={() => handleStartTest()}
        userName={loggedInUser}
        onLogout={handleLogout}
      />

      {/* 3. Hero Section */}
      <HeroSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchSubmit={scrollToTests}
        onExploreTestsClick={scrollToTests}
        onStartFeaturedTest={(test) => handleStartTest(test)}
        featuredTest={mockTestsData[0]}
      />

      {/* 4. Stats Counter Bar */}
      <StatsBar />

      {/* 5. Exam Categories Filter */}
      <CategoryFilter
        categories={categoriesList}
        selectedCategory={selectedCategory}
        onSelectCategory={(catId) => {
          setSelectedCategory(catId);
          scrollToTests();
        }}
      />

      {/* 6. Mock Tests Listing Grid */}
      <MockTestsSection
        tests={filteredTests}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        onSelectCategory={setSelectedCategory}
        onResetFilters={() => {
          setSelectedCategory("ALL");
          setSearchQuery("");
        }}
        onStartTest={(test) => handleStartTest(test)}
      />

      {/* 7. Interactive Live CBT Demo */}
      <LiveCbtDemo onOpenFullTest={() => handleStartTest(mockTestsData[0])} />

      {/* 8. Features (Why Choose Us) */}
      <FeaturesSection />

      {/* 9. Aspirant Testimonials */}
      <TestimonialsSection />

      {/* 10. Pricing Plans (Passes) */}
      <PricingSection onSelectPlan={handleSelectPlan} />

      {/* 11. FAQs */}
      <FaqSection />

      {/* 12. Bottom CTA Banner */}
      <CtaBanner
        onStartFreeClick={() => handleStartTest()}
        onLoginClick={() => router.push("/login")}
      />

      {/* 13. Footer */}
      <Footer />
    </div>
  );
}
