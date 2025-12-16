'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

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
    <div
      style={{
        position: 'fixed',
        top: '61px',
        left: 0,
        right: 0,
        height: '2px',
        backgroundColor: 'var(--border-color)',
        zIndex: 9999,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          height: '100%',
          backgroundColor: 'var(--foreground)',
          animation: 'loading 1.5s ease-in-out infinite',
          width: '30%',
        }}
      />
      <style jsx>{`
        @keyframes loading {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(400%);
          }
        }
      `}</style>
    </div>
  );
}
