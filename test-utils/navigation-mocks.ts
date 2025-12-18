import { vi } from 'vitest';

export function createMockRouter(overrides = {}) {
  return {
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn(),
    ...overrides,
  };
}

export function createMockSearchParams(params: Record<string, string> = {}) {
  const searchParams = new URLSearchParams(params);
  return {
    get: vi.fn((key: string) => searchParams.get(key)),
    getAll: vi.fn((key: string) => searchParams.getAll(key)),
    has: vi.fn((key: string) => searchParams.has(key)),
    toString: vi.fn(() => searchParams.toString()),
    entries: vi.fn(() => searchParams.entries()),
    keys: vi.fn(() => searchParams.keys()),
    values: vi.fn(() => searchParams.values()),
    forEach: vi.fn((callback: (value: string, key: string) => void) =>
      searchParams.forEach(callback)
    ),
  };
}

export function createMockParams(params: Record<string, string> = {}) {
  return params;
}
