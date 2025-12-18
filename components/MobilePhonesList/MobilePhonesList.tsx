'use client';

import { useMobilePhones } from '@/contexts/MobilePhonesContext';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './MobilePhonesList.module.css';

export function MobilePhonesList() {
  const { mobilePhones, error, currentPage, itemsPerPage } = useMobilePhones();

  if (error) {
    return (
      <div className={styles.error}>
        <strong>Error:</strong> {error}
      </div>
    );
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const slicedPhones = mobilePhones.slice(startIndex, endIndex);

  const uniquePhones = Array.from(
    new Map(slicedPhones.map((phone) => [phone.id, phone])).values()
  );

  if (uniquePhones.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No phones found</p>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.resultsCount}>{uniquePhones.length} RESULTS</div>
      <div className={styles.grid}>
        {uniquePhones.map((phone) => (
          <ProductCard
            key={phone.id}
            id={phone.id}
            brand={phone.brand}
            name={phone.name}
            price={phone.basePrice}
            imageUrl={phone.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}
