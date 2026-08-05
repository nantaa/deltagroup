'use client'
import React, { useState, useEffect } from 'react'
import TopBar from '@/components/layout/TopBar'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import PostCard from '@/components/ui/PostCard'
import { ChevronDown, Search } from 'lucide-react'
import api from '@/lib/api'
import { Post } from '@/types'
import { useLang } from '@/lib/LanguageContext'

const MOCK_POSTS: Post[] = [
  { id: 1, title: 'Pentingnya Keselamatan Kerja di Industri', slug: 'keselamatan-kerja', excerpt: 'Keselamatan kerja adalah prioritas utama dalam setiap operasional industri modern.', content: '', status: 'published', tags: ['K3', 'Keselamatan', 'Training'], category: 'K3', created_at: '2026-10-12', updated_at: '' },
  { id: 2, title: 'Sertifikasi Kompetensi Profesional 2026', slug: 'sertifikasi-kompetensi', excerpt: 'Program sertifikasi kompetensi untuk meningkatkan profesionalitas tenaga kerja Indonesia.', content: '', status: 'published', tags: ['Sertifikasi', 'Event', 'Kompetensi'], category: 'Event', created_at: '2026-11-01', updated_at: '' },
  { id: 3, title: 'Jadwal Pelatihan K3 KEMNAKER RI 2026', slug: 'jadwal-k3-2026', excerpt: 'Berikut jadwal pelaksanaan pelatihan K3 dan sertifikasi dari KEMNAKER yang diselenggarakan setiap bulannya.', content: '', status: 'published', tags: ['Training', 'Jadwal', 'K3'], category: 'Training', created_at: '2026-11-03', updated_at: '' },
]

const CATEGORIES_ID = ['Semua', 'Event', 'K3', 'Training', 'Berita']
const CATEGORIES_EN = ['All', 'Event', 'K3', 'Training', 'News']

export default function BeritaPage() {
  const { lang, t } = useLang()

  const CATEGORIES = lang === 'ID' ? CATEGORIES_ID : CATEGORIES_EN
  const allLabel = lang === 'ID' ? 'Semua' : 'All'

  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(allLabel)
  const [catOpen, setCatOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  // Reset category when language switches so active label stays valid
  useEffect(() => { setCategory(allLabel) }, [lang]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      try {
        const params: Record<string, string> = { status: 'published' }
        if (search) params.search = search
        // Map EN category back to ID for the API
        const apiCat = category === 'All' || category === 'Semua' ? '' : category
        if (apiCat) params.category = apiCat
        const res = await api.get('/posts', { params })
        setPosts(res.data.data ?? res.data)
      } catch {
        setPosts(MOCK_POSTS)
      } finally {
        setLoading(false)
      }
    }
    const timer = setTimeout(fetchPosts, 400)
    return () => clearTimeout(timer)
  }, [search, category])

  const pageTitle = t('berita', 'title')
  const pageSubtitle = t('berita', 'subtitle')
  const readMore = t('berita', 'readMore')
  const loadMore = t('berita', 'loadMore')
  const emptyText = lang === 'ID' ? 'Tidak ada berita ditemukan.' : 'No articles found.'
  const searchPlaceholder = lang === 'ID' ? 'Cari artikel...' : 'Search articles...'
  const categoryLabel = lang === 'ID' ? 'KATEGORI' : 'CATEGORY'

  return (
    <>
      <TopBar />
      <Navbar />
      <Breadcrumb crumbs={[{ label: lang === 'ID' ? 'Berita' : 'News' }]} />

      {/* Page Header */}
      <div className="bg-primary-700 text-white py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">{pageTitle}</h1>
          <p className="text-blue-200 text-sm">{pageSubtitle}</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          {/* Category dropdown */}
          <div className="relative">
            <button
              id="berita-category-btn"
              onClick={() => setCatOpen(!catOpen)}
              className="flex items-center gap-2 border border-gray-200 rounded-md px-4 py-2.5 text-sm font-semibold text-gray-700 hover:border-gray-300 transition-colors min-w-[130px] justify-between"
            >
              {category}
              <ChevronDown className="w-4 h-4" />
            </button>
            {catOpen && (
              <div className="absolute top-full left-0 mt-1 w-44 bg-white border border-gray-100 rounded-lg shadow-lg z-20">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => { setCategory(c); setCatOpen(false) }}
                    className={`block w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 hover:text-accent transition-colors first:rounded-t-lg last:rounded-b-lg ${category === c ? 'text-accent font-semibold' : 'text-gray-600'
                      }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              id="berita-search"
              type="text"
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-200 rounded-md pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition"
            />
          </div>
        </div>

        {/* Posts grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-gray-100 rounded-xl overflow-hidden animate-pulse">
                <div className="h-44 bg-gray-100" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-100 rounded w-3/4" />
                  <div className="h-3 bg-gray-100 rounded w-full" />
                  <div className="h-3 bg-gray-100 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 text-gray-400">{emptyText}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} readMoreLabel={readMore} />
            ))}
          </div>
        )}

        {/* Load More */}
        {posts.length > 0 && !loading && (
          <div className="flex justify-center mt-10">
            <button
              id="berita-load-more"
              className="btn-outline px-8"
            >
              {loadMore}
            </button>
          </div>
        )}
      </main>

      <Footer />
    </>
  )
}
