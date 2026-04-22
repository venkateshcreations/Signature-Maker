'use client';
import { ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const FONTS = [
  'Arial', 'Georgia', 'Times New Roman', 'Verdana', 'Trebuchet MS',
  'Helvetica', 'Tahoma', 'Palatino', 'Impact',
  'Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat',
  'Poppins', 'Raleway', 'Ubuntu', 'Nunito', 'Source Sans Pro',
  'Playfair Display', 'Merriweather', 'Libre Baskerville',
];

interface FontSelectorProps {
  value: string;
  onChange: (font: string) => void;
}

export default function FontSelector({ value, onChange }: FontSelectorProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  const filtered = FONTS.filter((f) =>
    f.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <label className="field-label">Font Family</label>
      <button
        onClick={() => setOpen(!open)}
        className="input-base flex items-center justify-between cursor-pointer"
        style={{ fontFamily: value }}
      >
        <span>{value}</span>
        <ChevronDown size={14} className={`text-text-muted transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-card overflow-hidden">
          <div className="p-2 border-b border-border">
            <input
              type="text"
              placeholder="Search fonts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-base text-xs"
              autoFocus
            />
          </div>
          <div className="overflow-y-auto max-h-48">
            {filtered.map((font) => (
              <button
                key={font}
                onClick={() => { onChange(font); setOpen(false); setSearch(''); }}
                className={`w-full text-left px-3 py-2 text-sm transition-colors hover:bg-surface ${
                  value === font ? 'text-accent bg-accent/10' : 'text-text-secondary'
                }`}
                style={{ fontFamily: font }}
              >
                {font}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
