'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { LoadingBar } from '@/components/LoadingBar/LoadingBar';
import styles from './Navbar.module.css';

export function Navbar() {
  const { itemCount, isHydrated } = useCart();

  return (
    <header>
      <nav className={styles.navbar} aria-label="Main navigation">
        <div className={styles.container}>
          {/* Logo */}
          <Link href="/" className={styles.logo} aria-label="MBST Home">
            <Image src="/logo.svg" alt="MBST" width={74} height={24} priority />
          </Link>
          {/* Cart Icon */}
          <Link
            href="/cart"
            className={styles.cartLink}
            aria-label={
              isHydrated
                ? `Shopping cart, ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`
                : 'Shopping cart'
            }
          >
            <Image
              src="/bag-icon.svg"
              alt=""
              className={styles.cartIcon}
              width={18}
              height={18}
              aria-hidden="true"
            />
            <span aria-hidden="true" suppressHydrationWarning>
              {isHydrated ? itemCount : 0}
            </span>
          </Link>
        </div>
        <LoadingBar />
      </nav>
    </header>
  );
}
