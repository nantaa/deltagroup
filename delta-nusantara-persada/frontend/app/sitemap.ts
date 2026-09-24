import { MetadataRoute } from 'next'

// ASSUMPTION: NEXT_PUBLIC_SITE_URL = https://deltanusa.co.id
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://deltanusa.co.id'
const API_URL  = process.env.NEXT_PUBLIC_API_URL  ?? 'http://localhost:8000/api'

interface PostSlug {
  slug: string
  updated_at?: string
}

async function getBlogSlugs(): Promise<PostSlug[]> {
  try {
    const res = await fetch(`${API_URL}/posts?status=published&limit=200`, {
      next: { revalidate: 3600 }, // re-generate sitemap hourly
    })
    if (!res.ok) return []
    const body = await res.json()
    const posts: PostSlug[] = body.data ?? body
    return Array.isArray(posts) ? posts : []
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/berita`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  const slugs = await getBlogSlugs()
  const blogRoutes: MetadataRoute.Sitemap = slugs.map((post) => ({
    url: `${SITE_URL}/berita/${post.slug}`,
    lastModified: post.updated_at ? new Date(post.updated_at) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...blogRoutes]
}
