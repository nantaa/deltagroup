'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, X, Plus } from 'lucide-react'
import api from '@/lib/api'
import { Post } from '@/types'

export default function EditPostPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string

  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    status: 'draft',
    tags: [] as string[],
  })
  const [tagInput, setTagInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return
    api.get(`/posts/${id}`)
      .then((res) => {
        const p: Post = res.data
        setForm({
          title: p.title,
          excerpt: p.excerpt ?? '',
          content: p.content,
          category: p.category ?? '',
          status: p.status,
          tags: p.tags ?? [],
        })
      })
      .catch(() => setError('Gagal memuat post.'))
      .finally(() => setFetching(false))
  }, [id])

  const addTag = () => {
    const t = tagInput.trim()
    if (t && !form.tags.includes(t)) setForm((p) => ({ ...p, tags: [...p.tags, t] }))
    setTagInput('')
  }

  const removeTag = (tag: string) => setForm((p) => ({ ...p, tags: p.tags.filter((t) => t !== tag) }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await api.put(`/posts/${id}`, form)
      router.push('/admin/blog')
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Gagal menyimpan.')
    } finally {
      setLoading(false)
    }
  }

  if (fetching) return <div className="min-h-screen flex items-center justify-center text-gray-400 text-sm">Memuat...</div>

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <Link href="/admin/blog" className="flex items-center gap-2 text-accent font-semibold text-sm hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back Dashboard
        </Link>
        <Link href="/" className="btn-primary text-sm">Home</Link>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-8 space-y-6">
          {error && <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg p-3">{error}</p>}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Judul *</label>
            <input
              type="text" required value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Ringkasan</label>
            <textarea rows={2} value={form.excerpt}
              onChange={(e) => setForm((p) => ({ ...p, excerpt: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Konten *</label>
            <textarea rows={8} required value={form.content}
              onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Kategori</label>
              <select value={form.category}
                onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 bg-white"
              >
                <option value="">Pilih kategori</option>
                {['Event', 'K3', 'Training', 'Berita'].map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Status</label>
              <select value={form.status}
                onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 bg-white"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tags</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {form.tags.map((tag) => (
                <span key={tag} className="flex items-center gap-1 bg-blue-50 text-accent text-xs px-2.5 py-1 rounded-md">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-500"><X className="w-3 h-3" /></button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input type="text" value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="Tambah tag, lalu Enter..."
                className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30"
              />
              <button type="button" onClick={addTag} className="btn-primary flex items-center gap-1 text-sm">
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Link href="/admin/blog" className="btn-outline">Batal</Link>
            <button type="submit" disabled={loading} className="btn-primary disabled:opacity-60">
              {loading ? 'Menyimpan...' : 'Update Post'}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
