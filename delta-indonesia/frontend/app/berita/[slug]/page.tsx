import React from 'react'
import TopBar from '@/components/layout/TopBar'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { Calendar, Tag } from 'lucide-react'
import api from '@/lib/api'
import { Post } from '@/types'
import { notFound } from 'next/navigation'

async function getPost(slug: string): Promise<Post | null> {
  try {
    const res = await api.get(`/posts/${slug}`)
    return res.data
  } catch {
    return null
  }
}

export default async function BeritaDetailPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  if (!post) notFound()

  const fmt = (d: string) =>
    d ? new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : ''

  return (
    <>
      <TopBar />
      <Navbar />
      <Breadcrumb crumbs={[{ label: 'Berita', href: '/berita' }, { label: post.title }]} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Thumbnail */}
        <div className="h-72 bg-gray-100 rounded-2xl flex items-center justify-center mb-8 overflow-hidden">
          {post.image ? (
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}/storage/${post.image}`}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <svg className="w-16 h-16 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
            </svg>
          )}
        </div>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="flex items-center gap-1.5 text-sm text-gray-400">
            <Calendar className="w-4 h-4" />
            {fmt(post.created_at)}
          </span>
          <span className="bg-blue-50 text-accent text-xs font-semibold px-3 py-1 rounded-full">
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-snug">{post.title}</h1>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span key={tag} className="flex items-center gap-1 border border-gray-200 text-gray-500 text-xs px-2.5 py-1 rounded-md">
                <Tag className="w-3 h-3" /> {tag}
              </span>
            ))}
          </div>
        )}

        {/* Content */}
        <div
          className="prose prose-gray prose-sm sm:prose max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </main>

      <Footer />
    </>
  )
}
