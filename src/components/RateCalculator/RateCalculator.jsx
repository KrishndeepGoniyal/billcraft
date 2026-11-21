import React, { useState } from 'react';
import {
  Calculator,
  DollarSign,
  Clock,
  Calendar,
  Layers,
  PieChart,
  Sparkles,
} from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { AdSlotPlaceholder } from '../Monetization/AdSlotPlaceholder';

export const RateCalculator = () => {
  // Inputs
  const [currencySymbol, setCurrencySymbol] = useState('$');
  const [desiredIncome, setDesiredIncome] = useState(85000);
  const [billableHoursPerWeek, setBillableHoursPerWeek] = useState(25);
  const [vacationWeeks, setVacationWeeks] = useState(4);
  const [monthlyExpenses, setMonthlyExpenses] = useState(450); // Software, coworking, accounting
  const [taxRate, setTaxRate] = useState(25); // 25% tax

  // Calculations
  const annualExpenses = Number(monthlyExpenses) * 12;
  const workingWeeksPerYear = Math.max(1, 52 - Number(vacationWeeks));
  const annualBillableHours = workingWeeksPerYear * Math.max(1, Number(billableHoursPerWeek));

  // Gross revenue needed before taxes so that take-home matches desiredIncome:
  const effectiveTaxFactor = Math.max(0.01, 1 - (Number(taxRate) / 100));
  const requiredPreTaxProfit = Number(desiredIncome) / effectiveTaxFactor;
  const totalGrossRevenueNeeded = requiredPreTaxProfit + annualExpenses;
  const estimatedTaxes = requiredPreTaxProfit - Number(desiredIncome);

  // Rates
  const hourlyRate = Math.ceil(totalGrossRevenueNeeded / annualBillableHours);
  const dayRate = hourlyRate * 8;
  const weeklyRetainer = hourlyRate * Number(billableHoursPerWeek);
  const monthlyRetainer = Math.round((hourlyRate * annualBillableHours) / 12);

  // Percentages for breakdown bar
  const pctIncome = Math.round((Number(desiredIncome) / totalGrossRevenueNeeded) * 100) || 0;
  const pctTaxes = Math.round((estimatedTaxes / totalGrossRevenueNeeded) * 100) || 0;
  const pctExpenses = Math.max(0, 100 - pctIncome - pctTaxes);

  const curr = { symbol: currencySymbol, position: 'before' };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20 text-sky-700 dark:text-sky-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <Calculator className="w-3.5 h-3.5" />
          Financial Freedom Tool
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Freelance Rate & Profit Calculator
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 max-w-2xl">
          Don't undercharge. Calculate the true minimum hourly and day rate needed to achieve your desired take-home income while covering business software, taxes, and paid vacation.
        </p>
      </div>

      {/* Main Grid: Inputs vs Output Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs (7 Cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-7 space-y-6 shadow-sm transition-colors">
          <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Your Annual Business Parameters
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <span>Currency:</span>
              <div className="flex gap-1 bg-slate-100 dark:bg-slate-950 p-0.5 rounded border border-slate-200 dark:border-slate-800">
                {['$', '₹', '€', '£'].map((sym) => (
                  <button
                    key={sym}
                    onClick={() => setCurrencySymbol(sym)}
                    className={`w-6 h-6 rounded flex items-center justify-center font-bold text-xs transition-colors ${
                      currencySymbol === sym
                        ? 'bg-sky-600 text-white'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {sym}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Desired Take-Home */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1.5">
              <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Target Annual Take-Home (Net Profit)
              </span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400 text-sm font-bold">
                {formatCurrency(desiredIncome, curr)} / yr
              </span>
            </div>
            <input
              type="range"
              min="20000"
              max="350000"
              step="5000"
              value={desiredIncome}
              onChange={(e) => setDesiredIncome(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
              <span>{formatCurrency(20000, curr)}</span>
              <span>{formatCurrency(150000, curr)}</span>
              <span>{formatCurrency(350000, curr)}</span>
            </div>
          </div>

          {/* Billable Hours */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1.5">
              <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                Billable Client Hours Per Week
              </span>
              <span className="font-mono text-sky-600 dark:text-sky-400 text-sm font-bold">
                {billableHoursPerWeek} hrs / week
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="45"
              step="1"
              value={billableHoursPerWeek}
              onChange={(e) => setBillableHoursPerWeek(Number(e.target.value))}
              className="w-full accent-sky-500 cursor-pointer"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Tip: Most full-time freelancers can realistically bill 20 to 28 hours/week. The rest is marketing, admin, and invoicing.
            </p>
          </div>

          {/* Vacation & Sick Leave */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                Vacation & Off Weeks / Year
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={vacationWeeks}
                  onChange={(e) => setVacationWeeks(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-sky-500 rounded-lg px-3 py-2 text-sm font-mono text-slate-900 dark:text-slate-100 focus:outline-none"
                />
                <span className="absolute right-3 top-2.5 text-xs text-slate-500">weeks</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-purple-500 dark:text-purple-400" />
                Monthly Software & Tools Cost
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="25"
                  value={monthlyExpenses}
                  onChange={(e) => setMonthlyExpenses(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-sky-500 rounded-lg px-3 py-2 text-sm font-mono text-slate-900 dark:text-slate-100 focus:outline-none"
                />
                <span className="absolute right-3 top-2.5 text-xs text-slate-500 font-mono">
                  {currencySymbol}/mo
                </span>
              </div>
            </div>
          </div>

          {/* Estimated Tax Bracket */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1.5">
              <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <PieChart className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400" />
                Estimated Total Income Tax & Self-Employment Rate (%)
              </span>
              <span className="font-mono text-rose-500 dark:text-rose-400 text-sm font-bold">
                {taxRate}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              step="1"
              value={taxRate}
              onChange={(e) => setTaxRate(Number(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Right Output Recommendations (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Main Recommended Rate Card */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sky-50 via-white to-sky-100/50 dark:from-sky-950/80 dark:via-slate-900 dark:to-slate-900 border border-sky-300 dark:border-sky-500/40 p-6 shadow-xl shadow-sky-900/5 dark:shadow-sky-950/40 transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                  Recommended Minimum
                </span>
                <div className="text-4xl sm:text-5xl font-black font-mono text-slate-900 dark:text-white mt-1 tracking-tight">
                  {formatCurrency(hourlyRate, curr)}
                  <span className="text-base sm:text-lg font-normal text-slate-500 dark:text-slate-400 font-sans"> / hour</span>
                </div>
              </div>
              <Sparkles className="w-7 h-7 text-sky-500 dark:text-sky-400 shrink-0" />
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
              Charging this baseline guarantees your desired {formatCurrency(desiredIncome, curr)} take-home, {vacationWeeks} paid weeks off, and tax compliance.
            </p>

            {/* Quick Pricing Packages */}
            <div className="grid grid-cols-2 gap-3 mt-6 pt-5 border-t border-slate-200 dark:border-slate-800">
              <div className="bg-slate-50 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide block">
                  Day Rate (8 Hours)
                </span>
                <span className="text-lg font-bold font-mono text-slate-900 dark:text-white">
                  {formatCurrency(dayRate, curr)}
                </span>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide block">
                  Monthly Retainer
                </span>
                <span className="text-lg font-bold font-mono text-slate-900 dark:text-white">
                  {formatCurrency(monthlyRetainer, curr)}
                </span>
              </div>
            </div>
          </div>

          {/* Revenue Distribution Breakdown */}
          <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm transition-colors">
            <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              <span>Annual Revenue Target</span>
              <span className="font-mono text-sky-600 dark:text-sky-400 text-sm">
                {formatCurrency(totalGrossRevenueNeeded, curr)}
              </span>
            </div>

            {/* Segmented Color Bar */}
            <div className="h-4 w-full rounded-full overflow-hidden flex bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <div
                style={{ width: `${pctIncome}%` }}
                className="bg-emerald-500 h-full transition-all duration-300"
                title={`Take-Home Profit: ${pctIncome}%`}
              />
              <div
                style={{ width: `${pctTaxes}%` }}
                className="bg-rose-500 h-full transition-all duration-300"
                title={`Taxes: ${pctTaxes}%`}
              />
              <div
                style={{ width: `${pctExpenses}%` }}
                className="bg-purple-500 h-full transition-all duration-300"
                title={`Expenses: ${pctExpenses}%`}
              />
            </div>

            {/* Legend */}
            <div className="grid grid-cols-3 gap-2 pt-1 text-xs">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Take-Home ({pctIncome}%)
                </div>
                <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {formatCurrency(desiredIncome, curr)}
                </div>
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  Taxes ({pctTaxes}%)
                </div>
                <div className="font-mono font-bold text-rose-600 dark:text-rose-400">
                  {formatCurrency(estimatedTaxes, curr)}
                </div>
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-purple-500" />
                  Expenses ({pctExpenses}%)
                </div>
                <div className="font-mono font-bold text-purple-600 dark:text-purple-400">
                  {formatCurrency(annualExpenses, curr)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- AD_SLOT_PLACEHOLDER --> */}
      <AdSlotPlaceholder slotType="horizontal-banner" />
    </div>
  );
};
