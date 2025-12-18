import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ColorSelector } from '../ColorSelector';
import { mockColorOptions } from '@/test-utils/mock-data';

describe('ColorSelector', () => {
  const mockOnSelect = vi.fn();

  it('returns null when no colors provided', () => {
    const { container } = render(
      <ColorSelector
        colorOptions={[]}
        selectedIndex={null}
        onSelect={mockOnSelect}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it('renders all color options', () => {
    render(
      <ColorSelector
        colorOptions={mockColorOptions}
        selectedIndex={null}
        onSelect={mockOnSelect}
      />
    );

    expect(screen.getByLabelText(/midnight black/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/silver/i)).toBeInTheDocument();
  });

  it('shows selected color name', () => {
    render(
      <ColorSelector
        colorOptions={mockColorOptions}
        selectedIndex={0}
        onSelect={mockOnSelect}
      />
    );

    expect(screen.getByText('Midnight Black')).toBeInTheDocument();
  });

  it('calls onSelect when color is clicked', async () => {
    const user = userEvent.setup();
    render(
      <ColorSelector
        colorOptions={mockColorOptions}
        selectedIndex={null}
        onSelect={mockOnSelect}
      />
    );

    const button = screen.getByLabelText(/midnight black/i);
    await user.click(button);

    expect(mockOnSelect).toHaveBeenCalledWith(0);
  });
});
