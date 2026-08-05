'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Loader2, Upload } from 'lucide-react'
import api from '@/lib/api'

export default function AdminNewCoursePage() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [coverPreview, setCoverPreview] = useState<string | null>(null)

  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    whatsapp_group_link: '',
    is_active: true,
  })
  const [coverFile, setCoverFile] = useState<File | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setCoverFile(file)
      setCoverPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('title', form.title)
      formData.append('description', form.description)
      formData.append('price', form.price)
      formData.append('whatsapp_group_link', form.whatsapp_group_link)
      formData.append('is_active', form.is_active ? '1' : '0')
      if (coverFile) {
        formData.append('cover_image', coverFile)
      }

      await api.post('/courses', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      router.push('/admin/courses')
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string; errors?: Record<string, string[]> } } }
      if (axiosErr.response?.data?.errors) {
        const firstError = Object.values(axiosErr.response.data.errors)[0]
        setError(Array.isArray(firstError) ? firstError[0] : String(firstError))
      } else {
        setError(axiosErr.response?.data?.message || 'Gagal menyimpan kursus.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => router.push('/admin/courses')} className="text-gray-400 hover:text-gray-600 transition">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-accent">Tambah Kursus Baru</h1>
            <p className="text-xs text-gray-400 mt-0.5">Isi detail kursus untuk ditampilkan di halaman publik</p>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Judul Kursus *</label>
              <input
                id="course-title"
                name="title"
                type="text"
                required
                value={form.title}
                onChange={handleChange}
                placeholder="K3 Lift Escalator"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-accent/40 outline-none transition"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Deskripsi *</label>
              <textarea
                id="course-description"
                name="description"
                required
                rows={5}
                value={form.description}
                onChange={handleChange}
                placeholder="Jelaskan program pelatihan ini..."
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-accent/40 outline-none transition resize-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Harga (IDR) *</label>
              <input
                id="course-price"
                name="price"
                type="number"
                required
                min="0"
                step="1000"
                value={form.price}
                onChange={handleChange}
                placeholder="5000000"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-accent/40 outline-none transition"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">WhatsApp Group Link (Default)</label>
              <input
                id="course-wa-link"
                name="whatsapp_group_link"
                type="url"
                value={form.whatsapp_group_link}
                onChange={handleChange}
                placeholder="https://chat.whatsapp.com/xxx"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-accent/40 outline-none transition"
              />
              <p className="text-xs text-gray-400 mt-1">Link default untuk peserta yang sudah membayar. Bisa di-override per pendaftar.</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Cover Image</label>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center hover:border-accent/30 transition">
                {coverPreview ? (
                  <div className="relative">
                    <img src={coverPreview} alt="Preview" className="max-h-48 mx-auto rounded-lg" />
                    <button
                      type="button"
                      onClick={() => { setCoverFile(null); setCoverPreview(null) }}
                      className="mt-2 text-xs text-red-500 hover:underline"
                    >
                      Hapus Gambar
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Klik untuk upload gambar</p>
                    <p className="text-xs text-gray-400">JPEG, PNG, WebP (max 2MB)</p>
                    <input
                      id="course-cover"
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                id="course-active"
                type="checkbox"
                checked={form.is_active}
                onChange={(e) => setForm((prev) => ({ ...prev, is_active: e.target.checked }))}
                className="w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent/30"
              />
              <label htmlFor="course-active" className="text-sm text-gray-700">Aktifkan kursus (tampilkan di halaman publik)</label>
            </div>

            <hr className="border-gray-100" />

            <button
              id="save-course-btn"
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 bg-accent text-white py-3 rounded-lg font-semibold text-sm hover:bg-blue-700 transition disabled:opacity-50"
            >
              {submitting ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Menyimpan...</>
              ) : (
                <><Save className="w-4 h-4" /> Simpan Kursus</>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
