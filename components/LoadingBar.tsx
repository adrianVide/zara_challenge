'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from './LoadingBar.module.css';

export function LoadingBar() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <div className={styles.loadingBar}>
      <div className={styles.progress} />
    </div>
  );
}
