'use client';
import { useRef } from 'react';
import { useSignatureStore } from '@/lib/store';
import { SignatureData } from '@/lib/types';
import {
  ClassicLeft, CenteredMinimal, HorizontalCompact, CardStyle, ModernSplit,
  CorporateFormal, CreativeDesigner, BannerHeader, TwoTone, MinimalText
} from '@/components/templates/AllTemplates';
import {
  BadgeStyle, SidebarAccent, SocialFocus, QuoteStyle, BorderedBox,
  GradientAvatar, PopShadow, DarkGlass, MonospaceDev, AvailabilityBadge
} from '@/components/templates/MoreTemplates';
import { Monitor, Smartphone, Sun, Moon, ZoomIn, ZoomOut } from 'lucide-react';
import clsx from 'clsx';

function TemplateRenderer({ sig }: { sig: SignatureData }) {
  switch (sig.template) {
    case 'classic-left':        return <ClassicLeft sig={sig} />;
    case 'centered-minimal':    return <CenteredMinimal sig={sig} />;
    case 'horizontal-compact':  return <HorizontalCompact sig={sig} />;
    case 'card-style':          return <CardStyle sig={sig} />;
    case 'modern-split':        return <ModernSplit sig={sig} />;
    case 'corporate-formal':    return <CorporateFormal sig={sig} />;
    case 'creative-designer':   return <CreativeDesigner sig={sig} />;
    case 'banner-header':       return <BannerHeader sig={sig} />;
    case 'two-tone':            return <TwoTone sig={sig} />;
    case 'minimal-text':        return <MinimalText sig={sig} />;
    case 'badge-style':         return <BadgeStyle sig={sig} />;
    case 'sidebar-accent':      return <SidebarAccent sig={sig} />;
    case 'social-focus':        return <SocialFocus sig={sig} />;
    case 'quote-style':         return <QuoteStyle sig={sig} />;
    case 'bordered-box':        return <BorderedBox sig={sig} />;
    case 'gradient-avatar':     return <GradientAvatar sig={sig} />;
    case 'pop-shadow':          return <PopShadow sig={sig} />;
    case 'dark-glass':          return <DarkGlass sig={sig} />;
    case 'monospace-dev':       return <MonospaceDev sig={sig} />;
    case 'availability-badge':  return <AvailabilityBadge sig={sig} />;
    default:                    return <ClassicLeft sig={sig} />;
  }
}

export default function PreviewPanel() {
  const { signature, previewMode, previewTheme, zoom, setPreviewMode, setPreviewTheme, setZoom } = useSignatureStore();
  const previewRef = useRef<HTMLDivElement>(null);

  const isDark = previewTheme === 'dark';
  const isMobile = previewMode === 'mobile';

  return (
    <div className="flex flex-col h-full">
      {/* Preview toolbar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-panel/50">
        <div className="flex items-center gap-1 bg-surface rounded-xl p-1">
          <button
            onClick={() => setPreviewMode('desktop')}
            className={clsx(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
              previewMode === 'desktop'
                ? 'bg-card text-text-primary shadow'
                : 'text-text-muted hover:text-text-secondary'
            )}
          >
            <Monitor size={13} />
            Desktop
          </button>
          <button
            onClick={() => setPreviewMode('mobile')}
            className={clsx(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
              previewMode === 'mobile'
                ? 'bg-card text-text-primary shadow'
                : 'text-text-muted hover:text-text-secondary'
            )}
          >
            <Smartphone size={13} />
            Mobile
          </button>
        </div>

        <div className="flex items-center gap-1">
          {/* Theme toggle */}
          <button
            onClick={() => setPreviewTheme(isDark ? 'light' : 'dark')}
            className="btn-ghost"
            title={`Switch to ${isDark ? 'light' : 'dark'} preview`}
          >
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          {/* Zoom */}
          <div className="flex items-center gap-1 bg-surface rounded-lg p-1">
            <button
              onClick={() => setZoom(Math.max(50, zoom - 10))}
              className="w-6 h-6 flex items-center justify-center text-text-muted hover:text-text-secondary rounded"
            >
              <ZoomOut size={12} />
            </button>
            <span className="text-xs font-mono text-text-secondary w-10 text-center">{zoom}%</span>
            <button
              onClick={() => setZoom(Math.min(150, zoom + 10))}
              className="w-6 h-6 flex items-center justify-center text-text-muted hover:text-text-secondary rounded"
            >
              <ZoomIn size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* Email chrome + signature */}
      <div
        className="flex-1 overflow-auto flex items-center justify-center"
        style={{
          padding: '24px 32px',
          backgroundImage: 'radial-gradient(circle, #1E2330 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      >
        <div
          className="transition-all duration-300 w-full"
          style={{ maxWidth: isMobile ? 390 : '100%' }}
        >
          {/* Email client chrome */}
          <div className={clsx('rounded-xl overflow-hidden shadow-preview border', isDark ? 'border-slate-700' : 'border-preview-border')}>
            {/* Chrome top bar */}
            <div className={clsx('px-4 py-3 border-b', isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200')}>
              <div className="flex gap-1.5 mb-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              {[
                { label: 'From', value: `${signature.fullName} <${signature.email || 'you@email.com'}>` },
                { label: 'To', value: 'team@company.com' },
                { label: 'Subject', value: 'Following up on our conversation' },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center gap-2 py-0.5">
                  <span className={clsx('text-xs font-medium w-12', isDark ? 'text-slate-400' : 'text-slate-500')}>{label}</span>
                  <span className={clsx('text-xs flex-1 truncate', isDark ? 'text-slate-300' : 'text-slate-600')}>{value}</span>
                </div>
              ))}
            </div>

            {/* Email body */}
            <div className={clsx('px-5 py-4', isDark ? 'bg-slate-900' : 'bg-white')}>
              <p className={clsx('text-sm mb-4 leading-relaxed', isDark ? 'text-slate-300' : 'text-slate-700')}>
                Hi there,<br />
                <br />
                Thanks for your time today. Looking forward to working together on this project.
                Let me know if you have any questions!
              </p>
              <p className={clsx('text-sm mb-5', isDark ? 'text-slate-300' : 'text-slate-700')}>
                Best regards,
              </p>

              {/* Signature */}
              <div
                ref={previewRef}
                id="signature-preview"
                style={{
                  transform: `scale(${zoom / 100})`,
                  transformOrigin: 'top left',
                  transition: 'transform 0.2s ease',
                  display: 'inline-block',
                }}
              >
                <TemplateRenderer sig={signature} />
              </div>
            </div>
          </div>

          {/* Info badge */}
          <p className="text-xs text-text-muted text-center mt-3">
            ✨ Live preview — updates as you type
          </p>
        </div>
      </div>
    </div>
  );
}

export { TemplateRenderer };
