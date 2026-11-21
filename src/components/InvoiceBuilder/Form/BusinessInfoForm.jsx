import React, { useRef } from 'react';
import { Upload, X, Building, Mail, Phone, Globe, MapPin, Hash } from 'lucide-react';

export const BusinessInfoForm = ({ business, onUpdate }) => {
  const fileInputRef = useRef(null);

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Logo image should be under 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        onUpdate({ logo: event.target?.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    onUpdate({ logo: '' });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-4">
      {/* Logo Upload Section */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wider">
          Company Logo
        </label>
        {business.logo ? (
          <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
            <img
              src={business.logo}
              alt="Uploaded Logo"
              className="h-12 w-28 object-contain bg-white dark:bg-white/5 rounded p-1 border border-slate-200 dark:border-white/10"
            />
            <div className="flex-1">
              <span className="text-xs text-slate-800 dark:text-slate-300 block font-medium">Logo active</span>
              <span className="text-[11px] text-slate-500">Embedded in document preview</span>
            </div>
            <button
              type="button"
              onClick={handleRemoveLogo}
              className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"
              title="Remove logo"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 dark:border-slate-800 hover:border-sky-500/60 bg-slate-50/50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl p-4 text-center cursor-pointer transition-all group"
          >
            <Upload className="w-6 h-6 mx-auto text-slate-400 dark:text-slate-500 group-hover:text-sky-500 mb-1 transition-colors" />
            <p className="text-xs font-medium text-slate-700 dark:text-slate-300 group-hover:text-sky-600 dark:group-hover:text-sky-300">
              Click to upload logo
            </p>
            <p className="text-[10px] text-slate-500 mt-0.5">PNG, JPG or SVG (Max 2MB)</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleLogoUpload}
            />
          </div>
        )}
      </div>

      {/* Business Name */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
          Business / Freelancer Name
        </label>
        <div className="relative">
          <Building className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            value={business.name || ''}
            onChange={(e) => onUpdate({ name: e.target.value })}
            placeholder="e.g. Acme Agency LLC or Alex Developer"
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-sky-500 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-3" />
            <input
              type="email"
              value={business.email || ''}
              onChange={(e) => onUpdate({ email: e.target.value })}
              placeholder="billing@yourbrand.com"
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-sky-500 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              value={business.phone || ''}
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
          Physical Address / City / Country
        </label>
        <div className="relative">
          <MapPin className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-3" />
          <textarea
            rows={2}
            value={business.address || ''}
            onChange={(e) => onUpdate({ address: e.target.value })}
            placeholder="123 Street Ave, Suite 100&#10;San Francisco, CA 94107"
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-sky-500 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Tax ID / GSTIN */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
            Tax ID / GSTIN / EIN
          </label>
          <div className="relative">
            <Hash className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              value={business.taxId || ''}
              onChange={(e) => onUpdate({ taxId: e.target.value })}
              placeholder="e.g. 27AABCU9603R1ZM or US-EIN"
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-sky-500 rounded-lg pl-9 pr-3 py-2 text-sm font-mono text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
            Website URL (Optional)
          </label>
          <div className="relative">
            <Globe className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              value={business.website || ''}
              onChange={(e) => onUpdate({ website: e.target.value })}
              placeholder="https://youragency.com"
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-sky-500 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
