/**
 * LocalStorage & Data Persistence Helpers with JSON Backup & Restore
 */

const KEYS = {
  CURRENT_DRAFT: 'billcraft_current_draft',
  HISTORY: 'billcraft_invoices_history',
  CLIENTS: 'billcraft_clients_directory',
  BUSINESS_PROFILE: 'billcraft_business_profile',
};

// Safe JSON parse helper
const safeGet = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (err) {
    console.error(`Error reading ${key} from localStorage:`, err);
    return fallback;
  }
};

// Safe JSON set helper
const safeSet = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    console.error(`Error saving ${key} to localStorage:`, err);
    return false;
  }
};

export const StorageService = {
  // Current Draft
  getCurrentDraft: () => safeGet(KEYS.CURRENT_DRAFT, null),
  saveCurrentDraft: (data) => safeSet(KEYS.CURRENT_DRAFT, data),
  clearCurrentDraft: () => localStorage.removeItem(KEYS.CURRENT_DRAFT),

  // History of Saved Invoices
  getHistory: () => safeGet(KEYS.HISTORY, []),
  saveInvoiceToHistory: (invoice) => {
    const history = safeGet(KEYS.HISTORY, []);
    const existingIndex = history.findIndex((inv) => inv.id === invoice.id);
    let updatedHistory;

    const invoiceWithTimestamp = {
      ...invoice,
      updatedAt: new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      updatedHistory = [...history];
      updatedHistory[existingIndex] = invoiceWithTimestamp;
    } else {
      updatedHistory = [invoiceWithTimestamp, ...history];
    }

    safeSet(KEYS.HISTORY, updatedHistory);
    return updatedHistory;
  },

  deleteInvoiceFromHistory: (id) => {
    const history = safeGet(KEYS.HISTORY, []);
    const updatedHistory = history.filter((inv) => inv.id !== id);
    safeSet(KEYS.HISTORY, updatedHistory);
    return updatedHistory;
  },

  updateInvoiceStatus: (id, status) => {
    const history = safeGet(KEYS.HISTORY, []);
    const updatedHistory = history.map((inv) =>
      inv.id === id ? { ...inv, status, updatedAt: new Date().toISOString() } : inv
    );
    safeSet(KEYS.HISTORY, updatedHistory);
    return updatedHistory;
  },

  // Client Directory
  getClients: () => safeGet(KEYS.CLIENTS, []),
  saveClient: (client) => {
    const clients = safeGet(KEYS.CLIENTS, []);
    const clientId = client.id || `client-${Date.now()}`;
    const clientToSave = { ...client, id: clientId, updatedAt: new Date().toISOString() };
    
    const existingIndex = clients.findIndex((c) => c.id === clientId || c.name.toLowerCase() === client.name.toLowerCase());
    let updatedClients;
    if (existingIndex >= 0) {
      updatedClients = [...clients];
      updatedClients[existingIndex] = clientToSave;
    } else {
      updatedClients = [clientToSave, ...clients];
    }
    safeSet(KEYS.CLIENTS, updatedClients);
    return updatedClients;
  },
  deleteClient: (clientId) => {
    const clients = safeGet(KEYS.CLIENTS, []);
    const updated = clients.filter((c) => c.id !== clientId);
    safeSet(KEYS.CLIENTS, updated);
    return updated;
  },

  // Business Profile
  getBusinessProfile: () => safeGet(KEYS.BUSINESS_PROFILE, null),
  saveBusinessProfile: (business) => safeSet(KEYS.BUSINESS_PROFILE, business),

  // JSON Backup (Export all data)
  exportBackupJson: () => {
    const backupData = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      appName: 'BillCraft',
      currentDraft: safeGet(KEYS.CURRENT_DRAFT, null),
      history: safeGet(KEYS.HISTORY, []),
      clients: safeGet(KEYS.CLIENTS, []),
      businessProfile: safeGet(KEYS.BUSINESS_PROFILE, null),
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `billcraft-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  // JSON Restore (Import data)
  restoreBackupJson: (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || typeof parsed !== 'object') {
        throw new Error('Invalid JSON format');
      }

      if (parsed.currentDraft) safeSet(KEYS.CURRENT_DRAFT, parsed.currentDraft);
      if (Array.isArray(parsed.history)) safeSet(KEYS.HISTORY, parsed.history);
      if (Array.isArray(parsed.clients)) safeSet(KEYS.CLIENTS, parsed.clients);
      if (parsed.businessProfile) safeSet(KEYS.BUSINESS_PROFILE, parsed.businessProfile);

      return {
        success: true,
        invoicesCount: parsed.history?.length || 0,
        clientsCount: parsed.clients?.length || 0,
      };
    } catch (err) {
      return {
        success: false,
        error: err.message || 'Failed to parse JSON file',
      };
    }
  },
};
