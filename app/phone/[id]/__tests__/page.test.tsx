import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PhoneDetail from '../page';
import { getMobilePhoneById } from '@/lib/api/mobile-api';
import { mockProductDetail } from '@/test-utils/mock-data';

// Mock API
vi.mock('@/lib/api/mobile-api', () => ({
  getMobilePhoneById: vi.fn(),
}));

// Mock child components
vi.mock('@/components/PhoneDetail/BackButton/BackButton', () => ({
  BackButton: () => <button>Back</button>,
}));

vi.mock('@/components/PhoneDetail/ProductImage/ProductImage', () => ({
  ProductImage: ({ brand, name }: { brand: string; name: string }) => (
    <div data-testid="product-image">
      {brand} {name}
    </div>
  ),
}));

vi.mock('@/components/PhoneDetail/StorageSelector/StorageSelector', () => ({
  StorageSelector: ({
    onSelect,
    storageOptions,
    selectedIndex,
  }: {
    onSelect: (index: number) => void;
    storageOptions: Array<{ capacity: string }>;
    selectedIndex: number | null;
  }) => (
    <div data-testid="storage-selector">
      {storageOptions.map((option, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          data-selected={selectedIndex === index}
        >
          {option.capacity}
        </button>
      ))}
    </div>
  ),
}));

vi.mock('@/components/PhoneDetail/ColorSelector/ColorSelector', () => ({
  ColorSelector: ({
    onSelect,
    colorOptions,
    selectedIndex,
  }: {
    onSelect: (index: number) => void;
    colorOptions: Array<{ name: string }>;
    selectedIndex: number | null;
  }) => (
    <div data-testid="color-selector">
      {colorOptions.map((option, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          data-selected={selectedIndex === index}
        >
          {option.name}
        </button>
      ))}
    </div>
  ),
}));

vi.mock('@/components/PhoneDetail/Specifications/Specifications', () => ({
  Specifications: () => <div data-testid="specifications">Specs</div>,
}));

vi.mock('@/components/PhoneDetail/SimilarItems/SimilarItems', () => ({
  SimilarItems: () => <div data-testid="similar-items">Similar Items</div>,
}));

// Mock contexts
const mockSetIsLoading = vi.fn();
const mockAddItem = vi.fn();
const mockPush = vi.fn();
const mockReplace = vi.fn();

vi.mock('@/contexts/LoadingContext', () => ({
  useLoading: () => ({
    setIsLoading: mockSetIsLoading,
  }),
}));

vi.mock('@/contexts/CartContext', () => ({
  useCart: () => ({
    addItem: mockAddItem,
  }),
}));

// Mock navigation
vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');
  return {
    ...actual,
    useParams: () => ({ id: '1' }),
    useRouter: () => ({
      push: mockPush,
      replace: mockReplace,
    }),
    useSearchParams: () => ({
      get: vi.fn(() => null),
    }),
  };
});

