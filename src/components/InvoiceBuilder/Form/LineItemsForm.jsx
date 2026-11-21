import React from 'react';
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { formatCurrency, calculateLineTotal } from '../../../utils/formatters';

export const LineItemsForm = ({ items, currency, onAddItem, onUpdateItem, onRemoveItem, onMoveItem }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {items.map((item, index) => {
          const lineTotal = calculateLineTotal(item);

          return (
            <div
              key={item.id || index}
              className="p-3.5 bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700/80 rounded-xl space-y-2.5 transition-all"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500 font-mono">
                  #{index + 1}
                </span>

                <div className="flex items-center gap-1">
                  {/* Move Up */}
                  <button
                    type="button"
                    onClick={() => onMoveItem(index, -1)}
                    disabled={index === 0}
                    className="p-1 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 disabled:opacity-30 rounded transition-colors"
                    title="Move up"
                    aria-label="Move item up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>

                  {/* Move Down */}
                  <button
                    type="button"
                    onClick={() => onMoveItem(index, 1)}
                    disabled={index === items.length - 1}
                    className="p-1 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 disabled:opacity-30 rounded transition-colors"
                    title="Move down"
                    aria-label="Move item down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>

                  {/* Delete Item */}
                  <button
                    type="button"
                    onClick={() => onRemoveItem(index)}
                    className="p-1 text-slate-400 dark:text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded transition-colors ml-1"
                    title="Delete item"
                    aria-label="Delete item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Item Title */}
              <div>
                <input
                  type="text"
                  value={item.name || ''}
                  onChange={(e) => onUpdateItem(index, 'name', e.target.value)}
                  placeholder="Service / Product Name (e.g. Frontend Development)"
                  className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-sky-500 rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none transition-colors"
                />
              </div>

              {/* Description */}
              <div>
                <textarea
                  rows={2}
                  value={item.description || ''}
                  onChange={(e) => onUpdateItem(index, 'description', e.target.value)}
                  placeholder="Detailed deliverables, sprint scope, or product details..."
                  className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-sky-500 rounded-lg px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none transition-colors"
                />
              </div>

              {/* Quantity, Rate & Calculated Total */}
              <div className="grid grid-cols-12 gap-2 pt-1 items-center">
                <div className="col-span-4">
                  <label className="block text-[10px] uppercase font-bold text-slate-500 mb-0.5">
                    Qty / Hrs
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={item.quantity}
                    onChange={(e) => onUpdateItem(index, 'quantity', e.target.value)}
                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-sky-500 rounded-lg px-2.5 py-1 text-xs font-mono text-slate-900 dark:text-slate-100 focus:outline-none"
                  />
                </div>

                <div className="col-span-4">
                  <label className="block text-[10px] uppercase font-bold text-slate-500 mb-0.5">
                    Rate ({currency?.symbol})
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={item.rate}
                    onChange={(e) => onUpdateItem(index, 'rate', e.target.value)}
                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-sky-500 rounded-lg px-2.5 py-1 text-xs font-mono text-slate-900 dark:text-slate-100 focus:outline-none"
                  />
                </div>

                <div className="col-span-4 text-right">
                  <span className="block text-[10px] uppercase font-bold text-slate-500 mb-0.5">
                    Line Total
                  </span>
                  <div className="text-xs font-mono font-bold text-sky-700 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/40 px-2 py-1 rounded-lg">
                    {formatCurrency(lineTotal, currency)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Item Button */}
      <button
        type="button"
        onClick={onAddItem}
        className="w-full py-2.5 px-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 hover:border-sky-500 bg-slate-50/60 dark:bg-slate-900/40 hover:bg-slate-100 dark:hover:bg-slate-900 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 flex items-center justify-center gap-2 transition-all shadow-sm group"
        aria-label="Add new line item"
      >
        <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
        Add Line Item
      </button>
    </div>
  );
};
