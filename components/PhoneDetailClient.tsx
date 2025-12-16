'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { ProductCard } from './ProductCard';
import type { ProductDetail, CartItem } from '@/types/mobile';

interface PhoneDetailClientProps {
  phone: ProductDetail;
}

export function PhoneDetailClient({ phone }: PhoneDetailClientProps) {
  const router = useRouter();
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedStorageIndex, setSelectedStorageIndex] = useState(0);
  const { addItem } = useCart();

  const selectedColor = phone.colorOptions[selectedColorIndex];
  const selectedStorage = phone.storageOptions[selectedStorageIndex];
  const currentPrice = selectedStorage?.price || phone.basePrice;

  const hasColorOptions = phone.colorOptions && phone.colorOptions.length > 0;
  const hasStorageOptions = phone.storageOptions && phone.storageOptions.length > 0;
  const canAddToCart = (!hasColorOptions || selectedColor) && (!hasStorageOptions || selectedStorage);

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: `${phone.id}-${selectedColor?.name || 'default'}-${selectedStorage?.capacity || 'default'}-${Date.now()}`,
      productId: phone.id,
      brand: phone.brand,
      name: phone.name,
      color: selectedColor?.name || 'Default',
      colorHexCode: selectedColor?.hexCode || '#000000',
      storage: selectedStorage?.capacity || 'Standard',
      price: currentPrice,
      imageUrl: selectedColor?.imageUrl || phone.colorOptions[0]?.imageUrl || '',
    };
    addItem(cartItem);
    router.push('/cart');
  };

  return (
    <div style={{ padding: '3rem 4rem' }}>
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'none',
          border: 'none',
          fontSize: '0.875rem',
          marginBottom: '3rem',
          cursor: 'pointer',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        BACK
      </button>

      {/* Product Detail */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          marginBottom: '5rem',
        }}
      >
        {/* Left: Image */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src={selectedColor?.imageUrl || phone.colorOptions[0]?.imageUrl}
            alt={`${phone.brand} ${phone.name}`}
            style={{
              width: '100%',
              maxWidth: '400px',
              height: 'auto',
              objectFit: 'contain',
            }}
          />
        </div>

        {/* Right: Info */}
        <div>
          <h1
            style={{
              margin: '0 0 1rem 0',
              fontSize: '1.25rem',
              fontWeight: 'normal',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {phone.brand} {phone.name}
          </h1>

          <p
            style={{
              fontSize: '1rem',
              margin: '0 0 2rem 0',
            }}
          >
            {currentPrice} EUR
          </p>

          {/* Storage Selector */}
          {phone.storageOptions && phone.storageOptions.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <div
                style={{
                  fontSize: '0.75rem',
                  marginBottom: '1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                STORAGE ¿HOW MUCH SPACE DO YOU NEED?
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {phone.storageOptions.map((storage, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedStorageIndex(index)}
                    style={{
                      padding: '0.75rem 1.5rem',
                      border:
                        selectedStorageIndex === index
                          ? '2px solid var(--foreground)'
                          : '1px solid var(--border-color)',
                      backgroundColor: 'white',
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                    }}
                  >
                    {storage.capacity}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selector */}
          {phone.colorOptions && phone.colorOptions.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <div
                style={{
                  fontSize: '0.75rem',
                  marginBottom: '1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                COLOR. PICK YOUR FAVOURITE.
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                {phone.colorOptions.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColorIndex(index)}
                    style={{
                      width: '32px',
                      height: '32px',
                      backgroundColor: color.hexCode,
                      border:
                        selectedColorIndex === index
                          ? '2px solid var(--foreground)'
                          : '1px solid var(--border-color)',
                      cursor: 'pointer',
                      padding: 0,
                    }}
                    title={color.name}
                  />
                ))}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#666' }}>
                {selectedColor?.name}
              </div>
            </div>
          )}

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={!canAddToCart}
            style={{
              width: '100%',
              padding: '1rem',
              backgroundColor: canAddToCart ? 'var(--foreground)' : '#ccc',
              color: 'white',
              border: 'none',
              fontSize: '0.875rem',
              fontWeight: 'normal',
              letterSpacing: '0.1em',
              cursor: canAddToCart ? 'pointer' : 'not-allowed',
            }}
          >
            AÑADIR
          </button>
        </div>
      </div>

      {/* Specifications */}
      {phone.specs && (
        <div style={{ marginBottom: '5rem' }}>
          <h2
            style={{
              fontSize: '0.875rem',
              marginBottom: '2rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontWeight: 'normal',
            }}
          >
            SPECIFICATIONS
          </h2>
          <div style={{ borderTop: '1px solid var(--border-color)' }}>
            {phone.specs.brand && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '200px 1fr',
                  gap: '2rem',
                  padding: '1rem 0',
                  borderBottom: '1px solid var(--border-color)',
                  fontSize: '0.875rem',
                }}
              >
                <div style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>BRAND</div>
                <div>{phone.brand}</div>
              </div>
            )}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '200px 1fr',
                gap: '2rem',
                padding: '1rem 0',
                borderBottom: '1px solid var(--border-color)',
                fontSize: '0.875rem',
              }}
            >
              <div style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>NAME</div>
              <div>{phone.name}</div>
            </div>
            {phone.description && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '200px 1fr',
                  gap: '2rem',
                  padding: '1rem 0',
                  borderBottom: '1px solid var(--border-color)',
                  fontSize: '0.875rem',
                }}
              >
                <div style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>DESCRIPTION</div>
                <div>{phone.description}</div>
              </div>
            )}
            {phone.specs.screen && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '200px 1fr',
                  gap: '2rem',
                  padding: '1rem 0',
                  borderBottom: '1px solid var(--border-color)',
                  fontSize: '0.875rem',
                }}
              >
                <div style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>SCREEN</div>
                <div>{phone.specs.screen}</div>
              </div>
            )}
            {phone.specs.resolution && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '200px 1fr',
                  gap: '2rem',
                  padding: '1rem 0',
                  borderBottom: '1px solid var(--border-color)',
                  fontSize: '0.875rem',
                }}
              >
                <div style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>RESOLUTION</div>
                <div>{phone.specs.resolution}</div>
              </div>
            )}
            {phone.specs.processor && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '200px 1fr',
                  gap: '2rem',
                  padding: '1rem 0',
                  borderBottom: '1px solid var(--border-color)',
                  fontSize: '0.875rem',
                }}
              >
                <div style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>PROCESSOR</div>
                <div>{phone.specs.processor}</div>
              </div>
            )}
            {phone.specs.mainCamera && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '200px 1fr',
                  gap: '2rem',
                  padding: '1rem 0',
                  borderBottom: '1px solid var(--border-color)',
                  fontSize: '0.875rem',
                }}
              >
                <div style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>MAIN CAMERA</div>
                <div>{phone.specs.mainCamera}</div>
              </div>
            )}
            {phone.specs.selfieCamera && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '200px 1fr',
                  gap: '2rem',
                  padding: '1rem 0',
                  borderBottom: '1px solid var(--border-color)',
                  fontSize: '0.875rem',
                }}
              >
                <div style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>SELFIE CAMERA</div>
                <div>{phone.specs.selfieCamera}</div>
              </div>
            )}
            {phone.specs.battery && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '200px 1fr',
                  gap: '2rem',
                  padding: '1rem 0',
                  borderBottom: '1px solid var(--border-color)',
                  fontSize: '0.875rem',
                }}
              >
                <div style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>BATTERY</div>
                <div>{phone.specs.battery}</div>
              </div>
            )}
            {phone.specs.os && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '200px 1fr',
                  gap: '2rem',
                  padding: '1rem 0',
                  borderBottom: '1px solid var(--border-color)',
                  fontSize: '0.875rem',
                }}
              >
                <div style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>OS</div>
                <div>{phone.specs.os}</div>
              </div>
            )}
            {phone.specs.screenRefreshRate && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '200px 1fr',
                  gap: '2rem',
                  padding: '1rem 0',
                  borderBottom: '1px solid var(--border-color)',
                  fontSize: '0.875rem',
                }}
              >
                <div style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>SCREEN REFRESH RATE</div>
                <div>{phone.specs.screenRefreshRate}</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Similar Items */}
      {phone.similarProducts && phone.similarProducts.length > 0 && (
        <div>
          <h2
            style={{
              fontSize: '0.875rem',
              marginBottom: '2rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontWeight: 'normal',
            }}
          >
            SIMILAR ITEMS
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '0',
            }}
          >
            {phone.similarProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                brand={product.brand}
                name={product.name}
                price={product.basePrice}
                imageUrl={product.imageUrl}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
