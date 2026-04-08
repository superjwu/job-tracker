'use client';

import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

let toastId = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const toast = useCallback({
    success: (msg) => addToast(msg, 'success'),
    error: (msg) => addToast(msg, 'error'),
    info: (msg) => addToast(msg, 'info'),
  }, [addToast]);

  // Make toast callable and have methods
  const toastFn = Object.assign(
    (msg, type) => addToast(msg, type),
    toast
  );

  return (
    <ToastContext.Provider value={toastFn}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2.5 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto px-5 py-3 rounded-xl shadow-2xl text-sm font-semibold animate-slide-in backdrop-blur-sm flex items-center gap-2
              ${t.type === 'success' ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-green-200' : ''}
              ${t.type === 'error' ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-red-200' : ''}
              ${t.type === 'info' ? 'bg-gradient-to-r from-gray-700 to-gray-800 text-white' : ''}
            `}
          >
            {t.type === 'success' && <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>}
            {t.type === 'error' && <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>}
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
