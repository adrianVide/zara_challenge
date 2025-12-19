'use client';

import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.notFoundContent}>
        <h1 className={styles.notFoundTitle}>404</h1>
        <h2 className={styles.notFoundSubtitle}>Page Not Found</h2>
        <p className={styles.notFoundMessage}>
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <div className={styles.notFoundActions}>
          <Link href="/" className={styles.homeLink}>
            Go to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className={styles.backButton}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
