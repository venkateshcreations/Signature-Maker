'use client';
import { useSignatureStore } from '@/lib/store';
import Toggle from '@/components/shared/Toggle';
import Slider from '@/components/shared/Slider';
import clsx from 'clsx';
import { SocialLink } from '@/lib/types';

// Real SVG icons for each platform
const PLATFORM_ICONS: Record<string, React.ReactNode> = {
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  ),
  telegram: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
      <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  ),
};

const PLATFORMS = [
  { type: 'linkedin', label: 'LinkedIn',   color: '#0A66C2', placeholder: 'https://linkedin.com/in/you' },
  { type: 'twitter',  label: 'Twitter / X', color: '#000000', placeholder: 'https://twitter.com/you' },
  { type: 'github',   label: 'GitHub',     color: '#24292E', placeholder: 'https://github.com/you' },
  { type: 'instagram',label: 'Instagram',  color: '#E1306C', placeholder: 'https://instagram.com/you' },
  { type: 'facebook', label: 'Facebook',   color: '#1877F2', placeholder: 'https://facebook.com/you' },
  { type: 'youtube',  label: 'YouTube',    color: '#FF0000', placeholder: 'https://youtube.com/@you' },
  { type: 'whatsapp', label: 'WhatsApp',   color: '#25D366', placeholder: 'https://wa.me/15550000000' },
  { type: 'telegram', label: 'Telegram',   color: '#2CA5E0', placeholder: 'https://t.me/you' },
] as const;

const ICON_STYLES = [
  { value: 'colored',    label: 'Colored' },
  { value: 'monochrome', label: 'Mono' },
  { value: 'outline',    label: 'Outline' },
] as const;

export default function SocialLinksForm() {
  const { signature, updateSignature } = useSignatureStore();

  const updateSocial = (type: string, updates: Partial<SocialLink>) => {
    const exists = signature.socials.find(s => s.type === type);
    let socials: SocialLink[];
    if (exists) {
      socials = signature.socials.map(s => s.type === type ? { ...s, ...updates } : s);
    } else {
      socials = [...signature.socials, { id: type, type: type as SocialLink['type'], url: '', enabled: false, ...updates }];
    }
    updateSignature({ socials });
  };

  const getPlatformSocial = (type: string) =>
    signature.socials.find(s => s.type === type) || { id: type, type: type as SocialLink['type'], url: '', enabled: false };

  return (
    <div className="space-y-4 animate-slide-up">
      {/* Icon style */}
      <div className="section-card">
        <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">Icon Style</p>
        <div className="grid grid-cols-3 gap-2">
          {ICON_STYLES.map(style => (
            <button
              key={style.value}
              onClick={() => updateSignature({ iconStyle: style.value })}
              className={clsx(
                'py-2 text-xs rounded-xl border font-medium transition-all',
                signature.iconStyle === style.value
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-border bg-surface text-text-muted hover:text-text-secondary hover:border-border-light'
              )}
            >
              {style.label}
            </button>
          ))}
        </div>
        <div className="mt-4">
          <Slider label="Icon Size" value={signature.iconSize} min={14} max={32} unit="px" onChange={v => updateSignature({ iconSize: v })} />
        </div>
      </div>

      {/* Platforms */}
      <div className="section-card space-y-2">
        <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">Platforms</p>
        {PLATFORMS.map(platform => {
          const social = getPlatformSocial(platform.type);
          return (
            <div key={platform.type} className="social-item">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-white"
                style={{ background: platform.color }}
              >
                {PLATFORM_ICONS[platform.type]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-text-secondary">{platform.label}</span>
                  <Toggle size="sm" checked={social.enabled} onChange={v => updateSocial(platform.type, { enabled: v })} />
                </div>
                {social.enabled && (
                  <input
                    type="url"
                    value={social.url}
                    onChange={e => updateSocial(platform.type, { url: e.target.value })}
                    placeholder={platform.placeholder}
                    className="input-base text-xs"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
