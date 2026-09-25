/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'api.deltanusa.co.id',
        pathname: '/storage/**',
      },
      {
        protocol: 'https',
        hostname: 'deltanusa.co.id',
        pathname: '/storage/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/storage/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/storage/**',
      },
    ],
    dangerouslyAllowSVG: true,
  },
  compress: true,
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.deltanusa.co.id/api'
    const targetUrl = backendUrl.replace(/\/+$/, '')
    return [
      {
        source: '/api/:path*',
        destination: `${targetUrl}/:path*`,
      },
    ]
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

module.exports = nextConfig
