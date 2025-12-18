'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { LoadingBar } from '@/components/LoadingBar/LoadingBar';
import styles from './Navbar.module.css';

export function Navbar() {
  const { itemCount } = useCart();

  return (
    <header>
      <nav className={styles.navbar} aria-label="Main navigation">
        <div className={styles.container}>
          {/* Logo */}
          <Link href="/" className={styles.logo} aria-label="MBST Home">
            <Image
              src="/logo.svg"
              alt="MBST"
              className={styles.logoImage}
              width={80}
              height={24}
              priority
            />
          </Link>

          {/* Cart Icon */}
          <Link
            href="/cart"
            className={styles.cartLink}
            aria-label={`Shopping cart, ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={styles.cartIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              role="img"
            >
              <title>Shopping cart icon</title>
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span aria-hidden="true">{itemCount}</span>
          </Link>
        </div>
        <LoadingBar />
      </nav>
    </header>
  );
}
