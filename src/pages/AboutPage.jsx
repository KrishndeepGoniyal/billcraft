import React from 'react';
import { ShieldCheck, Zap, Lock, Cpu, ArrowLeft, Heart, CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export const AboutPage = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12 animate-fade-in text-slate-800 dark:text-slate-200">
      {/* Top Breadcrumb */}
      <div>
        <button
          type="button"
          onClick={() => onNavigate('builder')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Invoice Builder
        </button>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20 text-sky-700 dark:text-sky-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Zap className="w-3.5 h-3.5" />
          About BillCraft
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Invoicing Built for Freelancers, Not Silicon Valley Databases
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base mt-3 leading-relaxed">
          BillCraft is a fast, 100% client-side web application designed to help independent contractors, consultants, designers, and small businesses bill clients professionally without subscriptions, account signups, or privacy compromises.
        </p>
      </div>

      {/* Core Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 transition-colors">
          <div className="p-2.5 w-fit rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Privacy by Architecture</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Your client rates, bank accounts, and invoices never leave your computer. There is zero remote database, zero telemetry, and zero third-party tracking.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 transition-colors">
          <div className="p-2.5 w-fit rounded-xl bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-500/20">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Blazing Fast & Offline</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Everything runs in your browser. From live A4 document scaling to client-side QR generation and PDF compilation, you can work even with spotty Wi-Fi.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 transition-colors">
          <div className="p-2.5 w-fit rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">No Paywalls on Output</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Unlike legacy software that watermarks your invoices or limits you to 3 clients per month, BillCraft is free and unconstrained forever.
          </p>
        </div>
      </div>

      {/* Story & Philosophy */}
      <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-4 leading-relaxed text-sm transition-colors">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Why We Built BillCraft</h2>
        <p className="text-slate-600 dark:text-slate-400">
          Most invoicing software is bloated. They demand your email, password, credit card, and telephone number before letting you write a single invoice. Once inside, you're locked into a \$15/month subscription just to export a simple PDF with your own company logo.
        </p>
        <p className="text-slate-600 dark:text-slate-400">
          Worse, sensitive financial contracts and client identities are uploaded to multi-tenant cloud servers that can be hacked, scanned, or monetized. We believed there had to be a better way: a tool that leverages the modern web platform (Vite, React, Web Workers, Canvas, and LocalStorage) to keep 100% of the computation on your device.
        </p>
        
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>High-DPI vector-like A4 PDF export</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>Instant UPI payment QR code generator</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>Indian GST (CGST/SGST & IGST) compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>JSON local backup & restore</span>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="text-center p-8 rounded-2xl bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-xl shadow-sky-600/20">
        <h3 className="text-2xl font-black">Ready to craft your first invoice?</h3>
        <p className="text-sky-100 text-xs sm:text-sm mt-1 max-w-md mx-auto">
          No signup needed. Start filling in your details and download a print-ready PDF in 30 seconds.
        </p>
        <button
          type="button"
          onClick={() => onNavigate('builder')}
          className="mt-5 px-6 py-3 rounded-xl bg-white text-sky-700 font-bold text-xs uppercase tracking-wider hover:bg-sky-50 shadow-md transition-all hover:scale-105 active:scale-95"
        >
          Open Invoice Maker
        </button>
      </div>
    </div>
  );
};
