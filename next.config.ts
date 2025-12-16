import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
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
};

export default nextConfig;
