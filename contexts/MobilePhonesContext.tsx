"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { MobilePhone } from "@/types/mobile";

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
  searchQuery?: string;
}

export function MobilePhonesProvider({
  children,
  initialData,
  error = null,
  currentPage,
  itemsPerPage,
  searchQuery = '',
}: MobilePhonesProviderProps) {
  const deduplicatedInitialData = Array.from(
    new Map(initialData.map(phone => [phone.id, phone])).values()
  );

  const [allPhones, setAllPhones] = useState<MobilePhone[]>(deduplicatedInitialData);
  const [prevSearchQuery, setPrevSearchQuery] = useState(searchQuery);
  const [processedIds, setProcessedIds] = useState<Set<string>>(
    new Set(deduplicatedInitialData.map(p => p.id))
  );

  if (searchQuery !== prevSearchQuery) {
    setPrevSearchQuery(searchQuery);
    setAllPhones(deduplicatedInitialData);
    setProcessedIds(new Set(deduplicatedInitialData.map(p => p.id)));
  } else {
    const newPhones = initialData.filter((phone) => !processedIds.has(phone.id));

    if (newPhones.length > 0) {
      setAllPhones([...allPhones, ...newPhones]);
      setProcessedIds(prev => {
        const newSet = new Set(prev);
        newPhones.forEach(phone => newSet.add(phone.id));
        return newSet;
      });
    }
  }

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
      "useMobilePhones must be used within a MobilePhonesProvider"
    );
  }

  return context;
}
