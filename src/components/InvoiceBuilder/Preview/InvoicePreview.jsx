import React, { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Check } from 'lucide-react';
import { MinimalistTemplate } from './templates/MinimalistTemplate';
import { ModernAccentTemplate } from './templates/ModernAccentTemplate';
import { ClassicAgencyTemplate } from './templates/ClassicAgencyTemplate';
import { TEMPLATES, ACCENT_COLORS } from '../../../constants/templates';

export const InvoicePreview = ({ invoiceData, onUpdateTemplate, onUpdateAccent }) => {
  const [zoomLevel, setZoomLevel] = useState(0.92);

  const renderTemplate = () => {
    switch (invoiceData.template) {
      case 'minimalist':
        return <MinimalistTemplate invoiceData={invoiceData} />;
      case 'classic':
        return <ClassicAgencyTemplate invoiceData={invoiceData} />;
      case 'modern':
      default:
        return <ModernAccentTemplate invoiceData={invoiceData} />;
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Preview Header & Controls */}
      <div className="bg-white/90 dark:bg-slate-900/80 backdrop-blur border-b border-slate-200 dark:border-slate-800 p-3 flex flex-wrap items-center justify-between gap-3 no-print transition-colors">
        {/* Template Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Template:
          </span>
          <div className="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-lg border border-slate-200 dark:border-slate-800">
            {TEMPLATES.map((tmpl) => (
              <button
                key={tmpl.id}
                onClick={() => onUpdateTemplate(tmpl.id)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                  invoiceData.template === tmpl.id
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
                title={tmpl.description}
              >
                {tmpl.name}
              </button>
            ))}
          </div>
        </div>

        {/* Accent Color Chooser (if modern template) */}
        {invoiceData.template === 'modern' && (
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 dark:text-slate-400 mr-1">Accent:</span>
            {ACCENT_COLORS.map((col) => (
              <button
                key={col.id}
                onClick={() => onUpdateAccent(col.id)}
                className="w-5 h-5 rounded-full border border-black/10 dark:border-white/20 transition-transform hover:scale-110 flex items-center justify-center"
                style={{ backgroundColor: col.hex }}
                title={col.name}
                aria-label={`Select accent color ${col.name}`}
              >
                {invoiceData.accentColor === col.id && (
                  <Check className="w-3 h-3 text-white drop-shadow" />
                )}
              </button>
            ))}
          </div>
        )}

        {/* Zoom Controls */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <button
            onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.1))}
            className="p-1 hover:text-slate-900 dark:hover:text-white rounded bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60 transition-colors"
            title="Zoom out"
            aria-label="Zoom out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="font-mono text-[11px] w-10 text-center text-slate-700 dark:text-slate-300">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            onClick={() => setZoomLevel((z) => Math.min(1.2, z + 0.1))}
            className="p-1 hover:text-slate-900 dark:hover:text-white rounded bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60 transition-colors"
            title="Zoom in"
            aria-label="Zoom in"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoomLevel(0.92)}
            className="p-1 hover:text-slate-900 dark:hover:text-white rounded bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60 ml-0.5 transition-colors"
            title="Reset Zoom"
            aria-label="Reset zoom"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Document Viewport: neutral dark/light backdrop */}
      <div className="flex-1 overflow-auto bg-slate-200/80 dark:bg-slate-950/70 p-4 sm:p-8 flex justify-center items-start transition-colors">
        <div
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'top center',
            transition: 'transform 0.15s ease-out',
          }}
          className="shadow-2xl rounded-sm transition-all"
        >
          {/* Printable Element with ID #invoice-printable: PERMANENTLY crisp white paper */}
          <div
            id="invoice-printable"
            data-testid="invoice-printable"
            className="a4-document bg-white text-slate-900 border border-slate-300 dark:border-slate-700/50 shadow-2xl overflow-hidden print:shadow-none print:border-none"
          >
            {renderTemplate()}
          </div>
        </div>
      </div>
    </div>
  );
};
