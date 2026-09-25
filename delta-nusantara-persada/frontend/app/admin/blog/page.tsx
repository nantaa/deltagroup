'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, ChevronDown, Plus, Eye, Pencil, Trash2, Calendar, Tag } from 'lucide-react'
import api from '@/lib/api'
import { Post } from '@/types'
import { getPostImageUrl } from '@/lib/imageUrl'
import clsx from 'clsx'

const CATEGORIES = ['All', 'Event', 'K3', 'Training', 'Berita']

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [catOpen, setCatOpen] = useState(false)

  const fetchPosts = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await api.get('/posts')
      const data = res.data.data ?? res.data
      setPosts(Array.isArray(data) ? data : [])
    } catch (err: unknown) {
      console.error('[AdminBlog] Error fetching posts:', err)
      setError('Gagal terhubung ke API backend (Network Error / 502 Bad Gateway). Periksa koneksi API server Anda.')
      setPosts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Hapus post "${title}"?`)) return
    try {
      await api.delete(`/posts/${id}`)
      setPosts((prev) => prev.filter((p) => p.id !== id))
    } catch {
      alert('Gagal menghapus post.')
    }
  }

  const total = posts.length
  const published = posts.filter((p) => p.status === 'published').length
  const drafts = posts.filter((p) => p.status === 'draft').length

  const filtered = posts.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase())
    const matchCat = category === 'All' || p.category === category
    return matchSearch && matchCat
  })

  const fmt = (d: string) => d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-accent">Blog Management</h1>
        <Link href="/" className="btn-primary text-sm">Home</Link>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Search & Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search posts by title, tags, or content..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-200 rounded-md pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30"
            />
          </div>
          <div className="relative">
            <button
              onClick={() => setCatOpen(!catOpen)}
              className="flex items-center gap-2 border border-gray-200 rounded-md px-4 py-2.5 text-sm text-gray-700 bg-white hover:border-gray-300 transition-colors min-w-[130px] justify-between"
            >
              {category}
              <ChevronDown className="w-4 h-4" />
            </button>
            {catOpen && (
              <div className="absolute top-full right-0 mt-1 w-36 bg-white border border-gray-100 rounded-lg shadow-lg z-20">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => { setCategory(c); setCatOpen(false) }}
                    className="block w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 hover:text-accent transition-colors first:rounded-t-lg last:rounded-b-lg"
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>
          <Link href="/admin/blog/new" className="btn-primary flex items-center gap-1.5 text-sm whitespace-nowrap">
            <Plus className="w-4 h-4" />
            New Post
          </Link>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="font-semibold text-sm">{error}</p>
              <p className="text-xs text-red-500 mt-0.5">
                Pastikan backend Laravel dan PHP-FPM di VPS sedang berjalan normal.
              </p>
            </div>
            <button
              onClick={fetchPosts}
              className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold self-start sm:self-auto transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Posts', value: total },
            { label: 'Published', value: published },
            { label: 'Drafts', value: drafts },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-5">
              <p className="text-sm text-gray-500 mb-1">{s.label}</p>
              <p className="text-2xl font-bold text-gray-800">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Loading / Empty / Grid */}
        {loading ? (
          <div className="py-20 text-center text-gray-400 text-sm">
            Memuat data artikel...
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center border-2 border-dashed border-gray-200 rounded-2xl bg-white p-8">
            <p className="text-gray-600 font-semibold mb-1">Belum ada artikel yang tersedia.</p>
            <p className="text-xs text-gray-400 mb-4">
              {search || category !== 'All' ? 'Tidak ada artikel yang cocok dengan pencarian.' : 'Mulai dengan menambahkan artikel baru.'}
            </p>
            <Link href="/admin/blog/new" className="inline-flex items-center gap-1.5 px-4 py-2 bg-accent text-white rounded-lg text-xs font-semibold hover:bg-accent/90 transition-colors">
              <Plus className="w-4 h-4" /> Add New Post
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map((post) => (
            <div key={post.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              {/* Image */}
              <div className="relative h-44 bg-gray-100 flex items-center justify-center overflow-hidden">
                {getPostImageUrl(post.image) ? (
                  <img
                    src={getPostImageUrl(post.image)!}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg className="w-10 h-10 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                  </svg>
                )}
                <span className={clsx(
                  'absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full',
                  post.status === 'published' ? 'bg-gray-900 text-white' : 'bg-gray-400 text-white'
                )}>
                  {post.status === 'published' ? 'Published' : 'Draft'}
                </span>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-gray-900 text-base mb-1">{post.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-3">{post.excerpt}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {post.tags.map((tag) => (
                    <span key={tag} className="flex items-center gap-1 border border-gray-200 text-gray-500 text-xs px-2.5 py-1 rounded-md">
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                  <span className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Calendar className="w-3.5 h-3.5" />
                    {fmt(post.created_at)}
                  </span>
                  <div className="flex items-center gap-3">
                    <Link href={`/berita/${post.slug}`} className="flex items-center gap-1 text-xs text-gray-500 hover:text-accent transition-colors">
                      <Eye className="w-3.5 h-3.5" /> View
                    </Link>
                    <Link href={`/admin/blog/${post.id}/edit`} className="flex items-center gap-1 text-xs text-gray-500 hover:text-accent transition-colors">
                      <Pencil className="w-3.5 h-3.5" /> Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id, post.title)}
                      className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}
      </main>
    </div>
  )
}
