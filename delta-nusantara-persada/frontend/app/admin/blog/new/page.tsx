'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Upload, Plus, X } from 'lucide-react'
import api from '@/lib/api'
import RichTextEditor from '@/components/ui/RichTextEditor'

export default function NewPostPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    status: 'draft',
    tags: [] as string[],
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [tagInput, setTagInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const addTag = () => {
    const t = tagInput.trim()
    if (t && !form.tags.includes(t)) {
      setForm((prev) => ({ ...prev, tags: [...prev.tags, t] }))
    }
    setTagInput('')
  }

  const removeTag = (tag: string) => {
    setForm((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Ukuran gambar maksimal 2MB')
        return
      }
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      if (imageFile) {
        const formData = new FormData()
        formData.append('title', form.title)
        formData.append('excerpt', form.excerpt)
        formData.append('content', form.content)
        formData.append('category', form.category)
        formData.append('status', form.status)
        form.tags.forEach((t, i) => formData.append(`tags[${i}]`, t))
        formData.append('image', imageFile)
        await api.post('/posts', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
      } else {
        await api.post('/posts', form)
      }
      router.push('/admin/blog')
    } catch (err) {
      const apiMsg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message
      setError(apiMsg ?? (err instanceof Error ? err.message : 'Gagal menyimpan post.'))
    } finally {
      setLoading(false)
    }
  }

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
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30"
              placeholder="Masukkan judul artikel..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Ringkasan</label>
            <textarea
              rows={2}
              value={form.excerpt}
              onChange={(e) => setForm((p) => ({ ...p, excerpt: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 resize-none"
              placeholder="Ringkasan singkat artikel..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Konten *</label>
            <RichTextEditor
              value={form.content}
              onChange={(html) => setForm((p) => ({ ...p, content: html }))}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Kategori</label>
              <select
                value={form.category}
                onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 bg-white"
              >
                <option value="">Pilih kategori</option>
                {['Event', 'K3', 'Training', 'Berita'].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 bg-white"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tags</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {form.tags.map((tag) => (
                <span key={tag} className="flex items-center gap-1 bg-blue-50 text-accent text-xs px-2.5 py-1 rounded-md">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-500 transition-colors">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
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

          {/* Upload image */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Gambar Utama</label>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-accent transition-colors relative">
              {imagePreview ? (
                <div className="relative inline-block">
                  <img src={imagePreview} alt="Preview" className="max-h-48 rounded-lg mx-auto object-cover" />
                  <button
                    type="button"
                    onClick={() => { setImageFile(null); setImagePreview(null) }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer block">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-600">Klik untuk upload gambar artikel</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG, WebP hingga 2MB</p>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Link href="/admin/blog" className="btn-outline">Batal</Link>
            <button type="submit" disabled={loading} className="btn-primary disabled:opacity-60">
              {loading ? 'Menyimpan...' : 'Simpan Post'}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
