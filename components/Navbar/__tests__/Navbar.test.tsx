import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { Navbar } from '../Navbar';
import { renderWithProviders } from '@/test-utils/test-helpers';

describe('Navbar', () => {
  it('renders logo and cart link', () => {
    renderWithProviders(<Navbar />);

    const homeLink = screen.getByLabelText('MBST Home');
    expect(homeLink).toHaveAttribute('href', '/');

    const cartLink = screen.getByLabelText(/shopping cart/i);
    expect(cartLink).toHaveAttribute('href', '/cart');
  });

  it('displays cart item count', () => {
    renderWithProviders(<Navbar />);

    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
