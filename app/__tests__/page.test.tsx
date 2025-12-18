import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '../page';
import { getMobilePhones } from '@/lib/api/mobile-api';
import { mockMobilePhones } from '@/test-utils/mock-data';

vi.mock('@/lib/api/mobile-api', () => ({
  getMobilePhones: vi.fn(),
}));

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
  });

  it('renders successfully with phones data', async () => {
    vi.mocked(getMobilePhones).mockResolvedValue(mockMobilePhones);

    const searchParams = Promise.resolve({});
    const component = await Home({ searchParams });
    render(component);

    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-phones-list')).toBeInTheDocument();
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  it('handles pagination correctly', async () => {
    vi.mocked(getMobilePhones).mockResolvedValue(mockMobilePhones);

    const searchParams = Promise.resolve({ page: '2' });
    const component = await Home({ searchParams });
    render(component);

    expect(screen.getByText('Page 2')).toBeInTheDocument();
    expect(getMobilePhones).toHaveBeenCalledWith(
      expect.objectContaining({
        offset: 20, // (page 2 - 1) * 20
      })
    );
  });

  it('handles search query', async () => {
    vi.mocked(getMobilePhones).mockResolvedValue(mockMobilePhones);

    const searchParams = Promise.resolve({ search: 'iPhone' });
    const component = await Home({ searchParams });
    render(component);

    expect(getMobilePhones).toHaveBeenCalledWith(
      expect.objectContaining({
        search: 'iPhone',
      })
    );
  });

  it('handles API errors gracefully', async () => {
    const errorMessage = 'API Error';
    vi.mocked(getMobilePhones).mockRejectedValue(new Error(errorMessage));

    const searchParams = Promise.resolve({});
    const component = await Home({ searchParams });
    render(component);

    // Should still render the layout even with error
    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-phones-list')).toBeInTheDocument();
  });

  it('fetches unique phones with correct parameters', async () => {
    vi.mocked(getMobilePhones).mockResolvedValue(mockMobilePhones);

    const searchParams = Promise.resolve({ page: '1', search: 'Samsung' });
    const component = await Home({ searchParams });
    render(component);

    expect(getMobilePhones).toHaveBeenCalledWith({
      limit: 20,
      offset: 0,
      search: 'Samsung',
    });
  });

  it('handles empty search params', async () => {
    vi.mocked(getMobilePhones).mockResolvedValue([]);

    const searchParams = Promise.resolve({});
    const component = await Home({ searchParams });
    render(component);

    expect(getMobilePhones).toHaveBeenCalledWith({
      limit: 20,
      offset: 0,
      search: '',
    });
    expect(screen.getByTestId('mobile-phones-list')).toBeInTheDocument();
  });
});
