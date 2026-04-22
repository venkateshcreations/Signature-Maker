'use client';
import { SignatureData } from '@/lib/types';

interface TemplateProps {
  sig: SignatureData;
}

function Avatar({ sig }: { sig: SignatureData }) {
  const radius = sig.imageShape === 'circle' ? '50%' : sig.imageShape === 'rounded' ? '8px' : '0';
  if (sig.profileImage) {
    return (
      <img
        src={sig.profileImage}
        alt={sig.fullName}
        style={{ width: 72, height: 72, borderRadius: radius, objectFit: 'cover', display: 'block' }}
      />
    );
  }
  const initials = (sig.fullName || 'U').split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  return (
    <div style={{
      width: 72, height: 72, borderRadius: radius,
      background: `linear-gradient(135deg, ${sig.colors.primary}, ${sig.colors.secondary})`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 24, fontWeight: 700, color: '#fff',
      fontFamily: sig.fonts.family + ', Arial, sans-serif',
    }}>
      {initials}
    </div>
  );
}

function SocialIcons({ sig }: { sig: SignatureData }) {
  const enabled = sig.socials.filter(s => s.enabled && s.url);
  if (!enabled.length) return null;

  const colors: Record<string, string> = {
    linkedin: '#0A66C2', twitter: '#1DA1F2', github: '#24292E',
    instagram: '#E1306C', facebook: '#1877F2', youtube: '#FF0000',
    whatsapp: '#25D366', telegram: '#2CA5E0', custom: '#6366F1',
  };
  const initials: Record<string, string> = {
    linkedin: 'in', twitter: 'X', github: 'gh',
    instagram: 'ig', facebook: 'fb', youtube: 'yt',
    whatsapp: 'wa', telegram: 'tg', custom: '↗',
  };

  return (
    <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
      {enabled.map(s => {
        const bg = sig.iconStyle === 'colored' ? colors[s.type] : sig.iconStyle === 'monochrome' ? sig.colors.text : 'transparent';
        const border = sig.iconStyle === 'outline' ? `2px solid ${sig.colors.primary}` : 'none';
        const color = sig.iconStyle === 'outline' ? sig.colors.primary : '#fff';
        return (
          <a key={s.id} href={s.url} target="_blank" rel="noreferrer"
            style={{ display: 'inline-block', textDecoration: 'none' }}>
            <div style={{
              width: sig.iconSize, height: sig.iconSize, borderRadius: 4,
              background: bg, border, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: Math.round(sig.iconSize * 0.45), fontWeight: 700,
              color, fontFamily: 'Arial, sans-serif',
            }}>
              {initials[s.type] || '→'}
            </div>
          </a>
        );
      })}
    </div>
  );
}

function Divider({ sig }: { sig: SignatureData }) {
  if (!sig.showDivider || sig.divider === 'none') return null;
  return (
    <div style={{ borderTop: `1px ${sig.divider} ${sig.colors.primary}40`, margin: '8px 0' }} />
  );
}

function ContactLine({ icon, text, href, sig }: { icon: string; text: string; href?: string; sig: SignatureData }) {
  if (!text) return null;
  const style: React.CSSProperties = {
    fontSize: sig.fonts.contactSize,
    color: sig.colors.text + '99',
    fontFamily: sig.fonts.family + ', Arial, sans-serif',
    lineHeight: '1.8',
    textDecoration: 'none',
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <span style={{ fontSize: sig.fonts.contactSize - 1 }}>{icon}</span>
      {href ? <a href={href} style={style}>{text}</a> : <span style={style}>{text}</span>}
    </div>
  );
}

