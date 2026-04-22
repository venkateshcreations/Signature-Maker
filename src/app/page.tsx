'use client';
import { useEffect } from 'react';
import { useSignatureStore } from '@/lib/store';
import TopBar from '@/components/layout/TopBar';
import BuilderPanel from '@/components/layout/BuilderPanel';
import PreviewPanel from '@/components/preview/PreviewPanel';

export default function Home() {
  const loadFromStorage = useSignatureStore((s) => s.loadFromStorage);

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const store = useSignatureStore.getState();
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        store.undo();
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        store.redo();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        store.saveSignature();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-base">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <BuilderPanel />
        {/* Preview area */}
        <div className="flex-1 overflow-hidden bg-base">
          <PreviewPanel />
        </div>
      </div>
    </div>
  );
}
