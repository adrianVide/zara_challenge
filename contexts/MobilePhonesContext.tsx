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
  const [allPhones, setAllPhones] = useState<MobilePhone[]>(initialData);
  const [prevInitialData, setPrevInitialData] = useState(initialData);
  const [prevSearchQuery, setPrevSearchQuery] = useState(searchQuery);

  if (searchQuery !== prevSearchQuery) {
    setPrevSearchQuery(searchQuery);
    setPrevInitialData(initialData);
    setAllPhones(initialData);
  } else if (initialData !== prevInitialData) {
    setPrevInitialData(initialData);

    const existingIds = new Set(allPhones.map((phone) => phone.id));
    const newPhones = initialData.filter((phone) => !existingIds.has(phone.id));

    if (newPhones.length > 0) {
      setAllPhones([...allPhones, ...newPhones]);
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
