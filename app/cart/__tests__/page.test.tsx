import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CartPage from '../page';
import { mockCartItems } from '@/test-utils/mock-data';

const mockRemoveItem = vi.fn();
const mockUseCart = vi.fn();

vi.mock('@/contexts/CartContext', () => ({
  useCart: () => mockUseCart(),
}));

describe('Cart Page', () => {
  it('renders empty cart state', () => {
    mockUseCart.mockReturnValue({
      items: [],
      removeItem: mockRemoveItem,
      totalPrice: 0,
      itemCount: 0,
    });

    render(<CartPage />);

    expect(screen.getByText('CART (0)')).toBeInTheDocument();
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
    expect(screen.getByText('CONTINUE SHOPPING')).toBeInTheDocument();
  });

  it('renders cart items correctly', () => {
    mockUseCart.mockReturnValue({
      items: mockCartItems,
      removeItem: mockRemoveItem,
      totalPrice: mockCartItems.reduce((sum, item) => sum + item.price, 0),
      itemCount: mockCartItems.length,
    });

    render(<CartPage />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/CART/);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      mockCartItems.length.toString()
    );

    const firstItem = mockCartItems[0];
    expect(
      screen.getByText(`${firstItem.brand} ${firstItem.name}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${firstItem.storage} | ${firstItem.color}`)
    ).toBeInTheDocument();

    const priceElements = screen.getAllByText(/EUR/);
    expect(priceElements.length).toBeGreaterThan(0);
  });

  it('displays correct total price', () => {
    const totalPrice = 1500;
    mockUseCart.mockReturnValue({
      items: mockCartItems,
      removeItem: mockRemoveItem,
      totalPrice,
      itemCount: mockCartItems.length,
    });

    render(<CartPage />);

    expect(screen.getByText('TOTAL')).toBeInTheDocument();
    expect(screen.getByText(`${totalPrice} EUR`)).toBeInTheDocument();
  });

  it('calls removeItem when remove button is clicked', async () => {
    const user = userEvent.setup();
    mockUseCart.mockReturnValue({
      items: mockCartItems,
      removeItem: mockRemoveItem,
      totalPrice: 999,
      itemCount: mockCartItems.length,
    });

    render(<CartPage />);

    const removeButtons = screen.getAllByText('REMOVE');
    await user.click(removeButtons[0]);

    expect(mockRemoveItem).toHaveBeenCalledWith(mockCartItems[0].id);
  });

  it('renders all cart items', () => {
    mockUseCart.mockReturnValue({
      items: mockCartItems,
      removeItem: mockRemoveItem,
      totalPrice: 2000,
      itemCount: mockCartItems.length,
    });

    render(<CartPage />);

    const removeButtons = screen.getAllByText('REMOVE');
    expect(removeButtons).toHaveLength(mockCartItems.length);
  });

  it('renders continue shopping button in both states', () => {
    mockUseCart.mockReturnValue({
      items: [],
      removeItem: mockRemoveItem,
      totalPrice: 0,
      itemCount: 0,
    });

    const { rerender } = render(<CartPage />);
    expect(screen.getByText('CONTINUE SHOPPING')).toBeInTheDocument();

    mockUseCart.mockReturnValue({
      items: mockCartItems,
      removeItem: mockRemoveItem,
      totalPrice: 999,
      itemCount: mockCartItems.length,
    });

    rerender(<CartPage />);
    expect(screen.getByText('CONTINUE SHOPPING')).toBeInTheDocument();
  });

  it('renders pay button when cart has items', () => {
    mockUseCart.mockReturnValue({
      items: mockCartItems,
      removeItem: mockRemoveItem,
      totalPrice: 999,
      itemCount: mockCartItems.length,
    });

    render(<CartPage />);

    expect(screen.getByText('PAY')).toBeInTheDocument();
  });

  it('does not render pay button when cart is empty', () => {
    mockUseCart.mockReturnValue({
      items: [],
      removeItem: mockRemoveItem,
      totalPrice: 0,
      itemCount: 0,
    });

    render(<CartPage />);

    expect(screen.queryByText('PAY')).not.toBeInTheDocument();
  });

  it('renders item images with correct alt text', () => {
    mockUseCart.mockReturnValue({
      items: mockCartItems,
      removeItem: mockRemoveItem,
      totalPrice: 999,
      itemCount: mockCartItems.length,
    });

    render(<CartPage />);

    const firstItem = mockCartItems[0];
    const image = screen.getByAltText(`${firstItem.brand} ${firstItem.name}`);
    expect(image).toBeInTheDocument();
  });
});
