'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error boundary caught:', error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          fontFamily: 'Helvetica, Arial, sans-serif',
          color: '#000000',
          background: '#ffffff',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          <div style={{ maxWidth: '600px', width: '100%' }}>
            <h1
              style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                marginBottom: '2rem',
                color: '#000000',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Application Error
            </h1>
            <p
              style={{
                fontSize: '1rem',
                marginBottom: '2rem',
                color: '#000000',
                lineHeight: '1.6',
              }}
            >
              A critical error has occurred. Please try refreshing the page or
              contact support if the problem persists.
            </p>
            {error.digest && (
              <p
                style={{
                  fontSize: '0.75rem',
                  color: '#000000',
                  marginBottom: '2rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Error ID: {error.digest}
              </p>
            )}
            <div
              style={{
                display: 'flex',
                gap: '0',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <button
                onClick={reset}
                style={{
                  padding: '0.75rem 1.5rem',
                  minHeight: '44px',
                  minWidth: '44px',
                  fontSize: '0.75rem',
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  border: '1px solid #000000',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.color = '#000000';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#000000';
                  e.currentTarget.style.color = '#ffffff';
                }}
              >
                Try again
              </button>
              <Link
                href="/"
                style={{
                  padding: '0.75rem 1.5rem',
                  minHeight: '44px',
                  minWidth: '44px',
                  fontSize: '0.75rem',
                  backgroundColor: '#ffffff',
                  color: '#000000',
                  border: '1px solid #e5e5e5',
                  textDecoration: 'none',
                  display: 'inline-block',
                  transition: 'all 0.2s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginLeft: '-1px',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = '#000000';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = '#e5e5e5';
                }}
              >
                Go to Home
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
