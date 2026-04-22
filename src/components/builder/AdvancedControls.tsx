'use client';
import { useSignatureStore } from '@/lib/store';
import Toggle from '@/components/shared/Toggle';
import clsx from 'clsx';
import { DividerStyle, ImageShape } from '@/lib/types';

const DIVIDER_STYLES: { value: DividerStyle; label: string }[] = [
  { value: 'solid', label: 'Solid' },
  { value: 'dashed', label: 'Dashed' },
  { value: 'dotted', label: 'Dotted' },
  { value: 'none', label: 'None' },
];

const IMAGE_SHAPES: { value: ImageShape; label: string; icon: string }[] = [
  { value: 'circle', label: 'Circle', icon: '●' },
  { value: 'rounded', label: 'Rounded', icon: '▪' },
  { value: 'square', label: 'Square', icon: '■' },
];

export default function AdvancedControls() {
  const { signature, updateSignature } = useSignatureStore();

  return (
    <div className="space-y-4 animate-slide-up">
      {/* Image shape */}
      <div className="section-card">
        <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">Image Shape</p>
        <div className="grid grid-cols-3 gap-2">
          {IMAGE_SHAPES.map((shape) => (
            <button
              key={shape.value}
              onClick={() => updateSignature({ imageShape: shape.value })}
              className={clsx(
                'flex flex-col items-center py-3 gap-1.5 rounded-xl border text-2xl transition-all',
                signature.imageShape === shape.value
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-border bg-surface text-text-muted hover:border-border-light hover:text-text-secondary'
              )}
            >
              <span style={{ borderRadius: shape.value === 'circle' ? '50%' : shape.value === 'rounded' ? '4px' : '0' }}>
                {shape.icon}
              </span>
              <span className="text-xs font-medium">{shape.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="section-card space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Divider</p>
          <Toggle
            size="sm"
            checked={signature.showDivider}
            onChange={(v) => updateSignature({ showDivider: v })}
          />
        </div>
        {signature.showDivider && (
          <div className="grid grid-cols-2 gap-2">
            {DIVIDER_STYLES.map((style) => (
              <button
                key={style.value}
                onClick={() => updateSignature({ divider: style.value })}
                className={clsx(
                  'py-2 px-3 rounded-xl border text-xs font-medium transition-all flex flex-col gap-1.5 items-start',
                  signature.divider === style.value
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-border bg-surface text-text-muted hover:border-border-light hover:text-text-secondary'
                )}
              >
                <div
                  className="w-full h-px mt-1"
                  style={{
                    borderTop: `1px ${style.value === 'none' ? 'none' : style.value} ${signature.colors.primary}`,
                    opacity: style.value === 'none' ? 0 : 1,
                  }}
                />
                {style.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Signature name */}
      <div className="section-card">
        <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">Signature Name</p>
        <input
          value={signature.name}
          onChange={(e) => updateSignature({ name: e.target.value })}
          placeholder="My Signature"
          className="input-base"
        />
        <p className="text-xs text-text-muted mt-1.5">Used when saving to your library</p>
      </div>
    </div>
  );
}
