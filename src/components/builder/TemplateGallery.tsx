'use client';
import { useSignatureStore } from '@/lib/store';
import { TemplateId } from '@/lib/types';
import clsx from 'clsx';

const TEMPLATES: { id: TemplateId; label: string; desc: string; preview: string; tag?: string }[] = [
  // Original 10
  { id: 'classic-left',       label: 'Classic Left',     desc: 'Timeless left-aligned',       preview: '⬛ ——\n   ——\n   ——' },
  { id: 'centered-minimal',   label: 'Centered',         desc: 'Clean centered layout',        preview: '  ⬛\n  ——\n  ——' },
  { id: 'horizontal-compact', label: 'Horizontal',       desc: 'Compact single-row',           preview: '⬛│——│——' },
  { id: 'card-style',         label: 'Card Style',       desc: 'Boxed with border',            preview: '┌━━━━┐\n│⬛ ─│\n└━━━━┘' },
  { id: 'modern-split',       label: 'Modern Split',     desc: 'Two-column layout',            preview: '█│——\n █│——' },
  { id: 'corporate-formal',   label: 'Corporate',        desc: 'Formal business style',        preview: '═══\n⬛ ─\n═══' },
  { id: 'creative-designer',  label: 'Creative',         desc: 'Bold & colorful',              preview: '▌⬛ ──\n▌   ──' },
  { id: 'banner-header',      label: 'Banner',           desc: 'Full-width gradient header',   preview: '████\n⬛ ──' },
  { id: 'two-tone',           label: 'Two-Tone',         desc: 'Split color background',       preview: '▐⬛│──\n▐  │──' },
  { id: 'minimal-text',       label: 'Minimal Text',     desc: 'Text-only, no images',         preview: '──────\n─ · ─ ·─' },
  // New 10
  { id: 'badge-style',        label: 'Badge',            desc: 'Company pill badge',           preview: '[Co.]\n⬛ ——\n   ——', tag: 'New' },
  { id: 'sidebar-accent',     label: 'Sidebar Accent',   desc: 'Gradient left bar',            preview: '▌⬛ ──\n▌    ──', tag: 'New' },
  { id: 'social-focus',       label: 'Social Focus',     desc: 'Listed social links',          preview: '⬛ ——\n   [in]\n   [gh]', tag: 'New' },
  { id: 'quote-style',        label: 'Quote Style',      desc: 'Tagline prominently shown',    preview: '"……"\n⬛ ——\n   ——', tag: 'New' },
  { id: 'bordered-box',       label: 'Bordered Box',     desc: 'Top accent strip + box',       preview: '━━━━\n⬛ ──\n────', tag: 'New' },
  { id: 'gradient-avatar',    label: 'Gradient Ring',    desc: 'Gradient ring avatar',         preview: '(◉) ——\n     ——', tag: 'New' },
  { id: 'pop-shadow',         label: 'Pop Shadow',       desc: 'Bold offset shadow',           preview: '╔═══╗\n║⬛ ─║\n║───║', tag: 'New' },
  { id: 'dark-glass',         label: 'Dark Glass',       desc: 'Dark glassmorphism card',      preview: '▓▓▓▓▓\n ⬛ ──\n ─────', tag: 'New' },
  { id: 'monospace-dev',      label: 'Dev Code',         desc: 'Code block style signature',   preview: '// sig\nconst\n  me={}', tag: 'New' },
  { id: 'availability-badge', label: 'Available',        desc: 'Green availability pulse',     preview: '⬛ — ●\n   ——\n   ——', tag: 'New' },
];

export default function TemplateGallery() {
  const { signature, setTemplate } = useSignatureStore();

  return (
    <div className="animate-slide-up space-y-4">
      <div className="section-card">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Choose Layout</p>
          <span className="badge-gradient">20 Templates</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {TEMPLATES.map((tpl) => {
            const selected = signature.template === tpl.id;
            return (
              <button
                key={tpl.id}
                onClick={() => setTemplate(tpl.id)}
                className={clsx('template-card text-left p-3 relative', selected && 'selected')}
              >
                {/* New badge */}
                {tpl.tag && (
                  <span className="absolute top-2 left-2 text-[9px] font-bold px-1.5 py-0.5 rounded-full z-10"
                    style={{ background: signature.colors.primary, color: '#fff' }}>
                    {tpl.tag}
                  </span>
                )}

                {/* ASCII preview frame */}
                <div
                  className="w-full h-14 rounded-lg mb-2 flex items-center justify-center overflow-hidden"
                  style={{
                    background: selected
                      ? `linear-gradient(135deg, ${signature.colors.primary}20, ${signature.colors.secondary}10)`
                      : '#1A1D25',
                    border: `1px solid ${selected ? signature.colors.primary + '50' : '#1E2330'}`,
                  }}
                >
                  <pre
                    className="text-[7px] leading-tight font-mono select-none"
                    style={{ color: selected ? signature.colors.primary : '#475569' }}
                  >
                    {tpl.preview}
                  </pre>
                </div>

                <p className={clsx('text-xs font-semibold truncate', selected ? 'text-accent' : 'text-text-secondary')}>
                  {tpl.label}
                </p>
                <p className="text-[10px] text-text-muted mt-0.5 truncate leading-snug">{tpl.desc}</p>

                {/* Check indicator */}
                {selected && (
                  <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-accent flex items-center justify-center">
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                      <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
