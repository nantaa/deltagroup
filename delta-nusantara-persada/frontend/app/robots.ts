import { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://deltanusa.co.id'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/admin/',
          '/api/',
          '/_next/',
        ],
      },
      // Block aggressive scrapers & raw AI trainers from draining 2GB VPS bandwidth
      {
        userAgent: ['CCBot', 'Bytespider', 'Scrapy', 'SemrushBot'],
        disallow: ['/'],
      },
      // Explicitly encourage major search engines
      {
        userAgent: ['Googlebot', 'Bingbot', 'YandexBot'],
        allow: '/',
        disallow: ['/admin', '/admin/', '/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
