'use client';
import { useSignatureStore } from '@/lib/store';
import { useToast } from '@/components/shared/Toast';
import { Undo2, Redo2, Save, RotateCcw, Zap } from 'lucide-react';

export default function TopBar() {
  const { undo, redo, canUndo, canRedo, resetSignature, saveSignature, signature } = useSignatureStore();
  const { toast } = useToast();

  const handleSave = () => {
    saveSignature();
    toast(`"${signature.name || 'Signature'}" saved to library`, 'success');
  };

  const handleReset = () => {
    resetSignature();
    toast('Signature reset to defaults', 'info');
  };

  return (
    <header className="h-14 flex items-center justify-between px-5 border-b border-border bg-panel/80 backdrop-blur-sm sticky top-0 z-40 flex-shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #6366F1, #22D3EE)' }}
        >
          <Zap size={15} className="text-white" />
        </div>
        <div className="hidden sm:block">
          <p className="text-sm font-bold text-text-primary font-display leading-none tracking-tight">SignatureMaker</p>
          <p className="text-[10px] text-text-muted leading-none mt-0.5 tracking-wide">Studio Pro</p>
        </div>
      </div>

      {/* Center — editing name pill */}
      <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-surface rounded-lg border border-border max-w-[200px]">
        <div className="w-1.5 h-1.5 rounded-full bg-success flex-shrink-0" />
        <span className="text-xs text-text-muted truncate">
          {signature.name || 'Untitled Signature'}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        <button
          onClick={undo}
          disabled={!canUndo()}
          title="Undo (Ctrl+Z)"
          className="btn-ghost disabled:opacity-25 disabled:cursor-not-allowed p-2"
        >
          <Undo2 size={14} />
        </button>
        <button
          onClick={redo}
          disabled={!canRedo()}
          title="Redo (Ctrl+Y)"
          className="btn-ghost disabled:opacity-25 disabled:cursor-not-allowed p-2"
        >
          <Redo2 size={14} />
        </button>

        <div className="w-px h-4 bg-border mx-1" />

        <button onClick={handleReset} title="Reset to defaults" className="btn-ghost p-2">
          <RotateCcw size={14} />
          <span className="hidden sm:inline text-xs ml-1">Reset</span>
        </button>

        <button onClick={handleSave} className="btn-primary ml-1">
          <Save size={13} />
          <span className="hidden sm:inline text-xs">Save</span>
        </button>
      </div>
    </header>
  );
}
