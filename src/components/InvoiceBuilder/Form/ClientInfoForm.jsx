import React from 'react';
import { User, Mail, Phone, MapPin, Hash, UserCheck, BookmarkPlus } from 'lucide-react';
import { useInvoice } from '../../../context/InvoiceContext';

export const ClientInfoForm = ({ client, onUpdate }) => {
  const { clients, selectClient, saveClientToDirectory } = useInvoice();

  const handleSavedClientChange = (e) => {
    const selectedId = e.target.value;
    if (!selectedId) return;
    const found = clients.find((c) => c.id === selectedId);
    if (found) {
      selectClient(found);
    }
  };

  const handleSaveToDirectory = () => {
    if (!client.name?.trim()) return;
    saveClientToDirectory(client);
  };

  return (
    <div className="space-y-4">
      {/* Quick Select Saved Client */}
      {clients && clients.length > 0 && (
        <div className="p-3 bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-xl">
          <label className="block text-xs font-semibold text-sky-600 dark:text-sky-400 mb-1.5 flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5" />
            Quick Autofill from Saved Clients ({clients.length})
          </label>
          <select
            onChange={handleSavedClientChange}
            defaultValue=""
            className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-sky-500"
          >
            <option value="" disabled>Select a saved client to auto-populate...</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} {c.contactPerson ? `(${c.contactPerson})` : ''}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Client / Company Name */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
            Client / Company Name *
          </label>
          {client.name?.trim() && (
            <button
              type="button"
              onClick={handleSaveToDirectory}
              className="text-[11px] text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 flex items-center gap-1 font-medium transition-colors"
            >
              <BookmarkPlus className="w-3 h-3" />
              Save to Directory
            </button>
          )}
        </div>
        <div className="relative">
          <User className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            value={client.name || ''}
            onChange={(e) => onUpdate({ name: e.target.value })}
            placeholder="e.g. Acme Corporation or Jane Doe"
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-sky-500 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Contact Person */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
          Primary Contact Person
        </label>
        <input
          type="text"
          value={client.contactPerson || ''}
          onChange={(e) => onUpdate({ contactPerson: e.target.value })}
          placeholder="e.g. Sarah Jenkins (VP Marketing)"
          className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-sky-500 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none transition-colors"
        />
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
            Client Email
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-3" />
            <input
              type="email"
              value={client.email || ''}
              onChange={(e) => onUpdate({ email: e.target.value })}
              placeholder="client@company.com"
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-sky-500 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
            Client Phone
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              value={client.phone || ''}
              onChange={(e) => onUpdate({ phone: e.target.value })}
              placeholder="+1 (555) 000-0000"
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-sky-500 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Address */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
          Client Billing Address
        </label>
        <div className="relative">
          <MapPin className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-3" />
          <textarea
            rows={2}
            value={client.address || ''}
            onChange={(e) => onUpdate({ address: e.target.value })}
            placeholder="742 Evergreen Blvd, Suite 12&#10;New York, NY 10001"
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-sky-500 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Client Tax ID */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
          Client GSTIN / VAT / Tax ID (Optional)
        </label>
        <div className="relative">
          <Hash className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            value={client.taxId || ''}
            onChange={(e) => onUpdate({ taxId: e.target.value })}
            placeholder="e.g. 29ABCDE1234F1Z5 or EU-VAT"
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-sky-500 rounded-lg pl-9 pr-3 py-2 text-sm font-mono text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none transition-colors"
          />
        </div>
      </div>
    </div>
  );
};
