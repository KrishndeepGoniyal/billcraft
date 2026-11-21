import React, { useState, useRef } from 'react';
import {
  History,
  Search,
  Download,
  Upload,
  Trash2,
  Edit3,
  Copy,
  Users,
  FileSpreadsheet,
  Plus,
  ArrowUpRight,
} from 'lucide-react';
import { useInvoice } from '../../context/InvoiceContext';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { StorageService } from '../../utils/storage';

export const HistoryDirectory = ({ onNavigateToEditor }) => {
  const {
    history,
    loadInvoice,
    duplicateInvoice,
    deleteInvoice,
    updateStatus,
    clients,
    deleteClientFromDirectory,
    selectClient,
    createNewBlank,
    refreshFromBackup,
    showToast,
  } = useInvoice();

  const [activeTab, setActiveTab] = useState('invoices'); // 'invoices' | 'clients'
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const fileInputRef = useRef(null);

  // Filter Invoices
  const filteredInvoices = history.filter((inv) => {
    const matchesSearch =
      inv.invoiceNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.client?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.business?.name?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || (inv.status || 'Draft').toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  // Filter Clients
  const filteredClients = clients.filter((c) =>
    c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.contactPerson?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Status Badge Helper
  const renderStatusBadge = (status = 'Draft') => {
    const map = {
      Draft: 'bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
      Sent: 'bg-sky-50 text-sky-700 border-sky-300 dark:bg-sky-500/10 dark:text-sky-400 dark:border-sky-500/30',
      Paid: 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/30',
    };
    const badgeClass = map[status] || map.Draft;

    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${badgeClass}`}>
        {status}
      </span>
    );
  };

  // JSON Backup Export
  const handleExportBackup = () => {
    StorageService.exportBackupJson();
    showToast('Exported BillCraft backup JSON!', 'success');
  };

  // JSON Backup Import
  const handleImportBackup = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        const result = StorageService.restoreBackupJson(content);
        if (result.success) {
          refreshFromBackup();
          showToast(
            `Restored backup successfully (${result.invoicesCount} invoices, ${result.clientsCount} clients)!`,
            'success'
          );
        } else {
          showToast(`Backup restore failed: ${result.error}`, 'error');
        }
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8 space-y-6 animate-fade-in">
      {/* Top Header & Backup Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <History className="w-7 h-7 text-sky-600 dark:text-sky-400" />
            Document History & Client Directory
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1">
            All your invoices and clients are safely stored inside your browser's private local storage.
          </p>
        </div>

        {/* JSON Backup & Restore Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExportBackup}
            className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
            title="Download JSON backup file to your computer"
          >
            <Download className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>Export Backup</span>
          </button>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
            title="Restore data from previously exported JSON backup"
          >
            <Upload className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Restore Backup</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            className="hidden"
            onChange={handleImportBackup}
          />
        </div>
      </div>

      {/* Tabs & Controls Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        {/* Tab Toggle */}
        <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 w-fit transition-colors">
          <button
            type="button"
            onClick={() => setActiveTab('invoices')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'invoices'
                ? 'bg-sky-600 text-white shadow'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            Invoices & Quotes ({history.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('clients')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'clients'
                ? 'bg-sky-600 text-white shadow'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Saved Clients ({clients.length})
          </button>
        </div>

        {/* Search & Status Filter */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, number..."
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-sky-500 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none transition-colors"
            />
          </div>

          {activeTab === 'invoices' && (
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-sky-500 rounded-xl px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 focus:outline-none transition-colors"
            >
              <option value="all">All Statuses</option>
              <option value="draft">Draft</option>
              <option value="sent">Sent</option>
              <option value="paid">Paid</option>
            </select>
          )}

          {activeTab === 'invoices' && (
            <button
              type="button"
              onClick={() => {
                createNewBlank();
                onNavigateToEditor();
              }}
              className="bg-sky-600 hover:bg-sky-500 text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-sky-600/20 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create New</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Tab Content */}
      {activeTab === 'invoices' ? (
        <div className="space-y-4">
          {filteredInvoices.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-slate-900/40 rounded-2xl border border-slate-200 dark:border-slate-800 transition-colors">
              <FileSpreadsheet className="w-12 h-12 mx-auto text-slate-400 dark:text-slate-600 mb-3" />
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-300">No documents found</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                {history.length === 0
                  ? 'Your saved invoices and quotations will appear here. Click "Save Draft" in the editor to record one.'
                  : 'No records matched your search query.'}
              </p>
              {history.length === 0 && (
                <button
                  type="button"
                  onClick={onNavigateToEditor}
                  className="mt-4 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-semibold transition-colors"
                >
                  Go to Invoice Editor
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm transition-colors">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-950/80">
                    <th className="py-3 px-4">Document</th>
                    <th className="py-3 px-4">Client Name</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Total Amount</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {filteredInvoices.map((inv) => {
                    const subtotal = inv.items?.reduce(
                      (acc, it) => acc + (Number(it.quantity) || 0) * (Number(it.rate) || 0),
                      0
                    ) || 0;

                    return (
                      <tr key={inv.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900 dark:text-white font-mono flex items-center gap-1.5">
                            {inv.invoiceNumber}
                            <span className="text-[10px] text-slate-500 font-sans font-normal uppercase">
                              ({inv.docType === 'quotation' ? 'Quote' : 'Invoice'})
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            {inv.items?.length || 0} line items
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-slate-800 dark:text-slate-200">
                            {inv.client?.name || 'Untitled Client'}
                          </div>
                          {inv.client?.email && (
                            <div className="text-[11px] text-slate-500">{inv.client.email}</div>
                          )}
                        </td>

                        <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">
                          <div>Issued: {formatDate(inv.issueDate)}</div>
                          <div className="text-[11px] text-slate-500">Due: {formatDate(inv.dueDate)}</div>
                        </td>

                        <td className="py-3.5 px-4 font-mono font-bold text-slate-900 dark:text-slate-100">
                          {formatCurrency(subtotal, inv.currency)}
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            {renderStatusBadge(inv.status)}
                            {/* Fast status switcher */}
                            <select
                              value={inv.status || 'Draft'}
                              onChange={(e) => updateStatus(inv.id, e.target.value)}
                              className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[10px] rounded px-1.5 py-0.5 text-slate-600 dark:text-slate-400 focus:outline-none focus:border-sky-500"
                              title="Update status"
                            >
                              <option value="Draft">Draft</option>
                              <option value="Sent">Sent</option>
                              <option value="Paid">Paid</option>
                            </select>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* Load into Editor */}
                            <button
                              type="button"
                              onClick={() => {
                                loadInvoice(inv);
                                onNavigateToEditor();
                              }}
                              className="p-1.5 text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 hover:bg-sky-50 dark:hover:bg-sky-500/10 rounded-lg transition-colors"
                              title="Load into Editor"
                              aria-label="Load invoice into editor"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>

                            {/* Duplicate */}
                            <button
                              type="button"
                              onClick={() => {
                                duplicateInvoice(inv);
                                onNavigateToEditor();
                              }}
                              className="p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                              title="Duplicate invoice"
                              aria-label="Duplicate invoice"
                            >
                              <Copy className="w-4 h-4" />
                            </button>

                            {/* Delete */}
                            <button
                              type="button"
                              onClick={() => deleteInvoice(inv.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors"
                              title="Delete invoice"
                              aria-label="Delete invoice"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        /* Clients Directory Tab */
        <div className="space-y-4">
          {filteredClients.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-slate-900/40 rounded-2xl border border-slate-200 dark:border-slate-800 transition-colors">
              <Users className="w-12 h-12 mx-auto text-slate-400 dark:text-slate-600 mb-3" />
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-300">No saved clients</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Clients are automatically added when you enter their details in an invoice and click "Save to Directory" or save an invoice.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredClients.map((client) => (
                <div
                  key={client.id}
                  className="p-5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 space-y-3 transition-all shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">{client.name}</h4>
                      {client.contactPerson && (
                        <span className="text-xs text-slate-600 dark:text-slate-400 block">{client.contactPerson}</span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => deleteClientFromDirectory(client.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded transition-colors"
                      title="Remove client"
                      aria-label="Remove client"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                    {client.email && <div>Email: {client.email}</div>}
                    {client.phone && <div>Tel: {client.phone}</div>}
                    {client.address && (
                      <div className="text-[11px] text-slate-500 truncate">{client.address}</div>
                    )}
                    {client.taxId && (
                      <div className="text-[11px] font-mono text-slate-500">Tax ID: {client.taxId}</div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      selectClient(client);
                      onNavigateToEditor();
                    }}
                    className="w-full py-2 px-3 rounded-lg bg-sky-50 hover:bg-sky-100 dark:bg-sky-600/10 dark:hover:bg-sky-600/20 text-sky-700 dark:text-sky-400 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-sky-200 dark:border-sky-500/20"
                  >
                    <span>Use on Active Invoice</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
