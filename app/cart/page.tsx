'use client';

import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';

export default function CartPage() {
  const { items, removeItem, totalPrice, itemCount } = useCart();

  if (itemCount === 0) {
    return (
      <div style={{ padding: '2rem' }}>
        <h1>Shopping Cart</h1>
        <p>Your cart is empty</p>
        <Link href="/">
          <button style={{ padding: '0.75rem 1.5rem', marginTop: '1rem' }}>
            Continue Shopping
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Shopping Cart</h1>
      <p>You have {itemCount} item{itemCount !== 1 ? 's' : ''} in your cart</p>

      <div style={{ marginTop: '2rem' }}>
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '1rem',
              marginBottom: '1rem',
              display: 'grid',
              gridTemplateColumns: '150px 1fr auto',
              gap: '1rem',
              alignItems: 'center',
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
              <h3 style={{ margin: '0 0 0.5rem 0' }}>
                {item.brand} {item.name}
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                <strong>Color:</strong>
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: item.colorHexCode,
                    border: '1px solid #ddd',
                  }}
                />
                <span>{item.color}</span>
              </div>
              <p style={{ margin: '0.5rem 0' }}>
                <strong>Storage:</strong> {item.storage}
              </p>
              <p style={{ margin: '0.5rem 0', fontSize: '1.25rem', fontWeight: 'bold' }}>
                ${item.price}
              </p>
            </div>

            <button
              onClick={() => removeItem(item.id)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: '2rem',
          padding: '1.5rem',
          border: '2px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9',
        }}
      >
        <h2 style={{ margin: '0 0 1rem 0' }}>Total: ${totalPrice.toFixed(2)}</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/">
            <button
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
