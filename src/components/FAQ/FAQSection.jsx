import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    question: "Is BillCraft truly 100% client-side? Where is my financial data stored?",
    answer:
      "Yes. BillCraft runs entirely in your web browser. There are no backend databases, no server tracking, and no third-party telemetry. All your business profiles, client records, and invoice drafts remain strictly in your browser's private localStorage. When you download a PDF or generate a QR code, all rendering is calculated on your own device.",
    category: "privacy",
  },
  {
    question: "How does the UPI QR Code generator work?",
    answer:
      "BillCraft formats a standardized NPCI UPI deep link (upi://pay?pa=...&pn=...&am=...) and renders it dynamically into an SVG/Canvas QR code using client-side JavaScript. When your client points their mobile phone camera, Google Pay, PhonePe, Paytm, or BHIM app at the invoice, it immediately opens their payment screen pre-filled with your UPI ID and the exact invoice total.",
    category: "features",
  },
  {
    question: "How does the GST calculation handle CGST, SGST, and IGST for Indian businesses?",
    answer:
      "Under the Indian Goods and Services Tax (GST) regime, sales within the same state (Intra-state) require splitting the tax equally between Central GST (CGST) and State GST (SGST), such as 9% + 9% for an 18% slab. Sales to another state or union territory (Inter-state) apply Integrated GST (IGST) at the full 18%. BillCraft gives you a 1-click toggle to select between CGST+SGST and IGST, automatically breaking down the exact tax amounts on your printable invoice.",
    category: "taxes",
  },
  {
    question: "How does the Freelance Rate Calculator compute my recommended hourly rate?",
    answer:
      "Unlike basic calculators that simply divide income by 2,000 hours, BillCraft uses true freelance unit economics: it accounts for non-billable administrative hours (only 20-28 billable hours/week), subtracts planned vacation and sick time, includes your annual software subscriptions and coworking expenses, and factors in self-employment taxes. This ensures your take-home pay is protected against business overhead.",
    category: "rates",
  },
  {
    question: "Can I deploy BillCraft to Netlify or Cloudflare Pages for free?",
    answer:
      "Absolutely. BillCraft includes a pre-configured netlify.toml and a public/_redirects file that automatically handle Single Page Application (SPA) routing with zero configuration. You can push the repository to GitHub, connect it to Netlify or Cloudflare Pages, set the build command to npm run build and output directory to dist, and have your custom-branded invoicing app live in under 60 seconds.",
    category: "deployment",
  },
];

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (idx) => {
    setOpenIndex((curr) => (curr === idx ? null : idx));
  };

  return (
    <section className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20 text-sky-700 dark:text-sky-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <HelpCircle className="w-3.5 h-3.5" />
          Frequently Asked Questions
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Everything You Need to Know About BillCraft
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1">
          Learn about client-side privacy, tax compliance, and freelance billing practices.
        </p>
      </div>

      <div className="space-y-3">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 overflow-hidden shadow-sm transition-all"
            >
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                className="w-full p-4 sm:p-5 text-left flex justify-between items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                aria-expanded={isOpen}
              >
                <span className="font-semibold text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-sky-600 dark:text-sky-400' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
