import { create } from 'zustand';
import { SignatureData, defaultSignature, TemplateId } from './types';
import { v4 as uuidv4 } from 'uuid';

interface HistoryEntry {
  data: SignatureData;
}

interface SignatureStore {
  signature: SignatureData;
  savedSignatures: SignatureData[];
  history: HistoryEntry[];
  historyIndex: number;
  previewMode: 'desktop' | 'mobile';
  previewTheme: 'light' | 'dark';
  activeTab: string;
  zoom: number;

  // Actions
  updateSignature: (updates: Partial<SignatureData>) => void;
  setTemplate: (template: TemplateId) => void;
  resetSignature: () => void;
  saveSignature: () => void;
  loadSignature: (id: string) => void;
  deleteSignature: (id: string) => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  setPreviewMode: (mode: 'desktop' | 'mobile') => void;
  setPreviewTheme: (theme: 'light' | 'dark') => void;
  setActiveTab: (tab: string) => void;
  setZoom: (zoom: number) => void;
  loadFromStorage: () => void;
}

const STORAGE_KEY = 'esm_signatures';
const MAX_HISTORY = 50;

function pushHistory(history: HistoryEntry[], index: number, data: SignatureData) {
  const newHistory = history.slice(0, index + 1);
  newHistory.push({ data: JSON.parse(JSON.stringify(data)) });
  if (newHistory.length > MAX_HISTORY) newHistory.shift();
  return newHistory;
}

export const useSignatureStore = create<SignatureStore>((set, get) => ({
  signature: { ...defaultSignature, id: uuidv4() },
  savedSignatures: [],
  history: [{ data: { ...defaultSignature, id: uuidv4() } }],
  historyIndex: 0,
  previewMode: 'desktop',
  previewTheme: 'light',
  activeTab: 'profile',
  zoom: 100,

  updateSignature: (updates) => {
    set((state) => {
      const newData = { ...state.signature, ...updates };
      const newHistory = pushHistory(state.history, state.historyIndex, newData);
      return {
        signature: newData,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    });
  },

  setTemplate: (template) => {
    get().updateSignature({ template });
  },

  resetSignature: () => {
    const fresh = { ...defaultSignature, id: uuidv4() };
    set({
      signature: fresh,
      history: [{ data: fresh }],
      historyIndex: 0,
    });
  },

  saveSignature: () => {
    set((state) => {
      const existing = state.savedSignatures.find((s) => s.id === state.signature.id);
      let updated: SignatureData[];
      if (existing) {
        updated = state.savedSignatures.map((s) =>
          s.id === state.signature.id ? state.signature : s
        );
      } else {
        updated = [...state.savedSignatures, state.signature];
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      }
      return { savedSignatures: updated };
    });
  },

  loadSignature: (id) => {
    const sig = get().savedSignatures.find((s) => s.id === id);
    if (sig) {
      set({
        signature: sig,
        history: [{ data: sig }],
        historyIndex: 0,
      });
    }
  },

  deleteSignature: (id) => {
    set((state) => {
      const updated = state.savedSignatures.filter((s) => s.id !== id);
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      }
      return { savedSignatures: updated };
    });
  },

  undo: () => {
    set((state) => {
      if (state.historyIndex <= 0) return state;
      const newIndex = state.historyIndex - 1;
      return {
        historyIndex: newIndex,
        signature: { ...state.history[newIndex].data },
      };
    });
  },

  redo: () => {
    set((state) => {
      if (state.historyIndex >= state.history.length - 1) return state;
      const newIndex = state.historyIndex + 1;
      return {
        historyIndex: newIndex,
        signature: { ...state.history[newIndex].data },
      };
    });
  },

  canUndo: () => get().historyIndex > 0,
  canRedo: () => get().historyIndex < get().history.length - 1,

  setPreviewMode: (mode) => set({ previewMode: mode }),
  setPreviewTheme: (theme) => set({ previewTheme: theme }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setZoom: (zoom) => set({ zoom }),

  loadFromStorage: () => {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const sigs = JSON.parse(raw) as SignatureData[];
        set({ savedSignatures: sigs });
      }
    } catch {
      // ignore
    }
  },
}));
