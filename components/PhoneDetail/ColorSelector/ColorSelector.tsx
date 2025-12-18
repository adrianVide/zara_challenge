import type { ColorOption } from '@/types/mobile';
import styles from './ColorSelector.module.css';

interface ColorSelectorProps {
  colorOptions: ColorOption[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
}

export function ColorSelector({
  colorOptions,
  selectedIndex,
  onSelect,
}: ColorSelectorProps) {
  if (!colorOptions || colorOptions.length === 0) {
    return null;
  }

  const selectedColor =
    selectedIndex !== null ? colorOptions[selectedIndex] : null;

  return (
    <div className={styles.selector}>
      <div className={styles.selectorLabel} id="color-selector-label">
        COLOR. PICK YOUR FAVOURITE.
      </div>
      <div
        className={styles.colorOptions}
        role="group"
        aria-labelledby="color-selector-label"
      >
        {colorOptions.map((color, index) => (
          <button
            key={index}
            onClick={() => onSelect(index)}
            className={`${styles.colorButton} ${
              selectedIndex === index ? styles.selected : ''
            }`}
            style={{ backgroundColor: color.hexCode }}
            aria-label={`${color.name}${selectedIndex === index ? ', selected' : ''}`}
            aria-pressed={selectedIndex === index}
            type="button"
          >
            {selectedIndex === index && (
              <span className={styles.checkmark} aria-hidden="true">
                ✓
              </span>
            )}
          </button>
        ))}
      </div>
      <div className={styles.colorName} aria-live="polite" aria-atomic="true">
        {selectedColor?.name || 'No color selected'}
      </div>
    </div>
  );
}
