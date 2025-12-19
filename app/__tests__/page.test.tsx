import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '../page';
import { mockMobilePhones } from '@/test-utils/mock-data';

const mockFetch = vi.fn();

vi.mock('@/components/MobilePhonesList/MobilePhonesList', () => ({
  MobilePhonesList: () => (
    <div data-testid="mobile-phones-list">Phones List</div>
  ),
}));

vi.mock('@/components/Pagination/Pagination', () => ({
  Pagination: ({ currentPage }: { currentPage: number }) => (
    <div data-testid="pagination">Page {currentPage}</div>
  ),
}));

vi.mock('@/components/SearchBar/SearchBar', () => ({
  SearchBar: () => <div data-testid="search-bar">Search Bar</div>,
}));

describe('Home Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockMobilePhones,
    } as Response);
    global.fetch = mockFetch;
  });

  it('renders successfully with phones data', async () => {
    const searchParams = Promise.resolve({});
    const component = await Home({ searchParams });
    render(component);

    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-phones-list')).toBeInTheDocument();
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  it('handles pagination correctly', async () => {
    const searchParams = Promise.resolve({ page: '2' });
    const component = await Home({ searchParams });
    render(component);

    expect(screen.getByText('Page 2')).toBeInTheDocument();
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('offset=20'),
      expect.any(Object)
    );
  });

  it('handles search query', async () => {
    const searchParams = Promise.resolve({ search: 'iPhone' });
    const component = await Home({ searchParams });
    render(component);

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('search=iPhone'),
      expect.any(Object)
    );
  });

  it('handles API errors gracefully', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      statusText: 'API Error',
    } as Response);

    const searchParams = Promise.resolve({});
    const component = await Home({ searchParams });
    render(component);

    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-phones-list')).toBeInTheDocument();
  });

  it('fetches unique phones with correct parameters', async () => {
    const searchParams = Promise.resolve({ page: '1', search: 'Samsung' });
    const component = await Home({ searchParams });
    render(component);

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('limit=20'),
      expect.any(Object)
    );
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('offset=0'),
      expect.any(Object)
    );
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('search=Samsung'),
      expect.any(Object)
    );
  });

  it('handles empty search params', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => [],
    } as Response);

    const searchParams = Promise.resolve({});
    const component = await Home({ searchParams });
    render(component);

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('limit=20'),
      expect.any(Object)
    );
    expect(screen.getByTestId('mobile-phones-list')).toBeInTheDocument();
  });
});
