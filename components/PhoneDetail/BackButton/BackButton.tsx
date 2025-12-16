'use client';

import { useRouter } from 'next/navigation';
import styles from './BackButton.module.css';

export function BackButton() {
  const router = useRouter();

  return (
    <button onClick={() => router.back()} className={styles.backButton}>
      <svg
        className={styles.backIcon}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      BACK
    </button>
  );
}
