import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { MobilePhonesList } from '../MobilePhonesList';
import { renderWithMobilePhonesProvider } from '@/test-utils/test-helpers';
import { mockMobilePhones } from '@/test-utils/mock-data';

describe('MobilePhonesList', () => {
  it('displays error message when error exists', () => {
    renderWithMobilePhonesProvider(<MobilePhonesList />, {
      initialData: [],
      error: 'Failed to load phones',
    });

    expect(screen.getByText(/error/i)).toBeInTheDocument();
    expect(screen.getByText(/failed to load phones/i)).toBeInTheDocument();
  });

  it('displays empty state when no phones', () => {
    renderWithMobilePhonesProvider(<MobilePhonesList />, {
      initialData: [],
    });

    expect(screen.getByText('No phones found')).toBeInTheDocument();
  });

  it('displays phones list with result count', () => {
    renderWithMobilePhonesProvider(<MobilePhonesList />, {
      initialData: mockMobilePhones,
    });

    expect(screen.getByText('3 RESULTS')).toBeInTheDocument();
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Samsung')).toBeInTheDocument();
  });

  it('paginates phones correctly', () => {
    renderWithMobilePhonesProvider(<MobilePhonesList />, {
      initialData: mockMobilePhones,
      currentPage: 1,
      itemsPerPage: 2,
    });

    expect(screen.getByText('2 RESULTS')).toBeInTheDocument();
  });
});
