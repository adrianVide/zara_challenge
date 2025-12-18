import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { LoadingProvider, useLoading } from '../LoadingContext';

describe('LoadingContext', () => {
  it('initializes with isLoading: false', () => {
    const { result } = renderHook(() => useLoading(), {
      wrapper: LoadingProvider,
    });

    expect(result.current.isLoading).toBe(false);
  });

  it('updates loading state', () => {
    const { result } = renderHook(() => useLoading(), {
      wrapper: LoadingProvider,
    });

    act(() => {
      result.current.setIsLoading(true);
    });

    expect(result.current.isLoading).toBe(true);

    act(() => {
      result.current.setIsLoading(false);
    });

    expect(result.current.isLoading).toBe(false);
  });

  it('throws error when used outside provider', () => {
    expect(() => {
      renderHook(() => useLoading());
    }).toThrow('useLoading must be used within a LoadingProvider');
  });
});
