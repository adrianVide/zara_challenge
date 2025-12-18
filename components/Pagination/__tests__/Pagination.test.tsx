import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderWithMobilePhonesProvider } from '@/test-utils/test-helpers';
import { Pagination } from '../Pagination';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  createMockRouter,
  createMockSearchParams,
} from '@/test-utils/navigation-mocks';
import { mockMobilePhones } from '@/test-utils/mock-data';
import { screen } from '@testing-library/react';

vi.mock('next/navigation');

describe('Pagination', () => {
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.mocked(useRouter).mockReturnValue(createMockRouter() as any);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.mocked(useSearchParams).mockReturnValue(createMockSearchParams() as any);
  });

  it('displays current page number', () => {
    renderWithMobilePhonesProvider(
      <Pagination currentPage={2} itemsPerPage={20} />,
      { initialData: mockMobilePhones }
    );

    expect(screen.getByText('PAGE 2')).toBeInTheDocument();
  });

  it('disables previous button on page 1', () => {
    renderWithMobilePhonesProvider(
      <Pagination currentPage={1} itemsPerPage={20} />,
      { initialData: mockMobilePhones }
    );

    const prevButton = screen.getByText('PREVIOUS');
    expect(prevButton).toBeDisabled();
  });
});
