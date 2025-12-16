"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import styles from "./page.module.css";

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, totalPrice, itemCount } = useCart();

  if (itemCount === 0) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>CART (0)</h1>
        <p className={styles.emptyMessage}>Your cart is empty</p>
        <Link href="/">
          <button className={styles.continueButton}>CONTINUE SHOPPING</button>
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>CART ({itemCount})</h1>

      <div className={styles.itemsList}>
        {items.map((item) => (
          <div key={item.id} className={styles.item}>
            <img
              src={item.imageUrl}
              alt={`${item.brand} ${item.name}`}
              className={styles.itemImage}
            />

            <div className={styles.itemInfo}>
              <h3 className={styles.itemName}>
                {item.brand} {item.name}
              </h3>
              <p className={styles.itemDetails}>
                {item.storage} | {item.color}
              </p>
              <p className={styles.itemPrice}>{item.price} EUR</p>
              <button
                onClick={() => removeItem(item.id)}
                className={styles.removeButton}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <Link href="/">
          <button className={styles.continueButton}>CONTINUE SHOPPING</button>
        </Link>

        <div className={styles.totalSection}>
          <div className={styles.totalLabel}>
            <span>TOTAL</span>
            <span className={styles.totalAmount}>
              {totalPrice.toFixed(0)} EUR
            </span>
          </div>

          <button className={styles.payButton}>PAY</button>
        </div>
      </div>
    </div>
  );
}
