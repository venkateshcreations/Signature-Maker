import { SignatureData } from './types';

export function generateSignatureHTML(sig: SignatureData): string {
  const dividerColor = sig.colors.primary + '40';
  const dividerHTML =
    sig.showDivider && sig.divider !== 'none'
      ? `<tr><td colspan="2" style="padding:8px 0 0 0;"><div style="border-top:1px ${sig.divider} ${dividerColor};"></div></td></tr>`
      : '';

  const imageRadius =
    sig.imageShape === 'circle'
      ? '50%'
      : sig.imageShape === 'rounded'
      ? '8px'
      : '0';

  const profileImgHTML = sig.profileImage
    ? `<img src="${sig.profileImage}" alt="${sig.fullName}" width="72" height="72" style="width:72px;height:72px;border-radius:${imageRadius};object-fit:cover;display:block;" />`
    : `<div style="width:72px;height:72px;border-radius:${imageRadius};background:linear-gradient(135deg,${sig.colors.primary},${sig.colors.secondary});display:flex;align-items:center;justify-content:center;font-family:Arial,sans-serif;font-size:24px;font-weight:700;color:#fff;text-align:center;line-height:72px;">${(sig.fullName || 'U').charAt(0).toUpperCase()}</div>`;

  const socialIconsHTML = sig.socials
    .filter((s) => s.enabled && s.url)
    .map((s) => {
      const color = sig.iconStyle === 'colored' ? getSocialColor(s.type) : (sig.iconStyle === 'monochrome' ? sig.colors.text : 'transparent');
      return `<a href="${s.url}" style="display:inline-block;margin-right:6px;text-decoration:none;" target="_blank">
        <div style="width:${sig.iconSize}px;height:${sig.iconSize}px;border-radius:4px;background:${color};display:inline-flex;align-items:center;justify-content:center;">
          <span style="color:#fff;font-size:${Math.round(sig.iconSize * 0.55)}px;font-family:Arial,sans-serif;font-weight:700;">${getSocialInitial(s.type)}</span>
        </div>
      </a>`;
    })
    .join('');

  const ctaHTML =
    sig.ctaLabel && sig.ctaUrl
      ? `<tr><td style="padding-top:10px;"><a href="${sig.ctaUrl}" style="display:inline-block;padding:6px 14px;background:${sig.colors.primary};color:#fff;border-radius:4px;text-decoration:none;font-family:${sig.fonts.family},Arial,sans-serif;font-size:11px;font-weight:600;">${sig.ctaLabel}</a></td></tr>`
      : '';

  const websiteHTML = sig.website
    ? `<a href="https://${sig.website}" style="color:${sig.colors.primary};text-decoration:none;">${sig.website}</a>`
    : '';

  return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:${sig.fonts.family},Arial,sans-serif;background:${sig.colors.background};">
  <tr>
    <td style="padding-right:16px;vertical-align:top;">${profileImgHTML}</td>
    <td style="vertical-align:top;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="font-size:${sig.fonts.nameSize}px;font-weight:${sig.fonts.weight};color:${sig.colors.text};line-height:1.2;white-space:nowrap;">${sig.fullName}</td>
        </tr>
        <tr>
          <td style="font-size:${sig.fonts.titleSize}px;color:${sig.colors.primary};font-weight:500;padding-top:2px;">${sig.jobTitle}${sig.company ? ` · ${sig.company}` : ''}</td>
        </tr>
        ${dividerHTML}
        <tr>
          <td style="padding-top:8px;font-size:${sig.fonts.contactSize}px;color:${sig.colors.text}88;line-height:1.8;">
            ${sig.email ? `<span>✉ <a href="mailto:${sig.email}" style="color:${sig.colors.text}88;text-decoration:none;">${sig.email}</a></span><br>` : ''}
            ${sig.phone ? `<span>📞 ${sig.phone}</span><br>` : ''}
            ${sig.website ? `<span>🌐 ${websiteHTML}</span><br>` : ''}
            ${sig.address ? `<span>📍 ${sig.address}</span>` : ''}
          </td>
        </tr>
        ${sig.tagline ? `<tr><td style="padding-top:6px;font-size:11px;font-style:italic;color:${sig.colors.text}60;">"${sig.tagline}"</td></tr>` : ''}
        ${socialIconsHTML ? `<tr><td style="padding-top:8px;">${socialIconsHTML}</td></tr>` : ''}
        ${ctaHTML}
      </table>
    </td>
  </tr>
</table>`;
}

function getSocialColor(type: string): string {
  const colors: Record<string, string> = {
    linkedin: '#0A66C2',
    twitter: '#1DA1F2',
    github: '#24292E',
    instagram: '#E1306C',
    facebook: '#1877F2',
    youtube: '#FF0000',
    whatsapp: '#25D366',
    telegram: '#2CA5E0',
    custom: '#6366F1',
  };
  return colors[type] || '#6366F1';
}

function getSocialInitial(type: string): string {
  const initials: Record<string, string> = {
    linkedin: 'in',
    twitter: 'X',
    github: 'gh',
    instagram: 'ig',
    facebook: 'fb',
    youtube: 'yt',
    whatsapp: 'wa',
    telegram: 'tg',
    custom: '↗',
  };
  return initials[type] || '→';
}

export async function downloadAsPNG(element: HTMLElement, filename: string) {
  const { default: html2canvas } = await import('html2canvas');
  const canvas = await html2canvas(element, {
    backgroundColor: null,
    scale: 2,
    useCORS: true,
  });
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}
