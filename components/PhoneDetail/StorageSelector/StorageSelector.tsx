import type { StorageOption } from '@/types/mobile';
import styles from './StorageSelector.module.css';

interface StorageSelectorProps {
  storageOptions: StorageOption[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
}

export function StorageSelector({
  storageOptions,
  selectedIndex,
  onSelect,
}: StorageSelectorProps) {
  if (!storageOptions || storageOptions.length === 0) {
    return null;
  }

  return (
    <div className={styles.selector}>
      <div className={styles.selectorLabel} id="storage-selector-label">
        STORAGE. HOW MUCH SPACE DO YOU NEED?
      </div>
      <div
        className={styles.storageOptions}
        role="group"
        aria-labelledby="storage-selector-label"
      >
        {storageOptions.map((storage, index) => (
          <button
            key={index}
            onClick={() => onSelect(index)}
            className={`${styles.storageButton} ${
              selectedIndex === index ? styles.selected : ''
            }`}
            aria-label={`${storage.capacity} storage${selectedIndex === index ? ', selected' : ''}`}
            aria-pressed={selectedIndex === index}
            type="button"
          >
            {storage.capacity}
          </button>
        ))}
      </div>
    </div>
  );
}
