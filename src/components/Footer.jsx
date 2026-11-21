import React from 'react';
import { ShieldCheck, Lock, Zap, Mail, FileText, Info } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export const Footer = ({ onOpenProKit, onNavigate }) => {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 text-slate-600 dark:text-slate-400 text-xs py-10 px-4 sm:px-6 no-print transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Privacy Highlight Banner */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white text-sm">
                100% Client-Side Privacy Guarantee
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Your invoices, clients, bank accounts, and financial rates never touch a cloud database or remote server.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 shrink-0">
            <ShieldCheck className="w-4 h-4" />
            <span>Zero Server Footprint</span>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-2">
          {/* Column 1: Core Tools */}
          <div>
            <h4 className="font-bold text-slate-800 dark:text-slate-200 text-xs uppercase tracking-wider mb-2.5">
              Tools & Generators
            </h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('builder')}
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  Invoice & Quotation Maker
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('calculator')}
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  Freelance Rate Calculator
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('history')}
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  Client Directory & History
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('builder')}
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  UPI Payment QR Generator
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Legal & Trust */}
          <div>
            <h4 className="font-bold text-slate-800 dark:text-slate-200 text-xs uppercase tracking-wider mb-2.5">
              Legal & Trust
            </h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('privacy')}
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('terms')}
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  Security Architecture
                </button>
              </li>
              <li>
                <span className="text-[11px] text-slate-400 dark:text-slate-500">
                  GDPR & CCPA Compliant
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="font-bold text-slate-800 dark:text-slate-200 text-xs uppercase tracking-wider mb-2.5">
              Company
            </h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  About {SITE_CONFIG.name}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  Contact & Support
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenProKit}
                  className="hover:text-amber-600 dark:hover:text-amber-400 text-amber-600 dark:text-amber-300 transition-colors font-medium"
                >
                  Pro Freelance Kit (63% OFF)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Free Deployment */}
          <div>
            <h4 className="font-bold text-slate-800 dark:text-slate-200 text-xs uppercase tracking-wider mb-2.5">
              Deployment & Host
            </h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <li>
                <span>Netlify Ready (<code>netlify.toml</code>)</span>
              </li>
              <li>
                <span>Cloudflare Pages (<code>_redirects</code>)</span>
              </li>
              <li>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                  Free Static Hosting
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} {SITE_CONFIG.name}. Fast, privacy-first client-side web application.
          </div>
          <div className="flex items-center gap-1">
            <span>Crafted for freelancers worldwide</span>
            <Zap className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 ml-1" />
          </div>
        </div>
      </div>
    </footer>
  );
};
