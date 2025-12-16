'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, totalPrice, itemCount } = useCart();

  if (itemCount === 0) {
    return (
      <div style={{ padding: '3rem 4rem', minHeight: '60vh' }}>
        <h1
          style={{
            fontSize: '0.875rem',
            fontWeight: 'normal',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '3rem',
          }}
        >
          CART (0)
        </h1>
        <p style={{ marginBottom: '2rem' }}>Your cart is empty</p>
        <Link href="/">
          <button
            style={{
              padding: '1rem 2rem',
              backgroundColor: 'transparent',
              border: '1px solid var(--foreground)',
              fontSize: '0.75rem',
              letterSpacing: '0.05em',
              cursor: 'pointer',
            }}
          >
            CONTINUE SHOPPING
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '3rem 4rem', minHeight: '60vh' }}>
      <h1
        style={{
          fontSize: '0.875rem',
          fontWeight: 'normal',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '3rem',
        }}
      >
        CART ({itemCount})
      </h1>

      <div style={{ marginBottom: '4rem' }}>
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '150px 1fr',
              gap: '2rem',
              marginBottom: '3rem',
              paddingBottom: '2rem',
              borderBottom: '1px solid var(--border-color)',
            }}
          >
            <img
              src={item.imageUrl}
              alt={`${item.brand} ${item.name}`}
              style={{
                width: '100%',
                height: '150px',
                objectFit: 'contain',
              }}
            />

            <div>
              <h3
                style={{
                  margin: '0 0 0.5rem 0',
                  fontSize: '0.875rem',
                  fontWeight: 'normal',
                  textTransform: 'uppercase',
                }}
              >
                {item.brand} {item.name}
              </h3>
              <p style={{ margin: '0.25rem 0', fontSize: '0.875rem' }}>
                {item.storage} | {item.color}
              </p>
              <p style={{ margin: '0.75rem 0 1rem 0', fontSize: '0.875rem' }}>
                {item.price} EUR
              </p>
              <button
                onClick={() => removeItem(item.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--error-color)',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  padding: 0,
                  textDecoration: 'underline',
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '2rem',
          borderTop: '2px solid var(--border-color)',
        }}
      >
        <Link href="/">
          <button
            style={{
              padding: '1rem 2rem',
              backgroundColor: 'transparent',
              border: '1px solid var(--foreground)',
              fontSize: '0.75rem',
              letterSpacing: '0.05em',
              cursor: 'pointer',
            }}
          >
            CONTINUE SHOPPING
          </button>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
          <div style={{ fontSize: '0.875rem' }}>
            <span style={{ marginRight: '2rem' }}>TOTAL</span>
            <span style={{ fontWeight: 'bold' }}>{totalPrice.toFixed(0)} EUR</span>
          </div>

          <button
            style={{
              padding: '1rem 3rem',
              backgroundColor: 'var(--foreground)',
              color: 'white',
              border: 'none',
              fontSize: '0.75rem',
              letterSpacing: '0.05em',
              cursor: 'pointer',
            }}
          >
            PAY
          </button>
        </div>
      </div>
    </div>
  );
}
