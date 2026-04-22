'use client';
import { useState } from 'react';
import { useSignatureStore } from '@/lib/store';
import { generateSignatureHTML, downloadAsPNG, copyToClipboard } from '@/lib/exportUtils';
import { useToast } from '@/components/shared/Toast';
import { Copy, Download, FileCode, Image, FileText, Check } from 'lucide-react';

export default function ExportPanel() {
  const { signature } = useSignatureStore();
  const { toast } = useToast();
  const [downloading, setDownloading] = useState(false);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const html = generateSignatureHTML(signature);

  const handleCopy = async (type: string, text: string, label: string) => {
    setLoadingId(type);
    try {
      await copyToClipboard(text);
      toast(`${label} copied to clipboard!`, 'success');
    } catch {
      toast('Copy failed — try manually selecting the HTML below', 'error');
    } finally {
      setTimeout(() => setLoadingId(null), 1500);
    }
  };

  const handleDownloadHTML = () => {
    const blob = new Blob(
      [`<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body>${html}</body></html>`],
      { type: 'text/html' }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${signature.name || 'signature'}.html`;
    a.click();
    URL.revokeObjectURL(url);
    toast('HTML file downloaded!', 'success');
  };

  const handleDownloadPNG = async () => {
    const el = document.getElementById('signature-preview');
    if (!el) { toast('Preview not found — make sure the preview is visible', 'error'); return; }
    setDownloading(true);
    try {
      await downloadAsPNG(el, `${signature.name || 'signature'}.png`);
      toast('PNG image downloaded!', 'success');
    } catch {
      toast('PNG export failed', 'error');
    } finally {
      setDownloading(false);
    }
  };

  const plainText = [
    signature.fullName,
    `${signature.jobTitle}${signature.company ? ` | ${signature.company}` : ''}`,
    signature.email,
    signature.phone,
    signature.website,
    signature.address,
  ].filter(Boolean).join('\n');

  const actions = [
    {
      id: 'html',
      label: 'Copy as HTML',
      desc: 'Gmail · Outlook · Apple Mail',
      icon: FileCode,
      action: () => handleCopy('html', html, 'HTML'),
      accent: true,
    },
    {
      id: 'text',
      label: 'Copy Plain Text',
      desc: 'Fallback for simple clients',
      icon: FileText,
      action: () => handleCopy('text', plainText, 'Plain text'),
      accent: false,
    },
    {
      id: 'download-html',
      label: 'Download .html',
      desc: 'Save as standalone HTML file',
      icon: Download,
      action: handleDownloadHTML,
      accent: false,
    },
    {
      id: 'download-png',
      label: 'Download .png',
      desc: 'High-res 2x retina PNG',
      icon: Image,
      action: handleDownloadPNG,
      accent: false,
    },
  ];

  return (
    <div className="space-y-3 animate-slide-up">
      <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Export Options</p>

      {actions.map(({ id, label, desc, icon: Icon, action, accent }) => {
        const isLoading = loadingId === id || (id === 'download-png' && downloading);
        const isDone = loadingId === id && id !== 'download-png';
        return (
          <button
            key={id}
            onClick={action}
            disabled={isLoading}
            className={`w-full flex items-center gap-3 p-3.5 rounded-xl border transition-all text-left group ${
              accent
                ? 'border-accent/30 bg-accent/5 hover:bg-accent/10 hover:border-accent/50'
                : 'border-border bg-surface/50 hover:bg-surface hover:border-border-light'
            } ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            <div className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
              accent ? 'bg-accent text-white' : 'bg-card text-text-secondary group-hover:text-text-primary'
            }`}>
              {isDone
                ? <Check size={16} className="text-success" />
                : <Icon size={16} />
              }
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${accent ? 'text-accent' : 'text-text-primary'}`}>{label}</p>
              <p className="text-xs text-text-muted mt-0.5">{desc}</p>
            </div>
            {isLoading && (
              <div className="w-4 h-4 border-2 border-text-muted border-t-accent rounded-full animate-spin" />
            )}
          </button>
        );
      })}

      {/* HTML preview */}
      <div className="section-card mt-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider">HTML Preview</p>
          <button
            onClick={() => handleCopy('preview', html, 'HTML')}
            className="text-xs text-accent hover:text-accent-glow transition-colors"
          >
            Copy all
          </button>
        </div>
        <div className="bg-base rounded-lg p-3 overflow-x-auto max-h-40 border border-border">
          <code className="text-[10px] text-text-muted font-mono break-all whitespace-pre-wrap leading-relaxed">
            {html.slice(0, 600)}...
          </code>
        </div>
      </div>

      {/* Tips */}
      <div className="section-card bg-accent/5 border-accent/20">
        <p className="text-xs font-semibold text-accent mb-2">💡 How to add to Gmail</p>
        <ol className="text-xs text-text-muted space-y-1 list-decimal list-inside leading-relaxed">
          <li>Click "Copy as HTML" above</li>
          <li>Open Gmail → Settings → See all settings</li>
          <li>Scroll to "Signature" and click in the text box</li>
          <li>Press Ctrl+Shift+V to paste as rich text</li>
        </ol>
      </div>
    </div>
  );
}
