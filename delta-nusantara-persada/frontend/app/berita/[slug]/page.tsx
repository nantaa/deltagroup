import type { Metadata } from 'next'
import React from 'react'
import SiteHeader from '@/components/layout/SiteHeader'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import JsonLd from '@/components/seo/JsonLd'
import { Calendar, Tag } from 'lucide-react'
import api from '@/lib/api'
import { Post } from '@/types'
import { notFound } from 'next/navigation'
import DOMPurify from 'isomorphic-dompurify'
import { getPostImageUrl } from '@/lib/imageUrl'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://deltanusa.co.id'
const API_URL  = process.env.NEXT_PUBLIC_API_URL  ?? 'http://localhost:8000/api'

async function getPost(slug: string): Promise<Post | null> {
  try {
    const res = await api.get(`/posts/${slug}`)
    return res.data
  } catch {
    return null
  }
}

// ─── Per-page dynamic metadata ────────────────────────────────────────────────
export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const post = await getPost(params.slug)
  if (!post) return { title: 'Artikel Tidak Ditemukan' }

  const ogImage = getPostImageUrl(post.image) || `${SITE_URL}/images/og-dnp.png`

  return {
    title: post.title,
    description: post.excerpt ?? post.title,
    alternates: {
      canonical: `/berita/${params.slug}`,
    },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt ?? post.title,
      url: `/berita/${params.slug}`,
      publishedTime: post.created_at,
      modifiedTime: post.updated_at || post.created_at,
      tags: post.tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt ?? post.title,
      images: [ogImage],
    },
  }
}

// ─── Static params for ISR / pre-rendering known posts ────────────────────────
export async function generateStaticParams() {
  try {
    const res = await fetch(`${API_URL}/posts?status=published&limit=200`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return []
    const body = await res.json()
    const posts: Post[] = body.data ?? body
    return Array.isArray(posts) ? posts.map((p) => ({ slug: p.slug })) : []
  } catch {
    return []
  }
}

export default async function BeritaDetailPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  if (!post) notFound()

  const fmt = (d: string) =>
    d ? new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : ''

  const ogImage = getPostImageUrl(post.image)

  // Article JSON-LD
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt ?? post.title,
    datePublished: post.created_at,
    dateModified: post.updated_at || post.created_at,
    author: {
      '@type': 'Organization',
      name: 'PT Delta Nusantara Persada',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'PT Delta Nusantara Persada',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/LOGO-DNP-Primary (1).png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/berita/${params.slug}`,
    },
    ...(ogImage ? { image: ogImage } : {}),
    keywords: post.tags?.join(', '),
  }

  return (
    <>
      <JsonLd data={articleSchema} />
      <SiteHeader />
      <Breadcrumb crumbs={[{ label: 'Berita', href: '/berita' }, { label: post.title }]} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Thumbnail */}
        <div className="h-72 bg-gray-100 rounded-2xl flex items-center justify-center mb-8 overflow-hidden">
          {ogImage ? (
            <img
              src={ogImage}
              alt={post.title}
              width={800}
              height={288}
              className="w-full h-full object-cover"
            />
          ) : (
            <svg className="w-16 h-16 text-gray-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
            </svg>
          )}
        </div>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="flex items-center gap-1.5 text-sm text-gray-400">
            <Calendar className="w-4 h-4" aria-hidden="true" />
            <time dateTime={post.created_at}>{fmt(post.created_at)}</time>
          </span>
          <span className="bg-blue-50 text-accent text-xs font-semibold px-3 py-1 rounded-full">
            {post.category}
          </span>
        </div>

        {/* Title — h1 for SEO */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-snug">{post.title}</h1>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span key={tag} className="flex items-center gap-1 border border-gray-200 text-gray-500 text-xs px-2.5 py-1 rounded-md">
                <Tag className="w-3 h-3" aria-hidden="true" /> {tag}
              </span>
            ))}
          </div>
        )}

        {/* Content */}
        <div
          className="prose prose-dnp prose-sm sm:prose max-w-none text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
        />
      </main>

      <Footer />
    </>
  )
}