// ── Template 1: Classic Left ──────────────────────────────────
export function ClassicLeft({ sig }: TemplateProps) {
  return (
    <table cellPadding={0} cellSpacing={0} style={{ fontFamily: sig.fonts.family + ', Arial, sans-serif', background: sig.colors.background }}>
      <tbody>
        <tr>
          <td style={{ paddingRight: 16, verticalAlign: 'top' }}><Avatar sig={sig} /></td>
          <td style={{ verticalAlign: 'top' }}>
            <div style={{ fontSize: sig.fonts.nameSize, fontWeight: sig.fonts.weight, color: sig.colors.text, lineHeight: 1.2 }}>{sig.fullName}</div>
            <div style={{ fontSize: sig.fonts.titleSize, color: sig.colors.primary, fontWeight: 500, marginTop: 2 }}>
              {sig.jobTitle}{sig.company ? ` · ${sig.company}` : ''}
            </div>
            <Divider sig={sig} />
            <ContactLine icon="✉" text={sig.email} href={`mailto:${sig.email}`} sig={sig} />
            <ContactLine icon="📞" text={sig.phone} sig={sig} />
            <ContactLine icon="🌐" text={sig.website} href={`https://${sig.website}`} sig={sig} />
            <ContactLine icon="📍" text={sig.address || ''} sig={sig} />
            {sig.tagline && <div style={{ fontSize: 11, fontStyle: 'italic', color: sig.colors.text + '66', marginTop: 4 }}>"{sig.tagline}"</div>}
            <SocialIcons sig={sig} />
            {sig.ctaLabel && sig.ctaUrl && (
              <div style={{ marginTop: 10 }}>
                <a href={sig.ctaUrl} style={{ display: 'inline-block', padding: '6px 14px', background: sig.colors.primary, color: '#fff', borderRadius: 4, textDecoration: 'none', fontSize: 11, fontWeight: 600, fontFamily: sig.fonts.family + ', Arial, sans-serif' }}>
                  {sig.ctaLabel}
                </a>
              </div>
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

// ── Template 2: Centered Minimal ─────────────────────────────
export function CenteredMinimal({ sig }: TemplateProps) {
  return (
    <table cellPadding={0} cellSpacing={0} style={{ fontFamily: sig.fonts.family + ', Arial, sans-serif', background: sig.colors.background, textAlign: 'center', width: '100%' }}>
      <tbody>
        <tr><td style={{ textAlign: 'center', paddingBottom: 10 }}><Avatar sig={sig} /></td></tr>
        <tr><td style={{ fontSize: sig.fonts.nameSize, fontWeight: sig.fonts.weight, color: sig.colors.text }}>{sig.fullName}</td></tr>
        <tr><td style={{ fontSize: sig.fonts.titleSize, color: sig.colors.primary, fontWeight: 500, paddingTop: 2 }}>{sig.jobTitle}{sig.company ? ` · ${sig.company}` : ''}</td></tr>
        <tr><td><Divider sig={sig} /></td></tr>
        <tr><td style={{ fontSize: sig.fonts.contactSize, color: sig.colors.text + '99', lineHeight: '1.8' }}>
          {sig.email && <div>✉ <a href={`mailto:${sig.email}`} style={{ color: sig.colors.text + '99', textDecoration: 'none' }}>{sig.email}</a></div>}
          {sig.phone && <div>📞 {sig.phone}</div>}
          {sig.website && <div>🌐 <a href={`https://${sig.website}`} style={{ color: sig.colors.primary, textDecoration: 'none' }}>{sig.website}</a></div>}
        </td></tr>
        <tr><td style={{ textAlign: 'center' }}><SocialIcons sig={sig} /></td></tr>
      </tbody>
    </table>
  );
}

// ── Template 3: Horizontal Compact ───────────────────────────
export function HorizontalCompact({ sig }: TemplateProps) {
  return (
    <table cellPadding={0} cellSpacing={0} style={{ fontFamily: sig.fonts.family + ', Arial, sans-serif', background: sig.colors.background }}>
      <tbody>
        <tr>
          <td style={{ paddingRight: 12, verticalAlign: 'middle' }}><Avatar sig={sig} /></td>
          <td style={{ width: 1, background: sig.colors.primary + '40', verticalAlign: 'middle', padding: '0 12px' }}>
            <div style={{ width: 1, height: 60, background: sig.colors.primary + '40' }} />
          </td>
          <td style={{ verticalAlign: 'middle', paddingLeft: 12 }}>
            <div style={{ fontSize: sig.fonts.nameSize, fontWeight: sig.fonts.weight, color: sig.colors.text }}>{sig.fullName}</div>
            <div style={{ fontSize: sig.fonts.titleSize, color: sig.colors.primary, fontWeight: 500 }}>{sig.jobTitle}</div>
            {sig.company && <div style={{ fontSize: sig.fonts.contactSize, color: sig.colors.text + '88' }}>{sig.company}</div>}
          </td>
          <td style={{ padding: '0 20px', borderLeft: `1px solid ${sig.colors.primary}20`, verticalAlign: 'middle' }}>
            <div style={{ fontSize: sig.fonts.contactSize, color: sig.colors.text + '88', lineHeight: '1.8' }}>
              {sig.email && <div>✉ {sig.email}</div>}
              {sig.phone && <div>📞 {sig.phone}</div>}
              {sig.website && <div>🌐 {sig.website}</div>}
            </div>
            <SocialIcons sig={sig} />
          </td>
        </tr>
      </tbody>
    </table>
  );
}

// ── Template 4: Card Style ───────────────────────────────────
export function CardStyle({ sig }: TemplateProps) {
  return (
    <div style={{ fontFamily: sig.fonts.family + ', Arial, sans-serif', background: sig.colors.background, border: `2px solid ${sig.colors.primary}30`, borderRadius: 12, padding: 20, maxWidth: 400 }}>
      <table cellPadding={0} cellSpacing={0} style={{ width: '100%' }}>
        <tbody>
          <tr>
            <td style={{ verticalAlign: 'top', paddingRight: 14 }}><Avatar sig={sig} /></td>
            <td style={{ verticalAlign: 'top' }}>
              <div style={{ fontSize: sig.fonts.nameSize, fontWeight: sig.fonts.weight, color: sig.colors.text }}>{sig.fullName}</div>
              <div style={{ fontSize: sig.fonts.titleSize, color: sig.colors.primary, fontWeight: 500 }}>{sig.jobTitle}</div>
              {sig.company && <div style={{ fontSize: sig.fonts.contactSize, color: sig.colors.text + '77', fontWeight: 500 }}>{sig.company}</div>}
            </td>
          </tr>
          <tr><td colSpan={2}><Divider sig={sig} /></td></tr>
          <tr>
            <td colSpan={2} style={{ fontSize: sig.fonts.contactSize, color: sig.colors.text + '88', lineHeight: '1.8' }}>
              {sig.email && <div>✉ {sig.email}</div>}
              {sig.phone && <div>📞 {sig.phone}</div>}
              {sig.website && <div>🌐 {sig.website}</div>}
              {sig.address && <div>📍 {sig.address}</div>}
            </td>
          </tr>
          <tr><td colSpan={2}><SocialIcons sig={sig} /></td></tr>
        </tbody>
      </table>
    </div>
  );
}

// ── Template 5: Modern Split ─────────────────────────────────
export function ModernSplit({ sig }: TemplateProps) {
  return (
    <table cellPadding={0} cellSpacing={0} style={{ fontFamily: sig.fonts.family + ', Arial, sans-serif' }}>
      <tbody>
        <tr>
          <td style={{ background: sig.colors.primary, padding: 20, verticalAlign: 'top', borderRadius: '8px 0 0 8px', minWidth: 120, textAlign: 'center' }}>
            <Avatar sig={sig} />
            <div style={{ marginTop: 10 }}><SocialIcons sig={sig} /></div>
          </td>
          <td style={{ background: sig.colors.background, padding: 20, verticalAlign: 'top', borderRadius: '0 8px 8px 0' }}>
            <div style={{ fontSize: sig.fonts.nameSize, fontWeight: sig.fonts.weight, color: sig.colors.text }}>{sig.fullName}</div>
            <div style={{ fontSize: sig.fonts.titleSize, color: sig.colors.primary, fontWeight: 500, marginTop: 2 }}>{sig.jobTitle}</div>
            {sig.company && <div style={{ fontSize: sig.fonts.contactSize, color: sig.colors.text + '88', marginTop: 1 }}>{sig.company}</div>}
            <Divider sig={sig} />
            <div style={{ fontSize: sig.fonts.contactSize, color: sig.colors.text + '88', lineHeight: '1.8' }}>
              {sig.email && <div>✉ {sig.email}</div>}
              {sig.phone && <div>📞 {sig.phone}</div>}
              {sig.website && <div>🌐 {sig.website}</div>}
            </div>
            {sig.ctaLabel && sig.ctaUrl && (
              <a href={sig.ctaUrl} style={{ display: 'inline-block', marginTop: 10, padding: '6px 14px', background: sig.colors.primary, color: '#fff', borderRadius: 4, textDecoration: 'none', fontSize: 11, fontWeight: 600 }}>
                {sig.ctaLabel}
              </a>
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

// ── Template 6: Corporate Formal ─────────────────────────────
export function CorporateFormal({ sig }: TemplateProps) {
  return (
    <table cellPadding={0} cellSpacing={0} style={{ fontFamily: sig.fonts.family + ', Arial, sans-serif', background: sig.colors.background, width: 480 }}>
      <tbody>
        <tr><td colSpan={2} style={{ borderBottom: `3px solid ${sig.colors.primary}`, paddingBottom: 10, marginBottom: 10 }}>
          <div style={{ fontSize: sig.fonts.nameSize + 2, fontWeight: 700, color: sig.colors.primary, letterSpacing: 1 }}>{sig.fullName}</div>
          <div style={{ fontSize: sig.fonts.titleSize, color: sig.colors.text + '88', letterSpacing: 0.5 }}>{sig.jobTitle}{sig.company ? ` | ${sig.company}` : ''}</div>
        </td></tr>
        <tr><td colSpan={2} style={{ padding: '10px 0' }}>
          <table cellPadding={0} cellSpacing={0} style={{ width: '100%' }}>
            <tbody>
              <tr>
                <td style={{ verticalAlign: 'top' }}><Avatar sig={sig} /></td>
                <td style={{ paddingLeft: 16, verticalAlign: 'top', fontSize: sig.fonts.contactSize, color: sig.colors.text + '88', lineHeight: '1.9' }}>
                  {sig.email && <div>✉ {sig.email}</div>}
                  {sig.phone && <div>📞 {sig.phone}</div>}
                  {sig.website && <div>🌐 {sig.website}</div>}
                  {sig.address && <div>📍 {sig.address}</div>}
                  <SocialIcons sig={sig} />
                </td>
              </tr>
            </tbody>
          </table>
        </td></tr>
        <tr><td colSpan={2} style={{ borderTop: `1px solid ${sig.colors.primary}30`, paddingTop: 8, fontSize: 10, color: sig.colors.text + '55', fontStyle: 'italic' }}>
          {sig.tagline || 'Professional · Reliable · Trusted'}
        </td></tr>
      </tbody>
    </table>
  );
}

// ── Template 7: Creative Designer ────────────────────────────
export function CreativeDesigner({ sig }: TemplateProps) {
  return (
    <table cellPadding={0} cellSpacing={0} style={{ fontFamily: sig.fonts.family + ', Arial, sans-serif' }}>
      <tbody>
        <tr>
          <td style={{ width: 6, background: `linear-gradient(180deg, ${sig.colors.primary}, ${sig.colors.secondary})`, borderRadius: 3 }} />
          <td style={{ paddingLeft: 16 }}>
            <table cellPadding={0} cellSpacing={0}>
              <tbody>
                <tr>
                  <td style={{ paddingRight: 14, verticalAlign: 'top' }}><Avatar sig={sig} /></td>
                  <td style={{ verticalAlign: 'top', background: sig.colors.background, padding: 12, borderRadius: 8 }}>
                    <div style={{ fontSize: sig.fonts.nameSize, fontWeight: sig.fonts.weight, color: sig.colors.text }}>{sig.fullName}</div>
                    <div style={{ fontSize: sig.fonts.titleSize, fontWeight: 500, background: `linear-gradient(90deg, ${sig.colors.primary}, ${sig.colors.secondary})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{sig.jobTitle}</div>
                    {sig.company && <div style={{ fontSize: sig.fonts.contactSize, color: sig.colors.text + '77' }}>{sig.company}</div>}
                    <div style={{ marginTop: 8, fontSize: sig.fonts.contactSize, color: sig.colors.text + '88', lineHeight: '1.8' }}>
                      {sig.email && <div>✉ {sig.email}</div>}
                      {sig.phone && <div>📞 {sig.phone}</div>}
                      {sig.website && <div>🌐 {sig.website}</div>}
                    </div>
                    <SocialIcons sig={sig} />
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

// ── Template 8: Banner Header ─────────────────────────────────
export function BannerHeader({ sig }: TemplateProps) {
  return (
    <table cellPadding={0} cellSpacing={0} style={{ fontFamily: sig.fonts.family + ', Arial, sans-serif', width: 500 }}>
      <tbody>
        <tr>
          <td style={{ background: `linear-gradient(135deg, ${sig.colors.primary}, ${sig.colors.secondary})`, padding: '16px 20px', borderRadius: '8px 8px 0 0' }}>
            <table cellPadding={0} cellSpacing={0} style={{ width: '100%' }}>
              <tbody>
                <tr>
                  <td><Avatar sig={sig} /></td>
                  <td style={{ paddingLeft: 14 }}>
                    <div style={{ fontSize: sig.fonts.nameSize, fontWeight: sig.fonts.weight, color: '#fff' }}>{sig.fullName}</div>
                    <div style={{ fontSize: sig.fonts.titleSize, color: '#ffffff99' }}>{sig.jobTitle}{sig.company ? ` · ${sig.company}` : ''}</div>
                  </td>
                  {sig.logo && <td style={{ textAlign: 'right', paddingLeft: 20 }}><img src={sig.logo} alt="logo" style={{ height: 36, objectFit: 'contain' }} /></td>}
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td style={{ background: sig.colors.background, padding: '12px 20px', border: `1px solid ${sig.colors.primary}20`, borderRadius: '0 0 8px 8px', fontSize: sig.fonts.contactSize, color: sig.colors.text + '88', lineHeight: '1.8' }}>
            <table cellPadding={0} cellSpacing={0} style={{ width: '100%' }}>
              <tbody>
                <tr>
                  <td>
                    {sig.email && <span>✉ {sig.email} &nbsp;</span>}
                    {sig.phone && <span>📞 {sig.phone} &nbsp;</span>}
                    {sig.website && <span>🌐 {sig.website}</span>}
                  </td>
                  <td style={{ textAlign: 'right' }}><SocialIcons sig={sig} /></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

// ── Template 9: Two-Tone ─────────────────────────────────────
export function TwoTone({ sig }: TemplateProps) {
  return (
    <table cellPadding={0} cellSpacing={0} style={{ fontFamily: sig.fonts.family + ', Arial, sans-serif', borderRadius: 10, overflow: 'hidden' }}>
      <tbody>
        <tr>
          <td style={{ background: sig.colors.primary, padding: '16px 20px 16px 16px', verticalAlign: 'top', width: 100, textAlign: 'center' }}>
            <Avatar sig={sig} />
            {sig.company && <div style={{ marginTop: 8, fontSize: 10, color: '#ffffff99', fontWeight: 500 }}>{sig.company}</div>}
          </td>
          <td style={{ background: sig.colors.background, padding: 16, verticalAlign: 'top' }}>
            <div style={{ fontSize: sig.fonts.nameSize, fontWeight: sig.fonts.weight, color: sig.colors.text }}>{sig.fullName}</div>
            <div style={{ fontSize: sig.fonts.titleSize, color: sig.colors.primary, fontWeight: 500, marginTop: 2 }}>{sig.jobTitle}</div>
            <Divider sig={sig} />
            <div style={{ fontSize: sig.fonts.contactSize, color: sig.colors.text + '88', lineHeight: '1.8' }}>
              {sig.email && <div>✉ {sig.email}</div>}
              {sig.phone && <div>📞 {sig.phone}</div>}
              {sig.website && <div>🌐 {sig.website}</div>}
            </div>
            <SocialIcons sig={sig} />
          </td>
        </tr>
      </tbody>
    </table>
  );
}

// ── Template 10: Minimal Text ────────────────────────────────
export function MinimalText({ sig }: TemplateProps) {
  return (
    <div style={{ fontFamily: sig.fonts.family + ', Arial, sans-serif', background: sig.colors.background }}>
      <div style={{ fontSize: sig.fonts.nameSize, fontWeight: sig.fonts.weight, color: sig.colors.text }}>{sig.fullName}</div>
      <div style={{ fontSize: sig.fonts.titleSize, color: sig.colors.primary, marginTop: 1 }}>
        {sig.jobTitle}{sig.company ? ` · ${sig.company}` : ''}
      </div>
      <Divider sig={sig} />
      <div style={{ fontSize: sig.fonts.contactSize, color: sig.colors.text + '88' }}>
        {[sig.email, sig.phone, sig.website].filter(Boolean).join(' · ')}
      </div>
      {sig.tagline && <div style={{ fontSize: 11, fontStyle: 'italic', color: sig.colors.text + '55', marginTop: 4 }}>"{sig.tagline}"</div>}
      <SocialIcons sig={sig} />
    </div>
  );
}
