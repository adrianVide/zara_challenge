'use client';

import { useMobilePhones } from '@/contexts/MobilePhonesContext';

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
  const currentPagePhones = mobilePhones.slice(startIndex, endIndex);

  return (
    <div>
      <p style={{ marginBottom: '1rem' }}>
        <strong>Total phones in context:</strong> {mobilePhones.length} |{' '}
        <strong>Showing:</strong> {currentPagePhones.length} phones (items {startIndex + 1}-
        {Math.min(endIndex, mobilePhones.length)})
      </p>
      <pre
        style={{
          backgroundColor: '#f5f5f5',
          padding: '1rem',
          borderRadius: '4px',
          overflow: 'auto',
          maxHeight: '80vh',
        }}
      >
        {JSON.stringify(currentPagePhones, null, 2)}
      </pre>
    </div>
  );
}
