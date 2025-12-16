'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { MobilePhone } from '@/types/mobile';

interface MobilePhonesContextValue {
  mobilePhones: MobilePhone[];
  error: string | null;
}

const MobilePhonesContext = createContext<MobilePhonesContextValue | undefined>(
  undefined
);

interface MobilePhonesProviderProps {
  children: ReactNode;
  initialData: MobilePhone[];
  error?: string | null;
}

export function MobilePhonesProvider({
  children,
  initialData,
  error = null,
}: MobilePhonesProviderProps) {
  const value: MobilePhonesContextValue = {
    mobilePhones: initialData,
    error,
  };

  return (
    <MobilePhonesContext.Provider value={value}>
      {children}
    </MobilePhonesContext.Provider>
  );
}

export function useMobilePhones(): MobilePhonesContextValue {
  const context = useContext(MobilePhonesContext);

  if (context === undefined) {
    throw new Error(
      'useMobilePhones must be used within a MobilePhonesProvider'
    );
  }

  return context;
}
