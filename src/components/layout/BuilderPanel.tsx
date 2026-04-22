'use client';
import { useSignatureStore } from '@/lib/store';
import ProfileForm from '@/components/builder/ProfileForm';
import BrandingControls from '@/components/builder/BrandingControls';
import TypographyControls from '@/components/builder/TypographyControls';
import SocialLinksForm from '@/components/builder/SocialLinksForm';
import TemplateGallery from '@/components/builder/TemplateGallery';
import AdvancedControls from '@/components/builder/AdvancedControls';
import ExportPanel from '@/components/export/ExportPanel';
import clsx from 'clsx';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TABS = [
  { id: 'profile',    label: 'Profile',   icon: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path d="M10 9a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.25 1.25 0 00.41 1.352C4.945 16.812 7.326 18 10 18s5.056-1.188 6.126-2.155a1.25 1.25 0 00.41-1.352C15.672 12.293 13.01 11 10 11s-5.672 1.293-6.535 3.493z"/>
    </svg>
  )},
  { id: 'template',   label: 'Template',  icon: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path fillRule="evenodd" d="M4.25 2A2.25 2.25 0 002 4.25v2.5A2.25 2.25 0 004.25 9h2.5A2.25 2.25 0 009 6.75v-2.5A2.25 2.25 0 006.75 2h-2.5zm0 9A2.25 2.25 0 002 13.25v2.5A2.25 2.25 0 004.25 18h2.5A2.25 2.25 0 009 15.75v-2.5A2.25 2.25 0 006.75 11h-2.5zm6.5-9A2.25 2.25 0 0010 2.25v2.5A2.25 2.25 0 0012.25 7h2.5A2.25 2.25 0 0017 4.75v-2.5A2.25 2.25 0 0014.75 2h-2.5zm.5 9a2.75 2.75 0 100 5.5 2.75 2.75 0 000-5.5z" clipRule="evenodd"/>
    </svg>
  )},
  { id: 'branding',   label: 'Colors',    icon: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path fillRule="evenodd" d="M3.75 3a.75.75 0 00-.75.75v.5c0 .414.336.75.75.75H4c6.075 0 11 4.925 11 11v.25c0 .414.336.75.75.75h.5a.75.75 0 00.75-.75V16C17 8.82 11.18 3 4 3h-.25zM4 7a.75.75 0 00-.75.75v.5c0 .414.336.75.75.75h.25a7 7 0 017 7v.25c0 .414.336.75.75.75h.5a.75.75 0 00.75-.75V16A8.5 8.5 0 004.5 7.5H4A.75.75 0 003.25 8v-.25A.75.75 0 004 7zm-.75 5.75A.75.75 0 014 12h.25a3.5 3.5 0 013.5 3.5V16a.75.75 0 01-.75.75h-.5A.75.75 0 016 16v-.25A1.75 1.75 0 004.25 14H4a.75.75 0 01-.75-.75v-.5z" clipRule="evenodd"/>
    </svg>
  )},
  { id: 'typography', label: 'Font',      icon: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path d="M3 4a1 1 0 011-1h12a1 1 0 010 2H4a1 1 0 01-1-1zM3 8a1 1 0 011-1h12a1 1 0 010 2H4a1 1 0 01-1-1zM3 12a1 1 0 011-1h6a1 1 0 010 2H4a1 1 0 01-1-1z"/>
    </svg>
  )},
  { id: 'social',     label: 'Social',    icon: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
    </svg>
  )},
  { id: 'advanced',   label: 'Advanced',  icon: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
    </svg>
  )},
  { id: 'export',     label: 'Export',    icon: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/>
    </svg>
  )},
];

export default function BuilderPanel() {
  const { activeTab, setActiveTab } = useSignatureStore();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={clsx(
      'flex flex-shrink-0 h-full transition-all duration-300 ease-in-out',
      collapsed ? 'w-[52px]' : 'w-[360px]'
    )}>
      {/* Vertical icon sidebar */}
      <div className="w-[52px] flex-shrink-0 flex flex-col items-center py-3 gap-1 bg-base border-r border-border">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); if (collapsed) setCollapsed(false); }}
            title={tab.label}
            className={clsx(
              'relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-150 group',
              activeTab === tab.id && !collapsed
                ? 'bg-accent text-white shadow-glow'
                : 'text-text-muted hover:text-text-secondary hover:bg-surface'
            )}
          >
            {tab.icon}
            {/* Tooltip */}
            <span className="absolute left-full ml-2 px-2 py-1 text-xs font-medium bg-card border border-border rounded-lg text-text-primary whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-card">
              {tab.label}
            </span>
            {/* Active dot indicator when collapsed */}
            {activeTab === tab.id && collapsed && (
              <span className="absolute right-0.5 top-0.5 w-1.5 h-1.5 rounded-full bg-accent" />
            )}
          </button>
        ))}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? 'Expand panel' : 'Collapse panel'}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-text-muted hover:text-text-secondary hover:bg-surface transition-all duration-150 mb-1"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Slide-in content panel */}
      {!collapsed && (
        <div className="flex flex-col flex-1 min-w-0 bg-panel border-r border-border noise-panel overflow-hidden">
          {/* Section header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-text-muted">{TABS.find(t => t.id === activeTab)?.icon}</span>
              <h2 className="text-sm font-semibold text-text-primary">
                {TABS.find(t => t.id === activeTab)?.label}
              </h2>
            </div>
            {activeTab === 'export' && (
              <span className="badge-gradient">Ready</span>
            )}
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === 'profile'    && <ProfileForm />}
            {activeTab === 'template'   && <TemplateGallery />}
            {activeTab === 'branding'   && <BrandingControls />}
            {activeTab === 'typography' && <TypographyControls />}
            {activeTab === 'social'     && <SocialLinksForm />}
            {activeTab === 'advanced'   && <AdvancedControls />}
            {activeTab === 'export'     && <ExportPanel />}
          </div>
        </div>
      )}
    </div>
  );
}
