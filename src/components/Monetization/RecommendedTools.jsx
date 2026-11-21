import React from 'react';
import { ExternalLink, Globe, FileText, ShieldCheck, DollarSign, Award } from 'lucide-react';
import { MONETIZATION_CONFIG } from '../../config/monetization';

export const RecommendedTools = () => {
  const iconMap = {
    Globe: Globe,
    FileText: FileText,
    ShieldCheck: ShieldCheck,
    DollarSign: DollarSign,
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <Award className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          Recommended Freelance Stack
        </h3>
        <span className="text-[11px] text-slate-500">Hand-picked partner tools</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {MONETIZATION_CONFIG.recommendedTools.map((tool, idx) => {
          const IconComponent = iconMap[tool.icon] || Globe;
          return (
            <a
              key={idx}
              href={tool.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 rounded-xl bg-white dark:bg-slate-900/80 hover:bg-slate-50 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-sky-500/40 transition-all flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-lg bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 group-hover:scale-105 transition-transform">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 px-2 py-0.5 rounded-full">
                    {tool.badge}
                  </span>
                </div>

                <div className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors flex items-center gap-1.5">
                  {tool.name}
                  <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-sky-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5">{tool.category}</div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  {tool.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-[11px] font-semibold text-sky-600 dark:text-sky-400 group-hover:text-sky-700 dark:group-hover:text-sky-300 flex items-center gap-1">
                <span>Explore {tool.name}</span>
                <span>&rarr;</span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};
