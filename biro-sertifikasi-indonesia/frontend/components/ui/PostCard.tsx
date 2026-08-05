'use client'
import React from 'react'
import Link from 'next/link'
import { Post } from '@/types'
import { useLang } from '@/lib/LanguageContext'
import { ArrowRight, Calendar, Tag } from 'lucide-react'

interface Props {
  post: Post
  readMoreLabel?: string // optional override; defaults to translation
}

export default function PostCard({ post, readMoreLabel }: Props) {
  const { t } = useLang()
  const label = readMoreLabel ?? t('berita', 'readMore')

  const formattedDate = post.created_at
    ? new Date(post.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    : null

  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200 flex flex-col group">
      {/* Thumbnail */}
      <div className="h-44 bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
        {post.image ? (
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}/storage/${post.image}`}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <svg className="w-12 h-12 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
          </svg>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        {/* Category badge */}
        {post.category && (
          <span className="inline-flex items-center gap-1 text-xs text-accent font-semibold uppercase tracking-wide mb-2">
            <Tag className="w-3 h-3" />
            {post.category}
          </span>
        )}

        <h3 className="font-semibold text-gray-900 text-base mb-2 line-clamp-2 group-hover:text-accent transition-colors">
          <Link href={`/berita/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 flex-1">{post.excerpt}</p>

        {/* Footer row */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
          {formattedDate && (
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Calendar className="w-3 h-3" />
              {formattedDate}
            </span>
          )}
          <Link
            href={`/berita/${post.slug}`}
            className="flex items-center gap-1 text-xs font-semibold text-accent hover:underline ml-auto"
          >
            {label}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
