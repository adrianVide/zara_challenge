import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'front-test-api.herokuapp.com',
      },
      {
        protocol: 'http',
        hostname: 'prueba-tecnica-api-tienda-moviles.onrender.com',
      },
      {
        protocol: 'https',
        hostname: 'prueba-tecnica-api-tienda-moviles.onrender.com',
      },
    ],
  },

  compress: true,
};

export default nextConfig;
