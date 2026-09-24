'use client'
import React from 'react'
import Link from 'next/link'
import { Post } from '@/types'
import { useLang } from '@/lib/LanguageContext'
import { ArrowRight, Calendar, Tag } from 'lucide-react'

interface Props {
  post: Post
  readMoreLabel?: string
  compact?: boolean
}

export default function PostCard({ post, readMoreLabel, compact = false }: Props) {
  const { t } = useLang()
  const label = readMoreLabel ?? t('berita', 'readMore')

  const formattedDate = post.created_at
    ? new Date(post.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
    : null

  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col group bg-white">
      {/* Thumbnail */}
      <div className={`${compact ? 'h-24 sm:h-28' : 'h-44'} bg-gray-50 flex items-center justify-center overflow-hidden shrink-0 relative`}>
        {post.image ? (
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}/storage/${post.image}`}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
            </svg>
          </div>
        )}
      </div>

      <div className={`${compact ? 'p-3' : 'p-4'} flex flex-col flex-1`}>
        {/* Category badge */}
        {post.category && (
          <span className="inline-flex items-center gap-1 text-[10px] text-dnp-teal font-extrabold uppercase tracking-wider mb-1">
            <Tag className="w-2.5 h-2.5" />
            {post.category}
          </span>
        )}

        <h3 className={`${compact ? 'text-xs sm:text-sm font-bold' : 'text-base font-semibold'} text-gray-900 mb-1 line-clamp-2 group-hover:text-dnp-teal transition-colors leading-snug`}>
          <Link href={`/berita/${post.slug}`}>{post.title}</Link>
        </h3>
        
        {post.excerpt && (
          <p className={`${compact ? 'text-[11px]' : 'text-sm'} text-gray-500 leading-tight line-clamp-2 flex-1 mb-2`}>
            {post.excerpt}
          </p>
        )}

        {/* Footer row */}
        <div className={`flex items-center justify-between mt-auto ${compact ? 'pt-2' : 'pt-3'} border-t border-gray-100`}>
          {formattedDate && (
            <span className="flex items-center gap-1 text-[10px] text-gray-400">
              <Calendar className="w-2.5 h-2.5" />
              {formattedDate}
            </span>
          )}
          <Link
            href={`/berita/${post.slug}`}
            className="flex items-center gap-0.5 text-[11px] font-bold text-dnp-teal hover:text-dnp-navy hover:underline ml-auto"
          >
            <span>{label}</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  )
}
