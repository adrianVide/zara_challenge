'use client';

import { useLoading } from '@/contexts/LoadingContext';
import styles from './LoadingBar.module.css';

export function LoadingBar() {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div
      className={styles.loadingBar}
      role="progressbar"
      aria-label="Loading content"
      aria-busy="true"
      aria-live="polite"
    >
      <div className={styles.progress} />
    </div>
  );
}
