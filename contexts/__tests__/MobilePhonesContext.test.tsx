import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { MobilePhonesProvider, useMobilePhones } from '../MobilePhonesContext';
import { mockMobilePhones } from '@/test-utils/mock-data';

describe('MobilePhonesContext', () => {
  it('deduplicates initialData by ID', () => {
    const duplicates = [...mockMobilePhones, mockMobilePhones[0]];

    const { result } = renderHook(() => useMobilePhones(), {
      wrapper: ({ children }) => (
        <MobilePhonesProvider
          initialData={duplicates}
          currentPage={1}
          itemsPerPage={20}
        >
          {children}
        </MobilePhonesProvider>
      ),
    });

    expect(result.current.mobilePhones).toHaveLength(3);
  });

  it('exposes correct values', () => {
    const { result } = renderHook(() => useMobilePhones(), {
      wrapper: ({ children }) => (
        <MobilePhonesProvider
          initialData={mockMobilePhones}
          error="Test error"
          currentPage={2}
          itemsPerPage={10}
        >
          {children}
        </MobilePhonesProvider>
      ),
    });

    expect(result.current.mobilePhones).toEqual(mockMobilePhones);
    expect(result.current.error).toBe('Test error');
    expect(result.current.currentPage).toBe(2);
    expect(result.current.itemsPerPage).toBe(10);
  });

  it('throws error when used outside provider', () => {
    expect(() => {
      renderHook(() => useMobilePhones());
    }).toThrow('useMobilePhones must be used within a MobilePhonesProvider');
  });
});
