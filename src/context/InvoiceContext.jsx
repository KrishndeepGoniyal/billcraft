import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { DEFAULT_INVOICE_DATA, getTodayDateString, getDueDateString } from '../constants/defaultData';
import { StorageService } from '../utils/storage';

const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
  // Active Invoice Data
  const [invoiceData, setInvoiceData] = useState(() => {
    const savedDraft = StorageService.getCurrentDraft();
    return savedDraft || DEFAULT_INVOICE_DATA;
  });

  // History and Clients
  const [history, setHistory] = useState(() => StorageService.getHistory());
  const [clients, setClients] = useState(() => StorageService.getClients());

  // Toast Notification state
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'info', duration = 3500) => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((current) => (current?.message === message ? null : current));
    }, duration);
  }, []);

  const dismissToast = useCallback(() => {
    setToast(null);
  }, []);

  // Auto-persist active draft to localStorage
  useEffect(() => {
    StorageService.saveCurrentDraft(invoiceData);
  }, [invoiceData]);

  // Update Top-level Fields
  const updateInvoiceData = useCallback((updates) => {
    setInvoiceData((prev) => ({
      ...prev,
      ...updates,
    }));
  }, []);

  // Update Business Details
  const updateBusiness = useCallback((updates) => {
    setInvoiceData((prev) => {
      const updatedBusiness = { ...prev.business, ...updates };
      StorageService.saveBusinessProfile(updatedBusiness);
      return {
        ...prev,
        business: updatedBusiness,
      };
    });
  }, []);

  // Update Client Details
  const updateClient = useCallback((updates) => {
    setInvoiceData((prev) => ({
      ...prev,
      client: { ...prev.client, ...updates },
    }));
  }, []);

  // Line Items Handlers
  const addItem = useCallback(() => {
    const newItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      name: '',
      description: '',
      quantity: 1,
      rate: 0,
    };
    setInvoiceData((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }));
    showToast('New line item added', 'info', 2000);
  }, [showToast]);

  const updateItem = useCallback((index, field, value) => {
    setInvoiceData((prev) => {
      const items = [...prev.items];
      items[index] = { ...items[index], [field]: value };
      return { ...prev, items };
    });
  }, []);

  const removeItem = useCallback((index) => {
    setInvoiceData((prev) => {
      if (prev.items.length <= 1) {
        showToast('Document must contain at least one line item', 'warning');
        return prev;
      }
      const items = prev.items.filter((_, i) => i !== index);
      showToast('Line item removed', 'info', 2000);
      return { ...prev, items };
    });
  }, [showToast]);

  const moveItem = useCallback((index, direction) => {
    setInvoiceData((prev) => {
      const items = [...prev.items];
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= items.length) return prev;
      const temp = items[index];
      items[index] = items[targetIndex];
      items[targetIndex] = temp;
      return { ...prev, items };
    });
  }, []);

  // Auto-increment Next Invoice Number helper
  const getNextInvoiceNumber = useCallback((prefix = 'INV') => {
    const numbers = history
      .map((inv) => {
        const match = inv.invoiceNumber?.match(/(\d+)$/);
        return match ? parseInt(match[1], 10) : 0;
      })
      .filter(Boolean);
    const maxNum = numbers.length > 0 ? Math.max(...numbers) : 1;
    const nextNum = maxNum + 1;
    const year = new Date().getFullYear();
    return `${prefix}-${year}-${String(nextNum).padStart(3, '0')}`;
  }, [history]);

  // Save to History
  const saveInvoice = useCallback((status = 'Draft') => {
    const invoiceToSave = {
      ...invoiceData,
      id: invoiceData.id && invoiceData.id !== 'draft-default' ? invoiceData.id : `inv-${Date.now()}`,
      status,
    };

    const updatedHistory = StorageService.saveInvoiceToHistory(invoiceToSave);
    setHistory(updatedHistory);
    setInvoiceData(invoiceToSave);

    // Also auto-save client to directory if client name is present
    if (invoiceToSave.client?.name?.trim()) {
      const updatedClients = StorageService.saveClient(invoiceToSave.client);
      setClients(updatedClients);
    }

    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch {
      // Ignored if canvas-confetti is not loaded
    }

    showToast(`Invoice "${invoiceToSave.invoiceNumber}" saved to History!`, 'success');
  }, [invoiceData, showToast]);

  // Duplicate Invoice
  const duplicateInvoice = useCallback((invoiceToClone) => {
    const nextNumber = getNextInvoiceNumber(invoiceToClone.docType === 'quotation' ? 'QUO' : 'INV');
    const cloned = {
      ...invoiceToClone,
      id: `inv-${Date.now()}`,
      invoiceNumber: nextNumber,
      issueDate: getTodayDateString(),
      dueDate: getDueDateString(14),
      status: 'Draft',
    };
    setInvoiceData(cloned);
    showToast(`Duplicated as new document ${nextNumber}!`, 'success');
  }, [getNextInvoiceNumber, showToast]);

  // Load from History into Editor
  const loadInvoice = useCallback((savedInvoice) => {
    setInvoiceData(savedInvoice);
    showToast(`Loaded ${savedInvoice.invoiceNumber} into the editor!`, 'info');
  }, [showToast]);

  // Delete from History
  const deleteInvoice = useCallback((id) => {
    const updated = StorageService.deleteInvoiceFromHistory(id);
    setHistory(updated);
    showToast('Invoice deleted from history', 'info');
  }, [showToast]);

  // Update Status in History
  const updateStatus = useCallback((id, status) => {
    const updated = StorageService.updateInvoiceStatus(id, status);
    setHistory(updated);
    if (invoiceData.id === id) {
      setInvoiceData((prev) => ({ ...prev, status }));
    }
    showToast(`Status updated to "${status}"`, 'success');
  }, [invoiceData.id, showToast]);

  // Client Directory Handlers
  const saveClientToDirectory = useCallback((client) => {
    const updated = StorageService.saveClient(client);
    setClients(updated);
    showToast(`Client "${client.name}" saved to directory!`, 'success');
  }, [showToast]);

  const deleteClientFromDirectory = useCallback((clientId) => {
    const updated = StorageService.deleteClient(clientId);
    setClients(updated);
    showToast('Client removed from directory', 'info');
  }, [showToast]);

  const selectClient = useCallback((client) => {
    setInvoiceData((prev) => ({
      ...prev,
      client: { ...client },
    }));
    showToast(`Applied "${client.name}" to invoice!`, 'info', 2000);
  }, [showToast]);

  // Reset to Defaults
  const resetToDefaults = useCallback(() => {
    setInvoiceData(DEFAULT_INVOICE_DATA);
    StorageService.saveCurrentDraft(DEFAULT_INVOICE_DATA);
    showToast('Reset invoice to sample defaults', 'info');
  }, [showToast]);

  // Create New Blank Document
  const createNewBlank = useCallback(() => {
    const blank = {
      ...DEFAULT_INVOICE_DATA,
      id: `inv-${Date.now()}`,
      invoiceNumber: getNextInvoiceNumber('INV'),
      client: {
        name: '',
        contactPerson: '',
        email: '',
        phone: '',
        address: '',
        taxId: '',
      },
      items: [
        {
          id: `item-${Date.now()}`,
          name: '',
          description: '',
          quantity: 1,
          rate: 0,
        },
      ],
      notes: 'Thank you for your business!',
      terms: 'Payment is due within 14 days of issue.',
      status: 'Draft',
    };
    setInvoiceData(blank);
    showToast('Created new blank document', 'info');
  }, [getNextInvoiceNumber, showToast]);

  // Refresh entire state after JSON backup restore
  const refreshFromBackup = useCallback(() => {
    const draft = StorageService.getCurrentDraft();
    if (draft) setInvoiceData(draft);
    setHistory(StorageService.getHistory());
    setClients(StorageService.getClients());
  }, []);

  return (
    <InvoiceContext.Provider
      value={{
        invoiceData,
        updateInvoiceData,
        updateBusiness,
        updateClient,
        addItem,
        updateItem,
        removeItem,
        moveItem,
        saveInvoice,
        duplicateInvoice,
        loadInvoice,
        deleteInvoice,
        updateStatus,
        history,
        clients,
        saveClientToDirectory,
        deleteClientFromDirectory,
        selectClient,
        resetToDefaults,
        createNewBlank,
        refreshFromBackup,
        toast,
        showToast,
        dismissToast,
        getNextInvoiceNumber,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoice = () => {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error('useInvoice must be used within an InvoiceProvider');
  }
  return context;
};
