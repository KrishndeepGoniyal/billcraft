import React from 'react';
import { Percent, Tag, Truck } from 'lucide-react';

export const TaxDiscountForm = ({ invoiceData, onUpdate }) => {
  const { taxType, taxRate, gstType, gstRate, discountType, discountValue, shippingFee, currency } = invoiceData;

  const gstPresets = [5, 12, 18, 28];

  return (
    <div className="space-y-5">
      {/* Tax Configuration */}
      <div className="p-3.5 bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-xl space-y-3 transition-colors">
        <label className="block text-xs font-semibold text-slate-800 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Percent className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
          Tax / GST Configuration
        </label>

        {/* Tax Mode Radios */}
        <div className="grid grid-cols-3 gap-2 bg-slate-100 dark:bg-slate-950 p-1 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-medium">
          <button
            type="button"
            onClick={() => onUpdate({ taxType: 'none' })}
            className={`py-1.5 px-2 rounded-md transition-all ${
              taxType === 'none'
                ? 'bg-sky-600 text-white shadow'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            No Tax
          </button>
          <button
            type="button"
            onClick={() => onUpdate({ taxType: 'standard' })}
            className={`py-1.5 px-2 rounded-md transition-all ${
              taxType === 'standard'
                ? 'bg-sky-600 text-white shadow'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Standard %
          </button>
          <button
            type="button"
            onClick={() => onUpdate({ taxType: 'gst' })}
            className={`py-1.5 px-2 rounded-md transition-all ${
              taxType === 'gst'
                ? 'bg-sky-600 text-white shadow'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            GST (India)
          </button>
        </div>

        {/* Standard Tax Input */}
        {taxType === 'standard' && (
          <div>
            <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">
              Standard Tax / VAT Rate (%)
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                step="0.1"
                value={taxRate}
                onChange={(e) => onUpdate({ taxRate: e.target.value })}
                placeholder="e.g. 10 or 8.25"
                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-sky-500 rounded-lg px-3 py-1.5 text-sm font-mono text-slate-900 dark:text-slate-100 focus:outline-none"
              />
              <span className="absolute right-3 top-2 text-xs text-slate-500">%</span>
            </div>
          </div>
        )}

        {/* GST Specific Options */}
        {taxType === 'gst' && (
          <div className="space-y-3 pt-1">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs text-slate-600 dark:text-slate-400">Total GST Rate (%)</label>
                {/* 1-Click GST Presets */}
                <div className="flex gap-1">
                  {gstPresets.map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => onUpdate({ gstRate: rate })}
                      className={`text-[10px] px-2 py-0.5 rounded font-mono font-medium transition-colors ${
                        Number(gstRate) === rate
                          ? 'bg-sky-600 text-white'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700'
                      }`}
                    >
                      {rate}%
                    </button>
                  ))}
                </div>
              </div>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={gstRate}
                  onChange={(e) => onUpdate({ gstRate: e.target.value })}
                  placeholder="18"
                  className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-sky-500 rounded-lg px-3 py-1.5 text-sm font-mono text-slate-900 dark:text-slate-100 focus:outline-none"
                />
                <span className="absolute right-3 top-2 text-xs text-slate-500">%</span>
              </div>
            </div>

            {/* Split Type */}
            <div>
              <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1.5">GST Type / Destination</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <label
                  className={`flex flex-col p-2 rounded-lg border cursor-pointer transition-colors ${
                    gstType === 'cgst_sgst'
                      ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/30 text-sky-800 dark:text-sky-200'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <input
                      type="radio"
                      name="gstType"
                      checked={gstType === 'cgst_sgst'}
                      onChange={() => onUpdate({ gstType: 'cgst_sgst' })}
                      className="text-sky-500 focus:ring-0"
                    />
                    <span className="font-semibold text-xs text-slate-800 dark:text-slate-200">CGST + SGST</span>
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 pl-4">
                    Intra-state (Split 50% / 50%)
                  </span>
                </label>

                <label
                  className={`flex flex-col p-2 rounded-lg border cursor-pointer transition-colors ${
                    gstType === 'igst'
                      ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/30 text-sky-800 dark:text-sky-200'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <input
                      type="radio"
                      name="gstType"
                      checked={gstType === 'igst'}
                      onChange={() => onUpdate({ gstType: 'igst' })}
                      className="text-sky-500 focus:ring-0"
                    />
                    <span className="font-semibold text-xs text-slate-800 dark:text-slate-200">IGST</span>
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 pl-4">
                    Inter-state (Full 100%)
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Discount Configuration */}
      <div className="p-3.5 bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-xl space-y-3 transition-colors">
        <label className="block text-xs font-semibold text-slate-800 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          Discount
        </label>

        <div className="grid grid-cols-12 gap-3 items-center">
          <div className="col-span-5">
            <select
              value={discountType}
              onChange={(e) => onUpdate({ discountType: e.target.value })}
              className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-sky-500 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="percentage">Percentage (%)</option>
              <option value="flat">Fixed ({currency?.symbol})</option>
            </select>
          </div>

          <div className="col-span-7">
            <div className="relative">
              <input
                type="number"
                min="0"
                step="any"
                value={discountValue}
                onChange={(e) => onUpdate({ discountValue: e.target.value })}
                placeholder="0"
                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-sky-500 rounded-lg px-3 py-1.5 text-sm font-mono text-slate-900 dark:text-slate-100 focus:outline-none"
              />
              <span className="absolute right-3 top-2 text-xs text-slate-500">
                {discountType === 'percentage' ? '%' : currency?.symbol}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Shipping / Extra Fees */}
      <div className="p-3.5 bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2 transition-colors">
        <label className="block text-xs font-semibold text-slate-800 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Truck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          Shipping / Handling / Additional Charges
        </label>
        <div className="relative">
          <input
            type="number"
            min="0"
            step="any"
            value={shippingFee}
            onChange={(e) => onUpdate({ shippingFee: e.target.value })}
            placeholder="0.00"
            className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-sky-500 rounded-lg px-3 py-1.5 text-sm font-mono text-slate-900 dark:text-slate-100 focus:outline-none"
          />
          <span className="absolute right-3 top-2 text-xs text-slate-500 font-mono">
            {currency?.symbol}
          </span>
        </div>
      </div>
    </div>
  );
};
