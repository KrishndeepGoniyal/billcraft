import React from 'react';
import { ArrowLeft, FileText, CheckCircle2, AlertTriangle, Mail } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export const TermsPage = ({ onNavigate }) => {
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

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <FileText className="w-3.5 h-3.5" />
          Legal Agreement
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
          Last Updated: {SITE_CONFIG.lastUpdated} • Version {SITE_CONFIG.version}
        </p>
      </div>

      <div className="space-y-6 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using {SITE_CONFIG.name} ("the Application"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Application.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            2. Nature of the Software
          </h2>
          <p>
            {SITE_CONFIG.name} is a 100% client-side web utility that runs inside your browser to assist in formatting and rendering PDF invoices, quotations, and financial calculations. The service is provided free of charge without mandatory subscriptions.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            3. User Responsibility & Tax Compliance
          </h2>
          <p>
            While {SITE_CONFIG.name} provides automated mathematical calculations (such as Indian GST, standard percentage taxes, and discounts), you are solely responsible for:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
            <li>The accuracy and completeness of all line item rates, quantities, client details, and tax rates entered.</li>
            <li>Ensuring that the issued invoices comply with all applicable tax laws, GST/VAT registrations, commercial invoicing requirements, and legal standards in your jurisdiction.</li>
            <li>{SITE_CONFIG.name} does not constitute certified legal, financial, or tax accounting advice. You should consult a qualified accountant for legal tax filing.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            4. Ownership of Generated Content
          </h2>
          <p>
            You retain 100% full, exclusive ownership of all content, trade names, business logos, client information, and invoices created using {SITE_CONFIG.name}. We claim no intellectual property rights over any document you produce.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            5. Disclaimer of Warranties & Limitation of Liability
          </h2>
          <p>
            {SITE_CONFIG.name} is provided on an "AS IS" and "AS AVAILABLE" basis, without warranties of any kind, whether express or implied.
          </p>
          <p>
            In no event shall {SITE_CONFIG.name}, its authors, or contributors be liable for any direct, indirect, incidental, or consequential damages (including loss of profits, client dispute costs, or tax penalties) arising out of or related to your use of the Application.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Mail className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            6. Inquiries
          </h2>
          <p>
            Questions regarding our terms should be directed to:{' '}
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
