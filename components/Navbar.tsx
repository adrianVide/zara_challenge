'use client';

import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';

export function Navbar() {
  const { itemCount } = useCart();

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: 'white',
        borderBottom: '1px solid #ddd',
        padding: '1rem 2rem',
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <img
            src="/logo.svg"
            alt="MBST"
            style={{
              height: '40px',
              width: 'auto',
            }}
          />
        </Link>

        {/* Cart Icon */}
        <Link
          href="/cart"
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#000',
            position: 'relative',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          {itemCount > 0 && (
            <span
              style={{
                fontSize: '0.875rem',
                fontWeight: 'bold',
              }}
            >
              ({itemCount})
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
