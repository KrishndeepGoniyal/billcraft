import React from 'react';
import { X, CheckCircle2, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';
import { MONETIZATION_CONFIG } from '../../config/monetization';

export const ProKitModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 dark:bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/30 p-6 sm:p-8 shadow-2xl shadow-sky-950/20 text-slate-900 dark:text-slate-100 overflow-hidden transition-colors">
        {/* Glow decoration */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-sky-500/10 dark:bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Badge & Title */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/30 text-sky-700 dark:text-sky-400 text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Pro Freelance Kit
        </div>

        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          Supercharge Your Freelance Business & Close Higher Retainers
        </h2>

        <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
          Stop reinventing the wheel with client proposals, payment disputes, and scope creep. Get 50+ battle-tested resources used by 6-figure freelancers worldwide.
        </p>

        {/* Feature List */}
        <div className="my-6 space-y-2.5">
          {MONETIZATION_CONFIG.proKitFeatures.map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>{feat}</span>
            </div>
          ))}
        </div>

        {/* Pricing & CTA */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black font-mono text-slate-900 dark:text-white">
              {MONETIZATION_CONFIG.proKitPrice}
            </span>
            <span className="text-sm line-through text-slate-400 dark:text-slate-500 font-mono">
              {MONETIZATION_CONFIG.proKitOriginalPrice}
            </span>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-500/20">
              {MONETIZATION_CONFIG.proKitDiscount}
            </span>
          </div>

          <a
            href={MONETIZATION_CONFIG.proKitCheckoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-sky-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Get Instant Access</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 mt-4">
          <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
          <span>One-time purchase • 30-day money-back guarantee • Instant digital download</span>
        </div>
      </div>
    </div>
  );
};
