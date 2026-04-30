/**
 * ToastProvider — imperative toast system with queue.
 * Wrap your app, then call toast.show() from anywhere via useToast().
 *
 * Usage:
 *   <ToastProvider><App /></ToastProvider>
 *   const toast = useToast();
 *   toast.show({ message: 'Saved', variant: 'success' });
 */
import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { Toast } from './Toast';
import { dur } from './tokens';

type Variant = 'info' | 'success' | 'warn' | 'danger';

interface ToastOptions {
  message: string;
  variant?: Variant;
  duration?: number;
}

interface ToastApi {
  show: (options: ToastOptions) => void;
}

const ToastContext = createContext<ToastApi>({ show: () => {} });

export function useToast(): ToastApi {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState<ToastOptions | null>(null);
  const [visible, setVisible] = useState(false);
  const queue = useRef<ToastOptions[]>([]);

  const showNext = useCallback(() => {
    if (queue.current.length > 0) {
      const next = queue.current.shift()!;
      setCurrent(next);
      setVisible(true);
    }
  }, []);

  const show = useCallback((options: ToastOptions) => {
    if (visible) {
      queue.current.push(options);
    } else {
      setCurrent(options);
      setVisible(true);
    }
  }, [visible]);

  const handleDismiss = useCallback(() => {
    setVisible(false);
    setCurrent(null);
    // Show next in queue after a short delay
    setTimeout(showNext, dur[1]);
  }, [showNext]);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      {current && (
        <Toast
          message={current.message}
          variant={current.variant}
          duration={current.duration}
          visible={visible}
          onDismiss={handleDismiss}
        />
      )}
    </ToastContext.Provider>
  );
}
