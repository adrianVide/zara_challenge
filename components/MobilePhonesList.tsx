'use client';

import { useMobilePhones } from '@/contexts/MobilePhonesContext';
import { MobilePhoneCard } from './MobilePhoneCard';

export function MobilePhonesList() {
  const { mobilePhones, error, currentPage, itemsPerPage } = useMobilePhones();

  if (error) {
    return (
      <div
        style={{
          color: 'red',
          padding: '1rem',
          border: '1px solid red',
          borderRadius: '4px',
          backgroundColor: '#fee',
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
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        Showing {uniquePhones.length} phones
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        {uniquePhones.map((phone) => (
          <MobilePhoneCard key={phone.id} phone={phone} />
        ))}
      </div>
    </div>
  );
}
