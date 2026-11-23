import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { InvoiceProvider, useInvoice } from './context/InvoiceContext';
import { Navbar } from './components/Navbar';
import { InvoiceBuilder } from './components/InvoiceBuilder/InvoiceBuilder';
import { MinimalistTemplate } from './components/InvoiceBuilder/Preview/templates/MinimalistTemplate';
import { ModernAccentTemplate } from './components/InvoiceBuilder/Preview/templates/ModernAccentTemplate';
import { ClassicAgencyTemplate } from './components/InvoiceBuilder/Preview/templates/ClassicAgencyTemplate';
import { RateCalculator } from './components/RateCalculator/RateCalculator';
import { HistoryDirectory } from './components/History/HistoryDirectory';
import { AboutPage } from './pages/AboutPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { ContactPage } from './pages/ContactPage';
import { ProKitModal } from './components/Monetization/ProKitModal';
import { RecommendedTools } from './components/Monetization/RecommendedTools';
import { FAQSection } from './components/FAQ/FAQSection';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { SITE_CONFIG } from './config/siteConfig';

const viewToPath = {
  builder: '/',
  calculator: '/calculator',
  history: '/history',
  about: '/about',
  privacy: '/privacy',
  terms: '/terms',
  contact: '/contact',
};

const pathToView = {
  '/': 'builder',
  '/calculator': 'calculator',
  '/history': 'history',
  '/about': 'about',
  '/privacy': 'privacy',
  '/terms': 'terms',
  '/contact': 'contact',
};

const pageTitles = {
  builder: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
  calculator: `Freelance Rate & Profit Calculator — ${SITE_CONFIG.name}`,
  history: `Document History & Client Directory — ${SITE_CONFIG.name}`,
  about: `About Us — ${SITE_CONFIG.name}`,
  privacy: `Privacy Policy — ${SITE_CONFIG.name}`,
  terms: `Terms of Service — ${SITE_CONFIG.name}`,
  contact: `Contact & Support — ${SITE_CONFIG.name}`,
};

const AppContent = () => {
  // Initialize view from URL pathname or default to 'builder'
  const [activeView, setActiveView] = useState(() => {
    const path = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
    return pathToView[path] || 'builder';
  });

  const [isProKitOpen, setIsProKitOpen] = useState(false);
  const { toast, dismissToast, invoiceData } = useInvoice();

  // Sync route and title
  const handleNavigate = (view) => {
    setActiveView(view);
    const path = viewToPath[view] || '/';
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Browser back/forward button synchronization
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
      const view = pathToView[path] || 'builder';
      setActiveView(view);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Dynamic Title update
  useEffect(() => {
    document.title = pageTitles[activeView] || `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`;
  }, [activeView]);

  return (
    <>
      {/* Interactive Application UI (Hidden during Print) */}
      <div className="no-print min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-white transition-colors duration-200 overflow-x-hidden">
        {/* Navigation */}
        <Navbar
          activeView={activeView}
          onViewChange={handleNavigate}
          onOpenProKit={() => setIsProKitOpen(true)}
        />

        {/* Main View Area */}
        <main className="flex-1 flex flex-col">
          {activeView === 'builder' && <InvoiceBuilder />}

          {activeView === 'calculator' && (
            <div className="py-6 space-y-12">
              <RateCalculator />
              <div className="max-w-6xl mx-auto px-4 sm:px-8">
                <RecommendedTools />
              </div>
            </div>
          )}

          {activeView === 'history' && (
            <div className="py-6 space-y-12">
              <HistoryDirectory onNavigateToEditor={() => handleNavigate('builder')} />
            </div>
          )}

          {activeView === 'about' && (
            <AboutPage onNavigate={handleNavigate} />
          )}

          {activeView === 'privacy' && (
            <PrivacyPage onNavigate={handleNavigate} />
          )}

          {activeView === 'terms' && (
            <TermsPage onNavigate={handleNavigate} />
          )}

          {activeView === 'contact' && (
            <ContactPage onNavigate={handleNavigate} />
          )}

          {/* Global SEO FAQ (rendered across non-editor views) */}
          {activeView !== 'builder' && activeView !== 'about' && activeView !== 'privacy' && activeView !== 'terms' && activeView !== 'contact' && (
            <FAQSection />
          )}
        </main>

        {/* Footer */}
        <Footer
          onOpenProKit={() => setIsProKitOpen(true)}
          onNavigate={handleNavigate}
        />

        {/* Pro Kit Modal */}
        <ProKitModal
          isOpen={isProKitOpen}
          onClose={() => setIsProKitOpen(false)}
        />

        {/* Toast Notification */}
        <Toast toast={toast} onDismiss={dismissToast} />
      </div>

      {/* Bulletproof Top-Level Dedicated Print Container */}
      <div className="print-only" aria-hidden="true">
        <div className="w-[210mm] min-h-[297mm] bg-white text-slate-900 mx-auto">
          {invoiceData.template === 'minimalist' ? (
            <MinimalistTemplate invoiceData={invoiceData} />
          ) : invoiceData.template === 'classic' ? (
            <ClassicAgencyTemplate invoiceData={invoiceData} />
          ) : (
            <ModernAccentTemplate invoiceData={invoiceData} />
          )}
        </div>
      </div>
    </>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <InvoiceProvider>
        <AppContent />
      </InvoiceProvider>
    </ThemeProvider>
  );
}

export default App;
