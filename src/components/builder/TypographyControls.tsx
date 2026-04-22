'use client';
import { useSignatureStore } from '@/lib/store';
import FontSelector from '@/components/shared/FontSelector';
import Slider from '@/components/shared/Slider';
import clsx from 'clsx';

const WEIGHTS = [
  { value: '400', label: 'Regular' },
  { value: '500', label: 'Medium' },
  { value: '600', label: 'Semibold' },
  { value: '700', label: 'Bold' },
];

export default function TypographyControls() {
  const { signature, updateSignature } = useSignatureStore();
  const f = signature.fonts;

  const updateFont = (updates: Partial<typeof f>) => {
    updateSignature({ fonts: { ...f, ...updates } });
  };

  return (
    <div className="space-y-4 animate-slide-up">
      <div className="section-card space-y-4">
        <FontSelector
          value={f.family}
          onChange={(family) => updateFont({ family })}
        />

        {/* Font weight */}
        <div>
          <label className="field-label">Name Weight</label>
          <div className="grid grid-cols-4 gap-1.5">
            {WEIGHTS.map((w) => (
              <button
                key={w.value}
                onClick={() => updateFont({ weight: w.value as typeof f.weight })}
                className={clsx(
                  'py-1.5 text-xs rounded-lg border transition-all',
                  f.weight === w.value
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-border bg-surface text-text-muted hover:text-text-secondary hover:border-border-light'
                )}
                style={{ fontWeight: w.value }}
              >
                {w.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="section-card space-y-4">
        <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Font Sizes</p>
        <Slider
          label="Name Size"
          value={f.nameSize}
          min={14}
          max={28}
          unit="px"
          onChange={(v) => updateFont({ nameSize: v })}
        />
        <Slider
          label="Title Size"
          value={f.titleSize}
          min={10}
          max={20}
          unit="px"
          onChange={(v) => updateFont({ titleSize: v })}
        />
        <Slider
          label="Contact Size"
          value={f.contactSize}
          min={9}
          max={16}
          unit="px"
          onChange={(v) => updateFont({ contactSize: v })}
        />
        <Slider
          label="Line Height"
          value={f.lineHeight}
          min={1.2}
          max={2.0}
          step={0.1}
          onChange={(v) => updateFont({ lineHeight: v })}
        />
      </div>

      {/* Preview */}
      <div className="section-card">
        <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">Preview</p>
        <div className="bg-white rounded-lg p-4 border border-preview-border">
          <p
            style={{
              fontFamily: f.family,
              fontSize: f.nameSize,
              fontWeight: f.weight,
              lineHeight: f.lineHeight,
              color: signature.colors.text,
            }}
          >
            {signature.fullName || 'Your Name'}
          </p>
          <p
            style={{
              fontFamily: f.family,
              fontSize: f.titleSize,
              lineHeight: f.lineHeight,
              color: signature.colors.primary,
              fontWeight: 500,
            }}
          >
            {signature.jobTitle || 'Your Job Title'}
          </p>
          <p
            style={{
              fontFamily: f.family,
              fontSize: f.contactSize,
              lineHeight: f.lineHeight,
              color: signature.colors.text + '88',
            }}
          >
            {signature.email || 'email@example.com'}
          </p>
        </div>
      </div>
    </div>
  );
}
