'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ProductCardProps {
  id: string;
  brand: string;
  name: string;
  price: number;
  imageUrl: string;
}

export function ProductCard({ id, brand, name, price, imageUrl }: ProductCardProps) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    router.push(`/phone/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        border: '1px solid var(--border-color)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        backgroundColor: isHovered ? 'var(--hover-bg)' : 'white',
        color: isHovered ? 'var(--hover-text)' : 'var(--foreground)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {/* Image Container */}
      <div
        style={{
          width: '100%',
          aspectRatio: '1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          overflow: 'hidden',
        }}
      >
        <img
          src={imageUrl}
          alt={`${brand} ${name}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </div>

      {/* Info Container */}
      <div
        style={{
          padding: '0.75rem 1rem 1rem 1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem',
        }}
      >
        {/* Brand */}
        <div
          style={{
            fontSize: '0.625rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {brand}
        </div>

        {/* Name and Price */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            fontSize: '0.75rem',
            gap: '0.5rem',
          }}
        >
          <span style={{ flex: 1 }}>{name}</span>
          <span style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>
            {price} EUR
          </span>
        </div>
      </div>
    </div>
  );
}
