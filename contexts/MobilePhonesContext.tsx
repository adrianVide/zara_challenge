'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { MobilePhone } from '@/types/mobile';

interface MobilePhonesContextValue {
  mobilePhones: MobilePhone[];
  error: string | null;
  currentPage: number;
  itemsPerPage: number;
}

const MobilePhonesContext = createContext<MobilePhonesContextValue | undefined>(
  undefined
);

interface MobilePhonesProviderProps {
  children: ReactNode;
  initialData: MobilePhone[];
  error?: string | null;
  currentPage: number;
  itemsPerPage: number;
}

export function MobilePhonesProvider({
  children,
  initialData,
  error = null,
  currentPage,
  itemsPerPage,
}: MobilePhonesProviderProps) {
  const [allPhones, setAllPhones] = useState<MobilePhone[]>(initialData);

  useEffect(() => {
    setAllPhones((prevPhones) => {
      const existingIds = new Set(prevPhones.map(phone => phone.id));
      const newPhones = initialData.filter(phone => !existingIds.has(phone.id));

      if (newPhones.length > 0) {
        return [...prevPhones, ...newPhones];
      }

      return prevPhones;
    });
  }, [initialData]);

  const value: MobilePhonesContextValue = {
    mobilePhones: allPhones,
    error,
    currentPage,
    itemsPerPage,
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
