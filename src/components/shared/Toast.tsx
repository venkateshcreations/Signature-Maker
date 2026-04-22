'use client';
import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Check, X, AlertCircle, Info } from 'lucide-react';
import clsx from 'clsx';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue>({ toast: () => {} });

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).slice(2);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  }, []);

  const icons = { success: Check, error: AlertCircle, info: Info };
  const colors = {
    success: 'border-success/30 bg-success/10 text-success',
    error: 'border-error/30 bg-error/10 text-error',
    info: 'border-accent/30 bg-accent/10 text-accent',
  };
  const iconColors = { success: 'text-success', error: 'text-error', info: 'text-accent' };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Toast stack */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
        {toasts.map(t => {
          const Icon = icons[t.type];
          return (
            <div
              key={t.id}
              className={clsx(
                'flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-sm shadow-card animate-slide-up pointer-events-auto',
                'bg-card/95',
                colors[t.type]
              )}
            >
              <div className={clsx('flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full', iconColors[t.type])}>
                <Icon size={12} strokeWidth={2.5} />
              </div>
              <span className="text-sm font-medium text-text-primary">{t.message}</span>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
