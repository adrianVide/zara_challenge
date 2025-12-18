'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import styles from './page.module.css';

export default function CartPage() {
  const { items, removeItem, totalPrice, itemCount } = useCart();

  useEffect(() => {
    document.title = `Shopping Cart (${itemCount}) | MBST Mobile Phones`;
  }, [itemCount]);

  if (itemCount === 0) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>CART (0)</h1>
        <p className={styles.emptyMessage} role="status" aria-live="polite">
          Your cart is empty
        </p>
        <Link href="/">
          <button className={styles.continueButton} type="button">
            CONTINUE SHOPPING
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        CART (
        <span aria-live="polite" aria-atomic="true">
          {itemCount}
        </span>
        )
      </h1>

      <div
        className={styles.itemsList}
        role="list"
        aria-label="Shopping cart items"
      >
        {items.map((item) => (
          <div key={item.id} className={styles.item} role="listitem">
            <Image
              src={item.imageUrl}
              alt={`${item.brand} ${item.name}`}
              className={styles.itemImage}
              width={80}
              height={80}
            />

            <div className={styles.itemInfo}>
              <h2 className={styles.itemName}>
                {item.brand} {item.name}
              </h2>
              <p className={styles.itemDetails}>
                {item.storage} | {item.color}
              </p>
              <p
                className={styles.itemPrice}
                aria-label={`Price: ${item.price} euros`}
              >
                {item.price} EUR
              </p>
              <button
                onClick={() => removeItem(item.id)}
                className={styles.removeButton}
                aria-label={`Remove ${item.brand} ${item.name} from cart`}
                type="button"
              >
                REMOVE
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <Link href="/">
          <button className={styles.continueButton} type="button">
            CONTINUE SHOPPING
          </button>
        </Link>

        <div className={styles.totalSection}>
          <div className={styles.totalLabel}>
            <span>TOTAL</span>
            <span
              className={styles.totalAmount}
              aria-live="polite"
              aria-atomic="true"
              aria-label={`Total: ${totalPrice.toFixed(0)} euros`}
            >
              {totalPrice.toFixed(0)} EUR
            </span>
          </div>

          <button
            className={styles.payButton}
            type="button"
            aria-label="Proceed to payment"
          >
            PAY
          </button>
        </div>
      </div>
    </div>
  );
}
