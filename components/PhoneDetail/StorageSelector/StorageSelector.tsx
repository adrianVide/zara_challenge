import type { StorageOption } from '@/types/mobile';
import styles from './StorageSelector.module.css';

interface StorageSelectorProps {
  storageOptions: StorageOption[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export function StorageSelector({ storageOptions, selectedIndex, onSelect }: StorageSelectorProps) {
  if (!storageOptions || storageOptions.length === 0) {
    return null;
  }

  return (
    <div className={styles.selector}>
      <div className={styles.selectorLabel}>
        STORAGE ¿HOW MUCH SPACE DO YOU NEED?
      </div>
      <div className={styles.storageOptions}>
        {storageOptions.map((storage, index) => (
          <button
            key={index}
            onClick={() => onSelect(index)}
            className={`${styles.storageButton} ${
              selectedIndex === index ? styles.selected : ''
            }`}
          >
            {storage.capacity}
          </button>
        ))}
      </div>
    </div>
  );
}
