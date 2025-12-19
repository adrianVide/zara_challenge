'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import styles from './error.module.css';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error boundary caught:', error);
  }, [error]);

  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <h1 className={styles.errorTitle}>Something went wrong!</h1>
        <p className={styles.errorMessage}>
          We apologize for the inconvenience. An unexpected error has occurred.
        </p>
        {error.message && (
          <details className={styles.errorDetails}>
            <summary>Error Details</summary>
            <pre className={styles.errorPre}>{error.message}</pre>
            {error.digest && (
              <p className={styles.errorDigest}>Error ID: {error.digest}</p>
            )}
          </details>
        )}
        <div className={styles.errorActions}>
          <button onClick={reset} className={styles.retryButton}>
            Try again
          </button>
          <Link href="/" className={styles.homeButton}>
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
