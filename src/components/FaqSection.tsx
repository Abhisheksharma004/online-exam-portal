import React from "react";

export default function FaqSection() {
  return (
    <section id="faqs" className="scroll-mt-24 py-16 bg-red-50/40 border-t border-red-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <div className="inline-block text-xs font-bold text-red-600 bg-white border border-red-200 px-3 py-1 rounded-full uppercase tracking-wider">
            Help &amp; Answers
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
            Frequently Asked Questions (FAQs)
          </h2>
        </div>

        <div className="space-y-4">
          <details className="bg-white p-5 rounded-lg border border-red-200 shadow-sm group">
            <summary className="font-bold text-gray-900 cursor-pointer list-none flex justify-between items-center">
              <span>Are the mock tests labeled with &apos;FREE&apos; genuinely free of cost?</span>
              <span className="text-red-600 text-xl font-bold group-open:rotate-45 transition">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
              Yes, absolutely! All tests marked with the &apos;FREE&apos; badge are 100% free with no hidden
              fees. You can take the full test and view your detailed scorecard and solutions instantly.
            </p>
          </details>

          <details className="bg-white p-5 rounded-lg border border-red-200 shadow-sm group">
            <summary className="font-bold text-gray-900 cursor-pointer list-none flex justify-between items-center">
              <span>Can I toggle between English and Hindi during the examination?</span>
              <span className="text-red-600 text-xl font-bold group-open:rotate-45 transition">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
              Yes, our tests are fully bilingual. You can toggle the language of any question between
              English and Hindi at any time during the test with a single click.
            </p>
          </details>

          <details className="bg-white p-5 rounded-lg border border-red-200 shadow-sm group">
            <summary className="font-bold text-gray-900 cursor-pointer list-none flex justify-between items-center">
              <span>When do I receive my rank, scorecard, and answer solutions?</span>
              <span className="text-red-600 text-xl font-bold group-open:rotate-45 transition">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
              Immediately after submitting your test, your comprehensive result report is generated
              showing your score, accuracy rate, percentile, All India Rank, and step-by-step solutions.
            </p>
          </details>
        </div>
      </div>
    </section>
  );
}
