import React from 'react';

/**
 * AD_SLOT_PLACEHOLDER
 * Easily replace the placeholder inner container with Google AdSense, Carbon Ads,
 * or BuySellAds snippet. Designed to not disrupt UI flow when ads are active or empty.
 */
export const AdSlotPlaceholder = ({ slotType = 'horizontal-banner' }) => {
  if (slotType === 'sidebar-card') {
    return (
      /* <!-- AD_SLOT_PLACEHOLDER: SIDEBAR_CARD --> */
      <aside className="w-full rounded-xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-900/40 p-4 text-center my-4 transition-colors hover:border-slate-400 dark:hover:border-slate-700/80">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 block mb-2">
          Advertisement / Partner
        </span>
        <div className="h-44 flex flex-col items-center justify-center border border-slate-200 dark:border-slate-800/60 rounded-lg bg-white dark:bg-slate-950/40 text-slate-500 text-xs p-3">
          <p className="font-medium text-slate-600 dark:text-slate-400">Ad Space Available</p>
          <p className="text-[10px] text-slate-500 mt-1">Non-intrusive developer/freelance audience</p>
        </div>
      </aside>
    );
  }

  return (
    /* <!-- AD_SLOT_PLACEHOLDER: HORIZONTAL_LEADERBOARD --> */
    <aside className="w-full rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-900/30 p-4 text-center my-6 transition-colors hover:border-slate-400 dark:hover:border-slate-700/80">
      <div className="flex items-center justify-between px-2 mb-2">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          Sponsored Link / Ad Space
        </span>
        <span className="text-[10px] text-slate-500 dark:text-slate-600">Privacy-First Ad Placement</span>
      </div>
      <div className="h-20 sm:h-24 flex flex-col items-center justify-center border border-slate-200 dark:border-slate-800/60 rounded-xl bg-white dark:bg-slate-950/40 text-slate-500 text-xs px-4">
        <p className="font-medium text-slate-700 dark:text-slate-400">Your Ad or Carbon / AdSense Script Here</p>
        <p className="text-[11px] text-slate-500 mt-1">
          Insert ad tag directly into <code>src/components/Monetization/AdSlotPlaceholder.jsx</code>
        </p>
      </div>
    </aside>
  );
};
