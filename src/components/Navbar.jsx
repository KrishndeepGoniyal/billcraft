import React from 'react';
import {
  FileSpreadsheet,
  Calculator,
  History,
  Sun,
  Moon,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Navbar = ({ activeView, onViewChange, onOpenProKit }) => {
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { id: 'builder', label: 'Invoice Builder', icon: FileSpreadsheet },
    { id: 'calculator', label: 'Rate Calculator', icon: Calculator },
    { id: 'history', label: 'History & Clients', icon: History },
  ];

  return (
    <header className="bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 sticky top-0 z-40 no-print transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div
            onClick={() => onViewChange('builder')}
            className="flex items-center gap-2 cursor-pointer select-none group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-sky-600/30 group-hover:scale-105 transition-transform">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors">
                  Bill<span className="text-sky-600 dark:text-sky-400">Craft</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-400 border border-sky-200 dark:border-sky-500/20">
                  <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  Client-Side
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Center Nav Tabs */}
        <nav className="flex items-center bg-slate-100 dark:bg-slate-900/80 p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold transition-colors">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onViewChange(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  isActive
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden md:inline">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Pro Kit & Theme Toggle */}
        <div className="flex items-center gap-2.5">
          {/* Pro Freelance Kit CTA */}
          <button
            type="button"
            onClick={onOpenProKit}
            className="bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-sky-500/20 hover:from-amber-500/20 hover:to-sky-500/30 text-amber-700 dark:text-amber-300 hover:text-amber-800 dark:hover:text-amber-200 border border-amber-300 dark:border-amber-500/30 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm group"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">Pro Freelance Kit</span>
            <span className="text-[10px] font-extrabold bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded-full">
              63% OFF
            </span>
          </button>

          {/* Theme Switcher */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-sky-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