describe('Phone Detail Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches and displays phone details', async () => {
    vi.mocked(getMobilePhoneById).mockResolvedValue(mockProductDetail);

    render(<PhoneDetail />);

    await waitFor(() => {
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent(mockProductDetail.brand);
      expect(heading).toHaveTextContent(mockProductDetail.name);
    });

    expect(mockSetIsLoading).toHaveBeenCalledWith(true);
    expect(mockSetIsLoading).toHaveBeenCalledWith(false);
    expect(getMobilePhoneById).toHaveBeenCalledWith('1');
  });

  it('displays error state when API fails', async () => {
    const errorMessage = 'Failed to load phone';
    vi.mocked(getMobilePhoneById).mockRejectedValue(new Error(errorMessage));

    render(<PhoneDetail />);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText(/Error:/)).toBeInTheDocument();
    });

    expect(screen.getByText('Go back to home')).toBeInTheDocument();
  });

  it('displays price correctly without selection', async () => {
    vi.mocked(getMobilePhoneById).mockResolvedValue(mockProductDetail);

    render(<PhoneDetail />);

    await waitFor(() => {
      expect(screen.getByText(/From/)).toBeInTheDocument();
      expect(screen.getByText(/EUR/)).toBeInTheDocument();
    });
  });

  it('updates price when storage is selected', async () => {
    const user = userEvent.setup();
    vi.mocked(getMobilePhoneById).mockResolvedValue(mockProductDetail);

    render(<PhoneDetail />);

    await waitFor(() => {
      expect(screen.getByTestId('storage-selector')).toBeInTheDocument();
    });

    // Initially shows "From X EUR"
    const fromText = screen.getByText(/From/);
    expect(fromText).toBeInTheDocument();

    const storageButton = screen.getByText(
      mockProductDetail.storageOptions[0].capacity
    );
    await user.click(storageButton);

    // After selection, price updates (the paragraph element gets updated)
    await waitFor(() => {
      const priceElement = screen.getByLabelText(/Price:/);
      expect(priceElement.textContent).toContain('EUR');
    });
  });

  it('renders all product sections', async () => {
    vi.mocked(getMobilePhoneById).mockResolvedValue(mockProductDetail);

    render(<PhoneDetail />);

    await waitFor(() => {
      expect(screen.getByTestId('product-image')).toBeInTheDocument();
      expect(screen.getByTestId('storage-selector')).toBeInTheDocument();
      expect(screen.getByTestId('color-selector')).toBeInTheDocument();
      expect(screen.getByTestId('specifications')).toBeInTheDocument();
      expect(screen.getByTestId('similar-items')).toBeInTheDocument();
    });
  });

  it('disables add to cart button when options not selected', async () => {
    vi.mocked(getMobilePhoneById).mockResolvedValue(mockProductDetail);

    render(<PhoneDetail />);

    await waitFor(() => {
      const addButton = screen.getByText('ADD TO CART');
      expect(addButton).toBeDisabled();
    });
  });

  it('renders color and storage selectors', async () => {
    vi.mocked(getMobilePhoneById).mockResolvedValue(mockProductDetail);

    render(<PhoneDetail />);

    await waitFor(() => {
      expect(screen.getByTestId('storage-selector')).toBeInTheDocument();
      expect(screen.getByTestId('color-selector')).toBeInTheDocument();
    });

    mockProductDetail.storageOptions.forEach((option) => {
      expect(screen.getByText(option.capacity)).toBeInTheDocument();
    });

    mockProductDetail.colorOptions.forEach((option) => {
      expect(screen.getByText(option.name)).toBeInTheDocument();
    });
  });

  it('renders add to cart button', async () => {
    vi.mocked(getMobilePhoneById).mockResolvedValue(mockProductDetail);

    render(<PhoneDetail />);

    await waitFor(() => {
      const addButton = screen.getByText('ADD TO CART');
      expect(addButton).toBeInTheDocument();
      expect(addButton).toHaveAttribute('type', 'button');
    });
  });

  it('updates URL when color is selected', async () => {
    const user = userEvent.setup();
    vi.mocked(getMobilePhoneById).mockResolvedValue(mockProductDetail);

    render(<PhoneDetail />);

    await waitFor(() => {
      expect(screen.getByTestId('color-selector')).toBeInTheDocument();
    });

    const colorButton = screen.getByText(
      mockProductDetail.colorOptions[0].name
    );
    await user.click(colorButton);

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith(
        expect.stringContaining('color=0'),
        { scroll: false }
      );
    });
  });

  it('updates URL when storage is selected', async () => {
    const user = userEvent.setup();
    vi.mocked(getMobilePhoneById).mockResolvedValue(mockProductDetail);

    render(<PhoneDetail />);

    await waitFor(() => {
      expect(screen.getByTestId('storage-selector')).toBeInTheDocument();
    });

    const storageButton = screen.getByText(
      mockProductDetail.storageOptions[0].capacity
    );
    await user.click(storageButton);

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith(
        expect.stringContaining('storage=0'),
        { scroll: false }
      );
    });
  });

  it('renders back button', async () => {
    vi.mocked(getMobilePhoneById).mockResolvedValue(mockProductDetail);

    render(<PhoneDetail />);

    await waitFor(() => {
      expect(screen.getByText('Back')).toBeInTheDocument();
    });
  });
});
