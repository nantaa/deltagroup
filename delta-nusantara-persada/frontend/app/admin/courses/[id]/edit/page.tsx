'use client'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Save, Loader2, Upload } from 'lucide-react'
import api from '@/lib/api'

interface CourseData {
  id: number
  title: string
  description: string
  price: string
  whatsapp_group_link: string | null
  cover_image: string | null
  is_active: boolean
}

export default function AdminEditCoursePage() {
  const params = useParams()
  const router = useRouter()
  const courseId = params?.id as string

  const [loading, setLoading] = useState(true)
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

  useEffect(() => {
    if (!courseId) return
    api.get(`/courses/${courseId}`)
      .then((res) => {
        const c: CourseData = res.data
        setForm({
          title: c.title,
          description: c.description,
          price: c.price,
          whatsapp_group_link: c.whatsapp_group_link || '',
          is_active: c.is_active,
        })
        if (c.cover_image) {
          setCoverPreview(`${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}/storage/${c.cover_image}`)
        }
      })
      .catch(() => setError('Kursus tidak ditemukan.'))
      .finally(() => setLoading(false))
  }, [courseId])

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
      formData.append('_method', 'PUT')
      formData.append('title', form.title)
      formData.append('description', form.description)
      formData.append('price', form.price)
      formData.append('whatsapp_group_link', form.whatsapp_group_link)
      formData.append('is_active', form.is_active ? '1' : '0')
      if (coverFile) {
        formData.append('cover_image', coverFile)
      }

      await api.post(`/courses/${courseId}`, formData, {
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin w-8 h-8 border-4 border-accent border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-3">
        <button onClick={() => router.push('/admin/courses')} className="text-gray-400 hover:text-gray-600 transition">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-accent">Edit Kursus</h1>
          <p className="text-xs text-gray-400 mt-0.5">Perbarui detail kursus</p>
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
                id="edit-course-title"
                name="title"
                type="text"
                required
                value={form.title}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-accent/40 outline-none transition"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Deskripsi *</label>
              <textarea
                id="edit-course-description"
                name="description"
                required
                rows={5}
                value={form.description}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-accent/40 outline-none transition resize-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Harga (IDR) *</label>
              <input
                id="edit-course-price"
                name="price"
                type="number"
                required
                min="0"
                step="1000"
                value={form.price}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-accent/40 outline-none transition"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">WhatsApp Group Link (Default)</label>
              <input
                id="edit-course-wa-link"
                name="whatsapp_group_link"
                type="url"
                value={form.whatsapp_group_link}
                onChange={handleChange}
                placeholder="https://chat.whatsapp.com/xxx"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-accent/40 outline-none transition"
              />
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
                      Hapus / Ganti Gambar
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Klik untuk upload gambar</p>
                    <input
                      id="edit-course-cover"
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
                id="edit-course-active"
                type="checkbox"
                checked={form.is_active}
                onChange={(e) => setForm((prev) => ({ ...prev, is_active: e.target.checked }))}
                className="w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent/30"
              />
              <label htmlFor="edit-course-active" className="text-sm text-gray-700">Aktifkan kursus</label>
            </div>

            <hr className="border-gray-100" />

            <button
              id="update-course-btn"
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 bg-accent text-white py-3 rounded-lg font-semibold text-sm hover:bg-blue-700 transition disabled:opacity-50"
            >
              {submitting ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Menyimpan...</>
              ) : (
                <><Save className="w-4 h-4" /> Simpan Perubahan</>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
