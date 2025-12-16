'use client';

import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import styles from './Navbar.module.css';

export function Navbar() {
  const { itemCount } = useCart();

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <img
            src="/logo.svg"
            alt="MBST"
            className={styles.logoImage}
          />
        </Link>

        {/* Cart Icon */}
        <Link href="/cart" className={styles.cartLink}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={styles.cartIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          <span>{itemCount}</span>
        </Link>
      </div>
    </nav>
  );
}
