'use client';
import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import clsx from 'clsx';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
  presets?: string[];
}

const DEFAULT_PRESETS = [
  '#6366F1', '#8B5CF6', '#EC4899', '#EF4444',
  '#F59E0B', '#10B981', '#06B6D4', '#3B82F6',
  '#1E293B', '#64748B', '#FFFFFF', '#000000',
];

export default function ColorPicker({ label, value, onChange, presets = DEFAULT_PRESETS }: ColorPickerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-2">
      <label className="field-label">{label}</label>
      <div className="flex items-center gap-2">
        {/* Color input */}
        <div className="relative w-10 h-9 rounded-lg overflow-hidden border border-border-light cursor-pointer flex-shrink-0">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="absolute inset-0 rounded-lg" style={{ background: value }} />
        </div>
        {/* Hex input */}
        <div className="relative flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => {
              const v = e.target.value;
              if (/^#[0-9A-Fa-f]{0,6}$/.test(v)) onChange(v);
            }}
            className="input-base font-mono text-xs pr-8"
            maxLength={7}
            spellCheck={false}
          />
          <button
            onClick={handleCopy}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
          >
            {copied ? <Check size={12} className="text-success" /> : <Copy size={12} />}
          </button>
        </div>
      </div>
      {/* Presets */}
      <div className="flex flex-wrap gap-1.5">
        {presets.map((preset) => (
          <button
            key={preset}
            onClick={() => onChange(preset)}
            title={preset}
            className={clsx(
              'color-swatch',
              value.toLowerCase() === preset.toLowerCase() && 'selected'
            )}
            style={{ background: preset }}
          />
        ))}
      </div>
    </div>
  );
}
