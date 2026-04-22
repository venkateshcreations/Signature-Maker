'use client';
import { useSignatureStore } from '@/lib/store';
import ColorPicker from '@/components/shared/ColorPicker';

const COLOR_PRESETS = [
  { label: 'Indigo', colors: { primary: '#6366F1', secondary: '#8B5CF6', text: '#1E293B', background: '#FFFFFF', accent: '#22D3EE' } },
  { label: 'Ocean', colors: { primary: '#0EA5E9', secondary: '#06B6D4', text: '#0F172A', background: '#FFFFFF', accent: '#38BDF8' } },
  { label: 'Emerald', colors: { primary: '#10B981', secondary: '#059669', text: '#064E3B', background: '#FFFFFF', accent: '#34D399' } },
  { label: 'Rose', colors: { primary: '#F43F5E', secondary: '#EC4899', text: '#1C1917', background: '#FFFFFF', accent: '#FB7185' } },
  { label: 'Amber', colors: { primary: '#F59E0B', secondary: '#EF4444', text: '#292524', background: '#FFFFFF', accent: '#FBBF24' } },
  { label: 'Slate', colors: { primary: '#475569', secondary: '#64748B', text: '#1E293B', background: '#FFFFFF', accent: '#94A3B8' } },
  { label: 'Dark', colors: { primary: '#818CF8', secondary: '#A78BFA', text: '#E2E8F0', background: '#0F172A', accent: '#22D3EE' } },
  { label: 'Purple', colors: { primary: '#7C3AED', secondary: '#9333EA', text: '#1E1B4B', background: '#FFFFFF', accent: '#A78BFA' } },
];

export default function BrandingControls() {
  const { signature, updateSignature } = useSignatureStore();

  const setColors = (colors: typeof signature.colors) => {
    updateSignature({ colors });
  };

  return (
    <div className="space-y-4 animate-slide-up">
      {/* Color presets */}
      <div className="section-card">
        <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">Quick Palettes</p>
        <div className="grid grid-cols-4 gap-2">
          {COLOR_PRESETS.map((preset) => (
            <button
              key={preset.label}
              onClick={() => setColors(preset.colors as typeof signature.colors)}
              className="group flex flex-col items-center gap-1.5 p-2 rounded-xl border border-border hover:border-accent/40 transition-all hover:bg-surface/50"
            >
              <div className="flex gap-0.5">
                {['primary', 'secondary', 'accent'].map((k) => (
                  <div
                    key={k}
                    className="w-4 h-4 rounded-full"
                    style={{ background: preset.colors[k as keyof typeof preset.colors] }}
                  />
                ))}
              </div>
              <span className="text-[10px] text-text-muted group-hover:text-text-secondary transition-colors truncate w-full text-center">
                {preset.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Custom colors */}
      <div className="section-card space-y-4">
        <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Custom Colors</p>
        <ColorPicker
          label="Primary Color"
          value={signature.colors.primary}
          onChange={(v) => updateSignature({ colors: { ...signature.colors, primary: v } })}
        />
        <ColorPicker
          label="Secondary Color"
          value={signature.colors.secondary}
          onChange={(v) => updateSignature({ colors: { ...signature.colors, secondary: v } })}
        />
        <ColorPicker
          label="Accent Color"
          value={signature.colors.accent}
          onChange={(v) => updateSignature({ colors: { ...signature.colors, accent: v } })}
        />
        <ColorPicker
          label="Text Color"
          value={signature.colors.text}
          onChange={(v) => updateSignature({ colors: { ...signature.colors, text: v } })}
          presets={['#0F172A', '#1E293B', '#334155', '#475569', '#64748B', '#F1F5F9', '#FFFFFF', '#000000']}
        />
        <ColorPicker
          label="Background"
          value={signature.colors.background}
          onChange={(v) => updateSignature({ colors: { ...signature.colors, background: v } })}
          presets={['#FFFFFF', '#F8FAFC', '#F1F5F9', '#EFF6FF', '#F0FDF4', '#FFF7ED', '#0F172A', '#111318']}
        />
      </div>
    </div>
  );
}
