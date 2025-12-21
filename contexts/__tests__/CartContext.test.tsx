import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '../CartContext';
import { mockCartItem, mockCartItems } from '@/test-utils/mock-data';

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts with empty cart', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      vi.runAllTimers();
    });

    expect(result.current.items).toEqual([]);
    expect(result.current.itemCount).toBe(0);
    expect(result.current.totalPrice).toBe(0);
    expect(result.current.isHydrated).toBe(true);
  });

  it('loads cart from localStorage', () => {
    localStorage.setItem('mobile-phones-cart', JSON.stringify([mockCartItem]));

    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      vi.runAllTimers();
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]).toEqual(mockCartItem);
    expect(result.current.isHydrated).toBe(true);
  });

  it('adds item to cart', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addItem(mockCartItem);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.totalPrice).toBe(mockCartItem.price);
  });

  it('removes item from cart', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addItem(mockCartItems[0]);
      result.current.addItem(mockCartItems[1]);
    });

    act(() => {
      result.current.removeItem(mockCartItems[0].id);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]).toEqual(mockCartItems[1]);
  });

  it('clears cart', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addItem(mockCartItem);
    });

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.items).toEqual([]);
    expect(result.current.totalPrice).toBe(0);
  });

  it('persists to localStorage', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      vi.runAllTimers();
    });

    act(() => {
      result.current.addItem(mockCartItem);
    });

    const stored = localStorage.getItem('mobile-phones-cart');
    expect(stored).toBeTruthy();
    expect(JSON.parse(stored!)).toEqual([mockCartItem]);
  });

  it('throws error when used outside provider', () => {
    expect(() => {
      renderHook(() => useCart());
    }).toThrow('useCart must be used within a CartProvider');
  });
});
