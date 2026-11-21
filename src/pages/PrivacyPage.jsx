import React from 'react';
import { ArrowLeft, ShieldCheck, Lock, Database, Cookie, Mail } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export const PrivacyPage = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-8 animate-fade-in text-slate-800 dark:text-slate-200">
      {/* Top Navigation */}
      <div>
        <button
          type="button"
          onClick={() => onNavigate('builder')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Invoice Builder
        </button>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          Privacy-First Architecture
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
          Effective Date: {SITE_CONFIG.lastUpdated} • Version {SITE_CONFIG.version}
        </p>
      </div>

      {/* Highlights Banner */}
      <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 text-emerald-900 dark:text-emerald-200 space-y-2">
        <h3 className="font-bold text-sm flex items-center gap-2">
          <Lock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          Our Privacy Commitment in One Sentence:
        </h3>
        <p className="text-xs leading-relaxed">
          {SITE_CONFIG.name} runs 100% inside your web browser. We do not operate user account databases, we never see your client contracts or bank account numbers, and we never sell your data to any third party.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-6 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Database className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            1. Information Processed by {SITE_CONFIG.name}
          </h2>
          <p>
            When using our invoice and quotation tools, you may input business names, email addresses, phone numbers, client information, billing rates, bank account/IFSC details, and UPI IDs.
          </p>
          <p className="font-semibold text-slate-800 dark:text-slate-200">
            All of this data is stored exclusively in your device's browser local storage (<code>localStorage</code>). It is never sent to our servers, because we do not have backend application servers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            2. PDF Generation & QR Code Rendering
          </h2>
          <p>
            When you click "Download PDF", your invoice document is compiled entirely on your device using client-side Web APIs and vector rendering libraries (<code>html-to-image</code> and <code>jsPDF</code>). The resulting PDF is saved directly to your local file system without passing through any remote server.
          </p>
          <p>
            Similarly, payment QR codes (UPI or custom payment URLs) are computed directly on an in-memory Canvas element on your device using client-side JavaScript.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Cookie className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            3. Cookies & Advertising
          </h2>
          <p>
            {SITE_CONFIG.name} does not use first-party tracking cookies or session cookies for application logic. Your theme preference (dark/light) and invoice drafts are kept in HTML5 <code>localStorage</code>.
          </p>
          <p>
            To keep this web application 100% free for freelancers worldwide, non-intrusive third-party advertising partners (such as Google AdSense or Carbon Ads) may serve contextual advertisements. These third-party vendors may use cookies (such as the DoubleClick cookie) to serve relevant advertisements based on visits to this and other websites on the Internet.
          </p>
          <p>
            You can opt out of personalized advertising by visiting{' '}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-600 dark:text-sky-400 underline font-medium"
            >
              Google Ads Settings
            </a>{' '}
            or by configuring ad-blocking extensions in your browser.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            4. User Data Control & Deletion
          </h2>
          <p>
            You have total control over your information at all times:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
            <li>You can delete individual invoices or clients from the "History & Clients" directory anytime.</li>
            <li>You can clear all stored application data by clearing your browser's local cache or clicking the "Reset" action in the builder.</li>
            <li>You can download a complete offline JSON backup of your data to store safely on your personal hard drive.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            5. Security
          </h2>
          <p>
            Because data never leaves your browser, your risk of third-party cloud data breaches is eliminated by architecture. However, because data is stored in your browser's local storage, you should ensure that unauthorized individuals do not have access to your device or browser profile.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Mail className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            6. Contact Us
          </h2>
          <p>
            If you have any questions or feedback regarding this Privacy Policy or the security of {SITE_CONFIG.name}, please contact us at:{' '}
            <a
              href={`mailto:${SITE_CONFIG.contactEmail}`}
              className="text-sky-600 dark:text-sky-400 font-semibold underline"
            >
              {SITE_CONFIG.contactEmail}
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
};
