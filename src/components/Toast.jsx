import React from 'react';
import { CheckCircle2, AlertCircle, Info, X, AlertTriangle } from 'lucide-react';

export const Toast = ({ toast, onDismiss }) => {
  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-400 shrink-0" />,
  };

  const borders = {
    success: 'border-emerald-500/30 bg-emerald-950/90 text-emerald-100 shadow-emerald-900/20',
    error: 'border-rose-500/30 bg-rose-950/90 text-rose-100 shadow-rose-900/20',
    warning: 'border-amber-500/30 bg-amber-950/90 text-amber-100 shadow-amber-900/20',
    info: 'border-sky-500/30 bg-sky-950/90 text-sky-100 shadow-sky-900/20',
  };

  const borderClass = borders[toast.type] || borders.info;
  const icon = icons[toast.type] || icons.info;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-in max-w-sm w-full">
      <div className={`flex items-start gap-3 p-4 rounded-xl border shadow-xl backdrop-blur-md ${borderClass}`}>
        {icon}
        <div className="flex-1 text-sm font-medium pr-1">
          {toast.message}
        </div>
        <button
          onClick={onDismiss}
          className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
