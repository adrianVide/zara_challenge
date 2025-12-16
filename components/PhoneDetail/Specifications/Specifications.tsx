import type { ProductDetail } from '@/types/mobile';
import styles from './Specifications.module.css';

interface SpecificationsProps {
  phone: ProductDetail;
}

export function Specifications({ phone }: SpecificationsProps) {
  if (!phone.specs) {
    return null;
  }

  return (
    <div className={styles.specifications}>
      <h2 className={styles.specsTitle}>SPECIFICATIONS</h2>
      <div className={styles.specsTable}>
        {phone.specs.brand && (
          <div className={styles.specRow}>
            <div className={styles.specLabel}>BRAND</div>
            <div>{phone.brand}</div>
          </div>
        )}
        <div className={styles.specRow}>
          <div className={styles.specLabel}>NAME</div>
          <div>{phone.name}</div>
        </div>
        {phone.description && (
          <div className={styles.specRow}>
            <div className={styles.specLabel}>DESCRIPTION</div>
            <div>{phone.description}</div>
          </div>
        )}
        {phone.specs.screen && (
          <div className={styles.specRow}>
            <div className={styles.specLabel}>SCREEN</div>
            <div>{phone.specs.screen}</div>
          </div>
        )}
        {phone.specs.resolution && (
          <div className={styles.specRow}>
            <div className={styles.specLabel}>RESOLUTION</div>
            <div>{phone.specs.resolution}</div>
          </div>
        )}
        {phone.specs.processor && (
          <div className={styles.specRow}>
            <div className={styles.specLabel}>PROCESSOR</div>
            <div>{phone.specs.processor}</div>
          </div>
        )}
        {phone.specs.mainCamera && (
          <div className={styles.specRow}>
            <div className={styles.specLabel}>MAIN CAMERA</div>
            <div>{phone.specs.mainCamera}</div>
          </div>
        )}
        {phone.specs.selfieCamera && (
          <div className={styles.specRow}>
            <div className={styles.specLabel}>SELFIE CAMERA</div>
            <div>{phone.specs.selfieCamera}</div>
          </div>
        )}
        {phone.specs.battery && (
          <div className={styles.specRow}>
            <div className={styles.specLabel}>BATTERY</div>
            <div>{phone.specs.battery}</div>
          </div>
        )}
        {phone.specs.os && (
          <div className={styles.specRow}>
            <div className={styles.specLabel}>OS</div>
            <div>{phone.specs.os}</div>
          </div>
        )}
        {phone.specs.screenRefreshRate && (
          <div className={styles.specRow}>
            <div className={styles.specLabel}>SCREEN REFRESH RATE</div>
            <div>{phone.specs.screenRefreshRate}</div>
          </div>
        )}
      </div>
    </div>
  );
}
