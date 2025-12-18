import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from '../SearchBar';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  createMockRouter,
  createMockSearchParams,
} from '@/test-utils/navigation-mocks';

vi.mock('next/navigation');

describe('SearchBar', () => {
  beforeEach(() => {
    const mockRouter = createMockRouter();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.mocked(useRouter).mockReturnValue(mockRouter as any);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.mocked(useSearchParams).mockReturnValue(createMockSearchParams() as any);
  });

  it('renders search input', () => {
    render(<SearchBar />);

    const input = screen.getByRole('searchbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Search for a smartphone...');
  });

  it('updates input value on change', () => {
    render(<SearchBar />);

    const input = screen.getByRole('searchbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'iPhone' } });

    expect(input.value).toBe('iPhone');
  });
});
