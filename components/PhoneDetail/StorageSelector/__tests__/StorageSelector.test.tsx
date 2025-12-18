import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StorageSelector } from '../StorageSelector';
import { mockStorageOptions } from '@/test-utils/mock-data';

describe('StorageSelector', () => {
  const mockOnSelect = vi.fn();

  it('returns null when no storage options provided', () => {
    const { container } = render(
      <StorageSelector
        storageOptions={[]}
        selectedIndex={null}
        onSelect={mockOnSelect}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it('renders all storage options', () => {
    render(
      <StorageSelector
        storageOptions={mockStorageOptions}
        selectedIndex={null}
        onSelect={mockOnSelect}
      />
    );

    expect(screen.getByText('128GB')).toBeInTheDocument();
    expect(screen.getByText('256GB')).toBeInTheDocument();
    expect(screen.getByText('512GB')).toBeInTheDocument();
  });

  it('calls onSelect when storage is clicked', async () => {
    const user = userEvent.setup();
    render(
      <StorageSelector
        storageOptions={mockStorageOptions}
        selectedIndex={null}
        onSelect={mockOnSelect}
      />
    );

    const button = screen.getByLabelText(/256gb/i);
    await user.click(button);

    expect(mockOnSelect).toHaveBeenCalledWith(1);
  });
});
