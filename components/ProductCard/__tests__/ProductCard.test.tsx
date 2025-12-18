import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductCard } from '../ProductCard';

describe('ProductCard', () => {
  const props = {
    id: '1',
    brand: 'Apple',
    name: 'iPhone 15 Pro',
    price: 999,
    imageUrl: 'https://example.com/iphone.jpg',
  };

  it('renders product information', () => {
    render(<ProductCard {...props} />);

    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('iPhone 15 Pro')).toBeInTheDocument();
    expect(screen.getByText('999 EUR')).toBeInTheDocument();
  });

  it('renders image with correct alt text', () => {
    render(<ProductCard {...props} />);

    const image = screen.getByAltText('Apple iPhone 15 Pro');
    expect(image).toBeInTheDocument();
  });

  it('links to product detail page', () => {
    render(<ProductCard {...props} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/phone/1');
  });
});
