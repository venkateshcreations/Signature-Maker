'use client';
import { SignatureData } from '@/lib/types';

interface TemplateProps { sig: SignatureData; }

/* ─── Shared helpers ────────────────────────────────────────────── */
function Avatar({ sig, size = 72 }: { sig: SignatureData; size?: number }) {
  const radius = sig.imageShape === 'circle' ? '50%' : sig.imageShape === 'rounded' ? '8px' : '0';
  const initials = (sig.fullName || 'U').split(' ').map(n => n[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
  if (sig.profileImage) {
    return <img src={sig.profileImage} alt={sig.fullName} style={{ width: size, height: size, borderRadius: radius, objectFit: 'cover', display: 'block' }} />;
  }
  return (
    <div style={{ width: size, height: size, borderRadius: radius, background: `linear-gradient(135deg, ${sig.colors.primary}, ${sig.colors.secondary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.33, fontWeight: 700, color: '#fff', fontFamily: 'Arial, sans-serif' }}>
      {initials}
    </div>
  );
}

function SocialIcons({ sig, marginTop = 8 }: { sig: SignatureData; marginTop?: number }) {
  const enabled = sig.socials.filter(s => s.enabled && s.url);
  if (!enabled.length) return null;
  const colors: Record<string, string> = { linkedin: '#0A66C2', twitter: '#1DA1F2', github: '#24292E', instagram: '#E1306C', facebook: '#1877F2', youtube: '#FF0000', whatsapp: '#25D366', telegram: '#2CA5E0', custom: '#6366F1' };
  const labels: Record<string, string> = { linkedin: 'in', twitter: 'X', github: 'gh', instagram: 'ig', facebook: 'fb', youtube: 'yt', whatsapp: 'wa', telegram: 'tg', custom: '↗' };
  return (
    <div style={{ display: 'flex', gap: 5, marginTop, flexWrap: 'wrap' }}>
      {enabled.map(s => {
        const bg = sig.iconStyle === 'colored' ? colors[s.type] : sig.iconStyle === 'monochrome' ? sig.colors.text : 'transparent';
        const border = sig.iconStyle === 'outline' ? `1.5px solid ${sig.colors.primary}` : 'none';
        const color = sig.iconStyle === 'outline' ? sig.colors.primary : '#fff';
        return (
          <a key={s.id} href={s.url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
            <div style={{ width: sig.iconSize, height: sig.iconSize, borderRadius: 4, background: bg, border, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: Math.round(sig.iconSize * 0.44), fontWeight: 700, color, fontFamily: 'Arial, sans-serif' }}>
              {labels[s.type] || '→'}
            </div>
          </a>
        );
      })}
    </div>
  );
}

function Divider({ sig }: { sig: SignatureData }) {
  if (!sig.showDivider || sig.divider === 'none') return null;
  return <div style={{ borderTop: `1px ${sig.divider} ${sig.colors.primary}40`, margin: '8px 0' }} />;
}

function ContactBlock({ sig }: { sig: SignatureData }) {
  const fs = sig.fonts.contactSize;
  const color = sig.colors.text + '88';
  const link = { color, textDecoration: 'none' as const };
  const style = { fontSize: fs, color, fontFamily: sig.fonts.family + ',Arial,sans-serif', lineHeight: '1.8' };
  return (
    <div style={style}>
      {sig.email && <div>✉ <a href={`mailto:${sig.email}`} style={link}>{sig.email}</a></div>}
      {sig.phone && <div>📞 {sig.phone}</div>}
      {sig.website && <div>🌐 <a href={`https://${sig.website}`} style={{ ...link, color: sig.colors.primary }}>{sig.website}</a></div>}
      {sig.address && <div>📍 {sig.address}</div>}
    </div>
  );
}

function CtaButton({ sig }: { sig: SignatureData }) {
  if (!sig.ctaLabel || !sig.ctaUrl) return null;
  return (
    <div style={{ marginTop: 10 }}>
      <a href={sig.ctaUrl} style={{ display: 'inline-block', padding: '6px 16px', background: sig.colors.primary, color: '#fff', borderRadius: 4, textDecoration: 'none', fontSize: 11, fontWeight: 600, fontFamily: sig.fonts.family + ',Arial,sans-serif' }}>
        {sig.ctaLabel}
      </a>
    </div>
  );
}

/* ─── Template 11: Badge Style ──────────────────────────────────── */
export function BadgeStyle({ sig }: TemplateProps) {
  return (
    <table cellPadding={0} cellSpacing={0} style={{ fontFamily: sig.fonts.family + ',Arial,sans-serif', background: sig.colors.background }}>
      <tbody>
        <tr>
          <td style={{ verticalAlign: 'top', paddingRight: 14 }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <Avatar sig={sig} size={72} />
              {/* Online badge */}
              <div style={{ position: 'absolute', bottom: 2, right: 2, width: 14, height: 14, borderRadius: '50%', background: '#10B981', border: '2px solid white' }} />
            </div>
          </td>
          <td style={{ verticalAlign: 'top' }}>
            <div style={{ display: 'inline-block', padding: '2px 8px', background: sig.colors.primary + '15', border: `1px solid ${sig.colors.primary}30`, borderRadius: 99, fontSize: 10, color: sig.colors.primary, fontWeight: 600, marginBottom: 4 }}>
              {sig.company || 'Company'}
            </div>
            <div style={{ fontSize: sig.fonts.nameSize, fontWeight: sig.fonts.weight, color: sig.colors.text, lineHeight: 1.2 }}>{sig.fullName}</div>
            <div style={{ fontSize: sig.fonts.titleSize, color: sig.colors.primary, fontWeight: 500, marginTop: 2 }}>{sig.jobTitle}</div>
            <Divider sig={sig} />
            <ContactBlock sig={sig} />
            <SocialIcons sig={sig} />
            <CtaButton sig={sig} />
          </td>
        </tr>
      </tbody>
    </table>
  );
}

/* ─── Template 12: Sidebar Accent ───────────────────────────────── */
export function SidebarAccent({ sig }: TemplateProps) {
  return (
    <table cellPadding={0} cellSpacing={0} style={{ fontFamily: sig.fonts.family + ',Arial,sans-serif' }}>
      <tbody>
        <tr>
          <td style={{ width: 4, background: `linear-gradient(180deg, ${sig.colors.primary} 0%, ${sig.colors.accent} 100%)`, borderRadius: 2 }} />
          <td style={{ width: 12 }} />
          <td style={{ verticalAlign: 'top' }}>
            <table cellPadding={0} cellSpacing={0}><tbody>
              <tr>
                <td style={{ paddingRight: 14, verticalAlign: 'top' }}><Avatar sig={sig} size={64} /></td>
                <td style={{ verticalAlign: 'top', background: sig.colors.background, paddingLeft: 4 }}>
                  <div style={{ fontSize: sig.fonts.nameSize, fontWeight: sig.fonts.weight, color: sig.colors.text }}>{sig.fullName}</div>
                  <div style={{ fontSize: sig.fonts.titleSize, color: sig.colors.primary, fontWeight: 500, marginTop: 2 }}>{sig.jobTitle}{sig.company ? ` · ${sig.company}` : ''}</div>
                  <Divider sig={sig} />
                  <ContactBlock sig={sig} />
                  <SocialIcons sig={sig} />
                </td>
              </tr>
            </tbody></table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

/* ─── Template 13: Social Focus ─────────────────────────────────── */
export function SocialFocus({ sig }: TemplateProps) {
  const enabled = sig.socials.filter(s => s.enabled && s.url);
  const colors: Record<string, string> = { linkedin: '#0A66C2', twitter: '#1DA1F2', github: '#24292E', instagram: '#E1306C', facebook: '#1877F2', youtube: '#FF0000', whatsapp: '#25D366', telegram: '#2CA5E0', custom: '#6366F1' };
  const labels: Record<string, string> = { linkedin: 'LinkedIn', twitter: 'Twitter', github: 'GitHub', instagram: 'Instagram', facebook: 'Facebook', youtube: 'YouTube', whatsapp: 'WhatsApp', telegram: 'Telegram', custom: 'Website' };
  return (
    <table cellPadding={0} cellSpacing={0} style={{ fontFamily: sig.fonts.family + ',Arial,sans-serif', background: sig.colors.background }}>
      <tbody>
        <tr>
          <td style={{ paddingRight: 16, verticalAlign: 'top' }}><Avatar sig={sig} /></td>
          <td style={{ verticalAlign: 'top' }}>
            <div style={{ fontSize: sig.fonts.nameSize, fontWeight: sig.fonts.weight, color: sig.colors.text }}>{sig.fullName}</div>
            <div style={{ fontSize: sig.fonts.titleSize, color: sig.colors.primary, fontWeight: 500 }}>{sig.jobTitle}{sig.company ? ` · ${sig.company}` : ''}</div>
            <Divider sig={sig} />
            <ContactBlock sig={sig} />
            {enabled.length > 0 && (
              <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 3 }}>
                {enabled.map(s => (
                  <a key={s.id} href={s.url} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none' }}>
                    <div style={{ width: 16, height: 16, borderRadius: 3, background: colors[s.type] || sig.colors.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 700, color: '#fff', fontFamily: 'Arial,sans-serif' }}>
                      {(labels[s.type] || 'L').charAt(0)}
                    </div>
                    <span style={{ fontSize: 11, color: sig.colors.text + '88' }}>{labels[s.type] || s.type} ↗</span>
                  </a>
                ))}
              </div>
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

/* ─── Template 14: Quote Style ──────────────────────────────────── */
export function QuoteStyle({ sig }: TemplateProps) {
  return (
    <table cellPadding={0} cellSpacing={0} style={{ fontFamily: sig.fonts.family + ',Arial,sans-serif', background: sig.colors.background, maxWidth: 480 }}>
      <tbody>
        {sig.tagline && (
          <tr>
            <td style={{ padding: '10px 16px', background: sig.colors.primary + '08', borderLeft: `3px solid ${sig.colors.primary}`, borderRadius: '0 4px 4px 0', marginBottom: 12, display: 'block' }}>
              <span style={{ fontSize: 13, fontStyle: 'italic', color: sig.colors.primary, fontFamily: sig.fonts.family + ',Arial,sans-serif' }}>
                "{sig.tagline}"
              </span>
            </td>
          </tr>
        )}
        <tr>
          <td style={{ paddingTop: sig.tagline ? 12 : 0 }}>
            <table cellPadding={0} cellSpacing={0}><tbody>
              <tr>
                <td style={{ paddingRight: 14, verticalAlign: 'top' }}><Avatar sig={sig} size={60} /></td>
                <td style={{ verticalAlign: 'top' }}>
                  <div style={{ fontSize: sig.fonts.nameSize, fontWeight: sig.fonts.weight, color: sig.colors.text }}>{sig.fullName}</div>
                  <div style={{ fontSize: sig.fonts.titleSize, color: sig.colors.primary, fontWeight: 500 }}>{sig.jobTitle}{sig.company ? ` · ${sig.company}` : ''}</div>
                  <div style={{ marginTop: 6, fontSize: sig.fonts.contactSize, color: sig.colors.text + '88' }}>
                    {[sig.email, sig.phone, sig.website].filter(Boolean).join('  ·  ')}
                  </div>
                  <SocialIcons sig={sig} marginTop={6} />
                </td>
              </tr>
            </tbody></table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

/* ─── Template 15: Bordered Box ────────────────────────────────── */
export function BorderedBox({ sig }: TemplateProps) {
  return (
    <div style={{ fontFamily: sig.fonts.family + ',Arial,sans-serif', background: sig.colors.background, border: `1px solid ${sig.colors.primary}50`, borderRadius: 10, overflow: 'hidden', maxWidth: 460 }}>
      {/* Colored top strip */}
      <div style={{ height: 4, background: `linear-gradient(90deg, ${sig.colors.primary}, ${sig.colors.accent})` }} />
      <div style={{ padding: '14px 18px' }}>
        <table cellPadding={0} cellSpacing={0} style={{ width: '100%' }}><tbody>
          <tr>
            <td style={{ paddingRight: 14, verticalAlign: 'top' }}><Avatar sig={sig} /></td>
            <td style={{ verticalAlign: 'top' }}>
              <div style={{ fontSize: sig.fonts.nameSize, fontWeight: sig.fonts.weight, color: sig.colors.text }}>{sig.fullName}</div>
              <div style={{ fontSize: sig.fonts.titleSize, color: sig.colors.primary, fontWeight: 500 }}>{sig.jobTitle}</div>
              {sig.company && <div style={{ fontSize: sig.fonts.contactSize, color: sig.colors.text + '77', fontWeight: 600 }}>{sig.company}</div>}
              <Divider sig={sig} />
              <ContactBlock sig={sig} />
            </td>
          </tr>
          <tr>
            <td colSpan={2} style={{ paddingTop: 10, borderTop: `1px solid ${sig.colors.primary}20` }}>
              <table cellPadding={0} cellSpacing={0} style={{ width: '100%' }}><tbody><tr>
                <td><SocialIcons sig={sig} marginTop={0} /></td>
                <td style={{ textAlign: 'right' }}><CtaButton sig={sig} /></td>
              </tr></tbody></table>
            </td>
          </tr>
        </tbody></table>
      </div>
    </div>
  );
}

/* ─── Template 16: Gradient Avatar ─────────────────────────────── */
export function GradientAvatar({ sig }: TemplateProps) {
  const radius = sig.imageShape === 'circle' ? '50%' : sig.imageShape === 'rounded' ? '12px' : '0';
  return (
    <table cellPadding={0} cellSpacing={0} style={{ fontFamily: sig.fonts.family + ',Arial,sans-serif', background: sig.colors.background }}>
      <tbody>
        <tr>
          <td style={{ paddingRight: 18, verticalAlign: 'top' }}>
            {/* Gradient ring around avatar */}
            <div style={{ padding: 3, background: `linear-gradient(135deg, ${sig.colors.primary}, ${sig.colors.accent})`, borderRadius: sig.imageShape === 'circle' ? '50%' : '14px', display: 'inline-block' }}>
              <div style={{ background: sig.colors.background, borderRadius: radius, padding: 2 }}>
                <Avatar sig={sig} size={68} />
              </div>
            </div>
          </td>
          <td style={{ verticalAlign: 'top' }}>
            <div style={{ fontSize: sig.fonts.nameSize, fontWeight: sig.fonts.weight, color: sig.colors.text, lineHeight: 1.2 }}>{sig.fullName}</div>
            <div style={{ fontSize: sig.fonts.titleSize, color: sig.colors.primary, fontWeight: 500, marginTop: 3 }}>{sig.jobTitle}{sig.company ? ` · ${sig.company}` : ''}</div>
            <Divider sig={sig} />
            <ContactBlock sig={sig} />
            <SocialIcons sig={sig} />
            <CtaButton sig={sig} />
          </td>
        </tr>
      </tbody>
    </table>
  );
}

/* ─── Template 17: Pop Shadow ───────────────────────────────────── */
export function PopShadow({ sig }: TemplateProps) {
  return (
    <div style={{ fontFamily: sig.fonts.family + ',Arial,sans-serif', background: sig.colors.background, border: `2px solid ${sig.colors.text}`, borderRadius: 10, padding: 18, boxShadow: `4px 4px 0 ${sig.colors.primary}`, maxWidth: 440, position: 'relative' }}>
      <table cellPadding={0} cellSpacing={0}><tbody>
        <tr>
          <td style={{ paddingRight: 14, verticalAlign: 'top' }}><Avatar sig={sig} /></td>
          <td style={{ verticalAlign: 'top' }}>
            <div style={{ fontSize: sig.fonts.nameSize, fontWeight: sig.fonts.weight, color: sig.colors.text }}>{sig.fullName}</div>
            <div style={{ fontSize: sig.fonts.titleSize, color: sig.colors.primary, fontWeight: 600 }}>{sig.jobTitle}</div>
            {sig.company && <div style={{ fontSize: sig.fonts.contactSize, fontWeight: 600, color: sig.colors.text + '88' }}>{sig.company}</div>}
          </td>
        </tr>
        <tr>
          <td colSpan={2} style={{ paddingTop: 12, borderTop: `1.5px solid ${sig.colors.text}` }}>
            <div style={{ fontSize: sig.fonts.contactSize, color: sig.colors.text + '99', lineHeight: '1.8', fontFamily: sig.fonts.family + ',Arial,sans-serif' }}>
              {sig.email && <span>{sig.email}  </span>}
              {sig.phone && <span>{sig.phone}  </span>}
              {sig.website && <span>{sig.website}</span>}
            </div>
            <SocialIcons sig={sig} marginTop={8} />
          </td>
        </tr>
      </tbody></table>
    </div>
  );
}

/* ─── Template 18: Dark Glass ───────────────────────────────────── */
export function DarkGlass({ sig }: TemplateProps) {
  return (
    <div style={{ fontFamily: sig.fonts.family + ',Arial,sans-serif', background: '#0F172A', borderRadius: 12, padding: 20, border: `1px solid ${sig.colors.primary}40`, maxWidth: 460 }}>
      <table cellPadding={0} cellSpacing={0}><tbody>
        <tr>
          <td style={{ paddingRight: 16, verticalAlign: 'top' }}>
            <div style={{ padding: 2, background: `linear-gradient(135deg, ${sig.colors.primary}, ${sig.colors.accent})`, borderRadius: sig.imageShape === 'circle' ? '50%' : '10px', display: 'inline-block' }}>
              <Avatar sig={sig} size={66} />
            </div>
          </td>
          <td style={{ verticalAlign: 'top' }}>
            <div style={{ fontSize: sig.fonts.nameSize, fontWeight: sig.fonts.weight, color: '#F1F5F9' }}>{sig.fullName}</div>
            <div style={{ fontSize: sig.fonts.titleSize, color: sig.colors.primary, fontWeight: 500, marginTop: 2 }}>{sig.jobTitle}{sig.company ? ` · ${sig.company}` : ''}</div>
            <div style={{ height: 1, background: `linear-gradient(90deg, ${sig.colors.primary}60, transparent)`, margin: '8px 0' }} />
            <div style={{ fontSize: sig.fonts.contactSize, color: '#94A3B8', lineHeight: '1.8', fontFamily: sig.fonts.family + ',Arial,sans-serif' }}>
              {sig.email && <div>✉ {sig.email}</div>}
              {sig.phone && <div>📞 {sig.phone}</div>}
              {sig.website && <div>🌐 {sig.website}</div>}
            </div>
            <SocialIcons sig={sig} />
            {sig.ctaLabel && sig.ctaUrl && (
              <div style={{ marginTop: 10 }}>
                <a href={sig.ctaUrl} style={{ display: 'inline-block', padding: '5px 14px', background: `linear-gradient(135deg, ${sig.colors.primary}, ${sig.colors.accent})`, color: '#fff', borderRadius: 4, textDecoration: 'none', fontSize: 11, fontWeight: 600, fontFamily: 'Arial,sans-serif' }}>
                  {sig.ctaLabel}
                </a>
              </div>
            )}
          </td>
        </tr>
      </tbody></table>
    </div>
  );
}

/* ─── Template 19: Monospace Dev ────────────────────────────────── */
export function MonospaceDev({ sig }: TemplateProps) {
  const mono = 'Courier New,Courier,monospace';
  const green = '#10B981';
  const comment = '#6B7280';
  return (
    <div style={{ fontFamily: mono, background: '#0D1117', borderRadius: 10, padding: '16px 20px', border: '1px solid #30363D', maxWidth: 460 }}>
      <div style={{ fontSize: 11, lineHeight: '1.9', color: '#E6EDF3' }}>
        <div style={{ color: comment }}>{'// Email signature'}</div>
        <div><span style={{ color: '#79C0FF' }}>const</span> <span style={{ color: green }}>me</span> = {'{'}</div>
        <div style={{ paddingLeft: 16 }}><span style={{ color: '#79C0FF' }}>name</span>: <span style={{ color: '#A5D6FF' }}>"{sig.fullName}"</span>,</div>
        <div style={{ paddingLeft: 16 }}><span style={{ color: '#79C0FF' }}>role</span>: <span style={{ color: '#A5D6FF' }}>"{sig.jobTitle}{sig.company ? ` @ ${sig.company}` : ''}"</span>,</div>
        {sig.email && <div style={{ paddingLeft: 16 }}><span style={{ color: '#79C0FF' }}>email</span>: <span style={{ color: '#A5D6FF' }}>"{sig.email}"</span>,</div>}
        {sig.phone && <div style={{ paddingLeft: 16 }}><span style={{ color: '#79C0FF' }}>phone</span>: <span style={{ color: '#A5D6FF' }}>"{sig.phone}"</span>,</div>}
        {sig.website && <div style={{ paddingLeft: 16 }}><span style={{ color: '#79C0FF' }}>web</span>: <span style={{ color: '#A5D6FF' }}>"{sig.website}"</span>,</div>}
        {sig.address && <div style={{ paddingLeft: 16 }}><span style={{ color: '#79C0FF' }}>location</span>: <span style={{ color: '#A5D6FF' }}>"{sig.address}"</span>,</div>}
        <div>{'}'};</div>
        {sig.tagline && <div style={{ marginTop: 4, color: comment }}>{'// '}{sig.tagline}</div>}
        {sig.ctaLabel && sig.ctaUrl && (
          <div style={{ marginTop: 8 }}>
            <a href={sig.ctaUrl} style={{ color: '#79C0FF', textDecoration: 'none' }}>{sig.ctaLabel} →</a>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Template 20: Availability Badge ──────────────────────────── */
export function AvailabilityBadge({ sig }: TemplateProps) {
  return (
    <table cellPadding={0} cellSpacing={0} style={{ fontFamily: sig.fonts.family + ',Arial,sans-serif', background: sig.colors.background, maxWidth: 480 }}>
      <tbody>
        <tr>
          <td style={{ paddingRight: 16, verticalAlign: 'top' }}><Avatar sig={sig} /></td>
          <td style={{ verticalAlign: 'top' }}>
            <div style={{ fontSize: sig.fonts.nameSize, fontWeight: sig.fonts.weight, color: sig.colors.text }}>{sig.fullName}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 3 }}>
              <span style={{ fontSize: sig.fonts.titleSize, color: sig.colors.primary, fontWeight: 500 }}>{sig.jobTitle}</span>
              {/* Availability pulse */}
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 10, fontWeight: 600, color: '#10B981', padding: '2px 8px', background: '#10B98115', border: '1px solid #10B98130', borderRadius: 99 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
                Available
              </span>
            </div>
            <Divider sig={sig} />
            <ContactBlock sig={sig} />
            <SocialIcons sig={sig} />
            <CtaButton sig={sig} />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
