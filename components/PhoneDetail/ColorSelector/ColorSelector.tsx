import type { ColorOption } from '@/types/mobile';
import styles from './ColorSelector.module.css';

interface ColorSelectorProps {
  colorOptions: ColorOption[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export function ColorSelector({ colorOptions, selectedIndex, onSelect }: ColorSelectorProps) {
  if (!colorOptions || colorOptions.length === 0) {
    return null;
  }

  const selectedColor = colorOptions[selectedIndex];

  return (
    <div className={styles.selector}>
      <div className={styles.selectorLabel}>
        COLOR. PICK YOUR FAVOURITE.
      </div>
      <div className={styles.colorOptions}>
        {colorOptions.map((color, index) => (
          <button
            key={index}
            onClick={() => onSelect(index)}
            className={`${styles.colorButton} ${
              selectedIndex === index ? styles.selected : ''
            }`}
            style={{ backgroundColor: color.hexCode }}
            title={color.name}
          />
        ))}
      </div>
      <div className={styles.colorName}>{selectedColor?.name}</div>
    </div>
  );
}
