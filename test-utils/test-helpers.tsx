import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { CartProvider } from '@/contexts/CartContext';
import { LoadingProvider } from '@/contexts/LoadingContext';
import { MobilePhonesProvider } from '@/contexts/MobilePhonesContext';
import type { MobilePhone } from '@/types/mobile';

interface AllProvidersProps {
  children: React.ReactNode;
}

export function AllProviders({ children }: AllProvidersProps) {
  return (
    <LoadingProvider>
      <CartProvider>{children}</CartProvider>
    </LoadingProvider>
  );
}

interface MobilePhonesProviderWrapperProps {
  children: React.ReactNode;
  initialData?: MobilePhone[];
  error?: string | null;
  currentPage?: number;
  itemsPerPage?: number;
  searchQuery?: string;
}

export function MobilePhonesProviderWrapper({
  children,
  initialData = [],
  error = null,
  currentPage = 1,
  itemsPerPage = 20,
  searchQuery = '',
}: MobilePhonesProviderWrapperProps) {
  return (
    <MobilePhonesProvider
      initialData={initialData}
      error={error}
      currentPage={currentPage}
      itemsPerPage={itemsPerPage}
      searchQuery={searchQuery}
    >
      {children}
    </MobilePhonesProvider>
  );
}

export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { wrapper: AllProviders, ...options });
}

export function renderWithMobilePhonesProvider(
  ui: ReactElement,
  providerProps?: Omit<MobilePhonesProviderWrapperProps, 'children'>,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <AllProviders>
      <MobilePhonesProviderWrapper {...providerProps}>
        {children}
      </MobilePhonesProviderWrapper>
    </AllProviders>
  );

  return render(ui, { wrapper: Wrapper, ...options });
}
