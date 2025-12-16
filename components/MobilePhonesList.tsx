'use client';

import { useMobilePhones } from '@/contexts/MobilePhonesContext';

export function MobilePhonesList() {
  const { mobilePhones, error } = useMobilePhones();

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

  return (
    <div>
      <p style={{ marginBottom: '1rem' }}>
        <strong>Total phones fetched:</strong> {mobilePhones.length}
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
        {JSON.stringify(mobilePhones, null, 2)}
      </pre>
    </div>
  );
}
