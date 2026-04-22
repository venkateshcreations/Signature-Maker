'use client';
import clsx from 'clsx';

interface ToggleProps {
  checked: boolean;
  onChange: (val: boolean) => void;
  label?: string;
  size?: 'sm' | 'md';
}

export default function Toggle({ checked, onChange, label, size = 'md' }: ToggleProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer group">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div
          className={clsx(
            'rounded-full transition-all duration-200',
            size === 'sm' ? 'w-8 h-4' : 'w-10 h-5',
            checked ? 'bg-accent' : 'bg-surface-hover border border-border-light'
          )}
          style={checked ? { boxShadow: '0 0 10px rgba(99,102,241,0.4)' } : {}}
        />
        <div
          className={clsx(
            'absolute top-0.5 transition-all duration-200 bg-white rounded-full shadow-sm',
            size === 'sm' ? 'w-3 h-3' : 'w-4 h-4',
            checked
              ? size === 'sm' ? 'left-[18px]' : 'left-[22px]'
              : 'left-0.5'
          )}
        />
      </div>
      {label && (
        <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
          {label}
        </span>
      )}
    </label>
  );
}
