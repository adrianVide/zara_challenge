'use client';

import { useMobilePhones } from '@/contexts/MobilePhonesContext';
import { ProductCard } from './ProductCard';

export function MobilePhonesList() {
  const { mobilePhones, error, currentPage, itemsPerPage } = useMobilePhones();

  if (error) {
    return (
      <div
        style={{
          color: 'var(--error-color)',
          padding: '1rem',
          textAlign: 'center',
        }}
      >
        <strong>Error:</strong> {error}
      </div>
    );
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const slicedPhones = mobilePhones.slice(startIndex, endIndex);

  const uniquePhones = Array.from(
    new Map(slicedPhones.map(phone => [phone.id, phone])).values()
  );

  if (uniquePhones.length === 0) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>No phones found</p>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          fontSize: '0.75rem',
          marginBottom: '2rem',
          letterSpacing: '0.05em',
        }}
      >
        {uniquePhones.length} RESULTS
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '0',
          marginBottom: '3rem',
        }}
      >
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
