'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { ProductCard } from './ProductCard';
import type { ProductDetail, CartItem } from '@/types/mobile';
import styles from './PhoneDetailClient.module.css';

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
    <div className={styles.container}>
      <button onClick={() => router.back()} className={styles.backButton}>
        <svg className={styles.backIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        BACK
      </button>

      <div className={styles.productDetail}>
        <div className={styles.imageContainer}>
          <img
            src={selectedColor?.imageUrl || phone.colorOptions[0]?.imageUrl}
            alt={`${phone.brand} ${phone.name}`}
            className={styles.image}
          />
        </div>

        <div className={styles.productInfo}>
          <h1 className={styles.title}>
            {phone.brand} {phone.name}
          </h1>

          <p className={styles.price}>{currentPrice} EUR</p>

          {phone.storageOptions && phone.storageOptions.length > 0 && (
            <div className={styles.selector}>
              <div className={styles.selectorLabel}>
                STORAGE ¿HOW MUCH SPACE DO YOU NEED?
              </div>
              <div className={styles.storageOptions}>
                {phone.storageOptions.map((storage, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedStorageIndex(index)}
                    className={`${styles.storageButton} ${selectedStorageIndex === index ? styles.selected : ''}`}
                  >
                    {storage.capacity}
                  </button>
                ))}
              </div>
            </div>
          )}

          {phone.colorOptions && phone.colorOptions.length > 0 && (
            <div className={styles.selector}>
              <div className={styles.selectorLabel}>
                COLOR. PICK YOUR FAVOURITE.
              </div>
              <div className={styles.colorOptions}>
                {phone.colorOptions.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColorIndex(index)}
                    className={`${styles.colorButton} ${selectedColorIndex === index ? styles.selected : ''}`}
                    style={{ backgroundColor: color.hexCode }}
                    title={color.name}
                  />
                ))}
              </div>
              <div className={styles.colorName}>
                {selectedColor?.name}
              </div>
            </div>
          )}

          <button
            onClick={handleAddToCart}
            disabled={!canAddToCart}
            className={styles.addButton}
          >
            AÑADIR
          </button>
        </div>
      </div>

      {phone.specs && (
        <div className={styles.specifications}>
          <h2 className={styles.specsTitle}>SPECIFICATIONS</h2>
          <div className={styles.specsTable}>
            {phone.specs.brand && (
              <div className={styles.specRow}>
                <div className={styles.specLabel}>BRAND</div>
                <div>{phone.brand}</div>
              </div>
            )}
            <div className={styles.specRow}>
              <div className={styles.specLabel}>NAME</div>
              <div>{phone.name}</div>
            </div>
            {phone.description && (
              <div className={styles.specRow}>
                <div className={styles.specLabel}>DESCRIPTION</div>
                <div>{phone.description}</div>
              </div>
            )}
            {phone.specs.screen && (
              <div className={styles.specRow}>
                <div className={styles.specLabel}>SCREEN</div>
                <div>{phone.specs.screen}</div>
              </div>
            )}
            {phone.specs.resolution && (
              <div className={styles.specRow}>
                <div className={styles.specLabel}>RESOLUTION</div>
                <div>{phone.specs.resolution}</div>
              </div>
            )}
            {phone.specs.processor && (
              <div className={styles.specRow}>
                <div className={styles.specLabel}>PROCESSOR</div>
                <div>{phone.specs.processor}</div>
              </div>
            )}
            {phone.specs.mainCamera && (
              <div className={styles.specRow}>
                <div className={styles.specLabel}>MAIN CAMERA</div>
                <div>{phone.specs.mainCamera}</div>
              </div>
            )}
            {phone.specs.selfieCamera && (
              <div className={styles.specRow}>
                <div className={styles.specLabel}>SELFIE CAMERA</div>
                <div>{phone.specs.selfieCamera}</div>
              </div>
            )}
            {phone.specs.battery && (
              <div className={styles.specRow}>
                <div className={styles.specLabel}>BATTERY</div>
                <div>{phone.specs.battery}</div>
              </div>
            )}
            {phone.specs.os && (
              <div className={styles.specRow}>
                <div className={styles.specLabel}>OS</div>
                <div>{phone.specs.os}</div>
              </div>
            )}
            {phone.specs.screenRefreshRate && (
              <div className={styles.specRow}>
                <div className={styles.specLabel}>SCREEN REFRESH RATE</div>
                <div>{phone.specs.screenRefreshRate}</div>
              </div>
            )}
          </div>
        </div>
      )}

      {phone.similarProducts && phone.similarProducts.length > 0 && (
        <div className={styles.similarItems}>
          <h2 className={styles.similarTitle}>SIMILAR ITEMS</h2>
          <div className={styles.similarGrid}>
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
