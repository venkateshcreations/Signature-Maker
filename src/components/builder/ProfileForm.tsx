'use client';
import { useCallback, useRef } from 'react';
import { Upload, User, Building2, X } from 'lucide-react';
import { useSignatureStore } from '@/lib/store';

export default function ProfileForm() {
  const { signature, updateSignature } = useSignatureStore();
  const profileRef = useRef<HTMLInputElement>(null);
  const logoRef = useRef<HTMLInputElement>(null);

  const u = (f: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    updateSignature({ [f]: e.target.value } as never);

  const handleImageUpload = useCallback(
    (field: 'profileImage' | 'logo', file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        // Resize via canvas
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxSize = field === 'profileImage' ? 200 : 300;
          const ratio = Math.min(maxSize / img.width, maxSize / img.height);
          canvas.width = img.width * ratio;
          canvas.height = img.height * ratio;
          const ctx = canvas.getContext('2d')!;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          updateSignature({ [field]: canvas.toDataURL('image/jpeg', 0.85) } as never);
        };
        img.src = result;
      };
      reader.readAsDataURL(file);
    },
    [updateSignature]
  );

  const onDrop = (field: 'profileImage' | 'logo') => (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) handleImageUpload(field, file);
  };

  const ImageUploadBox = ({
    field,
    label,
    icon: Icon,
    refEl,
  }: {
    field: 'profileImage' | 'logo';
    label: string;
    icon: React.ElementType;
    refEl: React.RefObject<HTMLInputElement>;
  }) => (
    <div className="flex-1">
      <label className="field-label">{label}</label>
      {signature[field] ? (
        <div className="relative group">
          <img
            src={signature[field]}
            alt={label}
            className="w-full h-20 object-contain rounded-xl border border-border bg-surface"
          />
          <button
            onClick={() => updateSignature({ [field]: undefined } as never)}
            className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-error/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X size={12} />
          </button>
        </div>
      ) : (
        <div
          className="h-20 rounded-xl border-2 border-dashed border-border hover:border-accent/50 bg-surface/50 hover:bg-surface transition-all flex flex-col items-center justify-center gap-1 cursor-pointer"
          onClick={() => refEl.current?.click()}
          onDrop={onDrop(field)}
          onDragOver={(e) => e.preventDefault()}
        >
          <Icon size={16} className="text-text-muted" />
          <span className="text-xs text-text-muted">Drop or click</span>
        </div>
      )}
      <input
        ref={refEl}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleImageUpload(field, f);
        }}
      />
    </div>
  );

  return (
    <div className="space-y-4 animate-slide-up">
      {/* Image uploads */}
      <div className="section-card">
        <p className="text-xs font-semibold text-text-secondary mb-3 uppercase tracking-wider">Images</p>
        <div className="flex gap-3">
          <ImageUploadBox field="profileImage" label="Profile Photo" icon={User} refEl={profileRef} />
          <ImageUploadBox field="logo" label="Company Logo" icon={Building2} refEl={logoRef} />
        </div>
      </div>

      {/* Basic info */}
      <div className="section-card space-y-3">
        <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Basic Info</p>
        {[
          { field: 'fullName', label: 'Full Name', placeholder: 'Alexandra Chen' },
          { field: 'jobTitle', label: 'Job Title', placeholder: 'Senior Product Designer' },
          { field: 'company', label: 'Company', placeholder: 'Studio Nova' },
        ].map(({ field, label, placeholder }) => (
          <div key={field}>
            <label className="field-label">{label}</label>
            <input
              value={signature[field as keyof typeof signature] as string || ''}
              onChange={u(field)}
              placeholder={placeholder}
              className="input-base"
            />
          </div>
        ))}
      </div>

      {/* Contact */}
      <div className="section-card space-y-3">
        <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Contact</p>
        {[
          { field: 'email', label: 'Email', placeholder: 'you@company.com', type: 'email' },
          { field: 'phone', label: 'Phone', placeholder: '+1 (555) 000-0000', type: 'tel' },
          { field: 'phone2', label: 'Phone 2 (optional)', placeholder: '+1 (555) 000-0001', type: 'tel' },
          { field: 'website', label: 'Website', placeholder: 'yoursite.com', type: 'text' },
          { field: 'address', label: 'Location (optional)', placeholder: 'San Francisco, CA', type: 'text' },
        ].map(({ field, label, placeholder, type }) => (
          <div key={field}>
            <label className="field-label">{label}</label>
            <input
              type={type}
              value={signature[field as keyof typeof signature] as string || ''}
              onChange={u(field)}
              placeholder={placeholder}
              className="input-base"
            />
          </div>
        ))}
      </div>

      {/* Optional extras */}
      <div className="section-card space-y-3">
        <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Extras</p>
        <div>
          <label className="field-label">Tagline / Bio</label>
          <textarea
            value={signature.tagline || ''}
            onChange={(e) => updateSignature({ tagline: e.target.value })}
            placeholder="Designing products people love."
            className="input-base resize-none"
            rows={2}
          />
        </div>
        <div>
          <label className="field-label">CTA Label</label>
          <input
            value={signature.ctaLabel || ''}
            onChange={(e) => updateSignature({ ctaLabel: e.target.value })}
            placeholder="Book a Meeting"
            className="input-base"
          />
        </div>
        <div>
          <label className="field-label">CTA URL</label>
          <input
            type="url"
            value={signature.ctaUrl || ''}
            onChange={(e) => updateSignature({ ctaUrl: e.target.value })}
            placeholder="https://cal.com/yourname"
            className="input-base"
          />
        </div>
      </div>
    </div>
  );
}
