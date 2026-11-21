import React, { useState } from 'react';
import {
  Building,
  User,
  FileSpreadsheet,
  ListPlus,
  Percent,
  CreditCard,
  Eye,
  Edit3,
} from 'lucide-react';
import { useInvoice } from '../../context/InvoiceContext';
import { ActionsBar } from './ActionsBar';
import { BusinessInfoForm } from './Form/BusinessInfoForm';
import { ClientInfoForm } from './Form/ClientInfoForm';
import { InvoiceDetailsForm } from './Form/InvoiceDetailsForm';
import { LineItemsForm } from './Form/LineItemsForm';
import { TaxDiscountForm } from './Form/TaxDiscountForm';
import { PaymentDetailsForm } from './Form/PaymentDetailsForm';
import { InvoicePreview } from './Preview/InvoicePreview';

export const InvoiceBuilder = () => {
  const {
    invoiceData,
    updateInvoiceData,
    updateBusiness,
    updateClient,
    addItem,
    updateItem,
    removeItem,
    moveItem,
  } = useInvoice();

  const [activeFormTab, setActiveFormTab] = useState('items'); // default to items for immediate productivity
  const [mobileTab, setMobileTab] = useState('edit'); // 'edit' or 'preview'

  const formTabs = [
    { id: 'items', label: 'Items', icon: ListPlus, badge: invoiceData.items.length },
    { id: 'details', label: 'Details', icon: FileSpreadsheet },
    { id: 'client', label: 'Client', icon: User },
    { id: 'business', label: 'Business', icon: Building },
    { id: 'tax', label: 'Tax & Discount', icon: Percent },
    { id: 'payment', label: 'Payment & QR', icon: CreditCard },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-65px)] overflow-hidden">
      {/* Top Action Bar */}
      <ActionsBar />

      {/* Mobile Tab Switcher (Visible only below lg) */}
      <div className="lg:hidden flex bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-2 text-xs font-semibold no-print transition-colors">
        <button
          type="button"
          onClick={() => setMobileTab('edit')}
          className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 transition-all ${
            mobileTab === 'edit'
              ? 'bg-sky-600 text-white shadow'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Edit3 className="w-4 h-4" />
          Edit Document
        </button>
        <button
          type="button"
          onClick={() => setMobileTab('preview')}
          className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 transition-all ${
            mobileTab === 'preview'
              ? 'bg-sky-600 text-white shadow'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Eye className="w-4 h-4" />
          Live Preview
        </button>
      </div>

      {/* Main Split Screen */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Form Panel */}
        <div
          className={`w-full lg:w-[48%] xl:w-[45%] flex flex-col border-r border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-950 no-print overflow-hidden transition-colors ${
            mobileTab === 'edit' ? 'flex' : 'hidden lg:flex'
          }`}
        >
          {/* Sub-tabs Navigation */}
          <div className="flex overflow-x-auto border-b border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/50 scrollbar-none px-2 pt-2 gap-1 shrink-0 transition-colors">
            {formTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeFormTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFormTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-t-lg transition-all border-b-2 whitespace-nowrap ${
                    isActive
                      ? 'border-sky-500 text-sky-600 dark:text-sky-400 bg-white dark:bg-slate-900 shadow-sm'
                      : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900/40'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                  {tab.badge !== undefined && (
                    <span className="text-[10px] px-1.5 py-0.2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full font-mono">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Form Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {activeFormTab === 'items' && (
              <LineItemsForm
                items={invoiceData.items}
                currency={invoiceData.currency}
                onAddItem={addItem}
                onUpdateItem={updateItem}
                onRemoveItem={removeItem}
                onMoveItem={moveItem}
              />
            )}

            {activeFormTab === 'details' && (
              <InvoiceDetailsForm
                invoiceData={invoiceData}
                onUpdate={updateInvoiceData}
              />
            )}

            {activeFormTab === 'client' && (
              <ClientInfoForm
                client={invoiceData.client}
                onUpdate={updateClient}
              />
            )}

            {activeFormTab === 'business' && (
              <BusinessInfoForm
                business={invoiceData.business}
                onUpdate={updateBusiness}
              />
            )}

            {activeFormTab === 'tax' && (
              <TaxDiscountForm
                invoiceData={invoiceData}
                onUpdate={updateInvoiceData}
              />
            )}

            {activeFormTab === 'payment' && (
              <PaymentDetailsForm
                invoiceData={invoiceData}
                onUpdate={updateInvoiceData}
              />
            )}
          </div>
        </div>

        {/* Right Preview Panel */}
        <div
          className={`w-full lg:w-[52%] xl:w-[55%] flex flex-col bg-slate-100 dark:bg-slate-950 overflow-hidden transition-colors ${
            mobileTab === 'preview' ? 'flex' : 'hidden lg:flex'
          }`}
        >
          <InvoicePreview
            invoiceData={invoiceData}
            onUpdateTemplate={(template) => updateInvoiceData({ template })}
            onUpdateAccent={(accentColor) => updateInvoiceData({ accentColor })}
          />
        </div>
      </div>
    </div>
  );
};
