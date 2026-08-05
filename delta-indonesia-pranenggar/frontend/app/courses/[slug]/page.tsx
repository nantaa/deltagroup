'use client'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { GraduationCap, ArrowLeft, Send, Building2, Mail, Phone, User, Loader2 } from 'lucide-react'
import api from '@/lib/api'

interface Course {
  id: number
  title: string
  slug: string
  description: string
  price: string
  cover_image: string | null
}

function formatIDR(amount: string | number): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num)
}

export default function CourseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params?.slug as string

  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    name: '',
    email: '',
    whatsapp_number: '',
    company_name: '',
  })

  useEffect(() => {
    if (!slug) return
    api.get(`/courses/${slug}`)
      .then((res) => setCourse(res.data))
      .catch(() => setCourse(null))
      .finally(() => setLoading(false))
  }, [slug])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!course) return
    setSubmitting(true)
    setError('')

    try {
      const res = await api.post('/course-registrations', {
        course_id: course.id,
        ...form,
      })

      const { payment_url } = res.data
      if (payment_url) {
        window.location.href = payment_url
      }
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string; errors?: Record<string, string[]> } } }
      if (axiosErr.response?.data?.errors) {
        const firstError = Object.values(axiosErr.response.data.errors)[0]
        setError(Array.isArray(firstError) ? firstError[0] : String(firstError))
      } else {
        setError(axiosErr.response?.data?.message || 'Terjadi kesalahan. Silakan coba lagi.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin w-8 h-8 border-4 border-primary-700 border-t-transparent rounded-full" />
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <GraduationCap className="w-12 h-12 text-gray-300 mb-4" />
        <p className="text-gray-500 mb-4">Kursus tidak ditemukan.</p>
        <button onClick={() => router.push('/courses')} className="text-primary-700 font-medium hover:underline">
          Kembali ke Daftar Kursus
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <button
            onClick={() => router.push('/courses')}
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary-700 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Kursus
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Course Info — Left Column */}
          <div className="lg:col-span-3">
            {/* Cover */}
            <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden mb-6">
              {course.cover_image ? (
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}/storage/${course.cover_image}`}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-700/10 to-primary-700/5">
                  <GraduationCap className="w-16 h-16 text-primary-700/30" />
                </div>
              )}
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{course.title}</h1>
            <p className="text-2xl font-bold text-primary-700 mb-6">{formatIDR(course.price)}</p>

            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 whitespace-pre-line leading-relaxed">{course.description}</p>
            </div>
          </div>

          {/* Registration Form — Right Column */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-6">
              <h2 className="text-lg font-bold text-gray-900 mb-1">Daftar Sekarang</h2>
              <p className="text-sm text-gray-500 mb-6">Isi data Anda untuk melanjutkan ke pembayaran.</p>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Nama Lengkap *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      id="reg-name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Nama lengkap"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-primary-700 focus:ring-1 focus:ring-primary-700/20 outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      id="reg-email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="email@example.com"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-primary-700 focus:ring-1 focus:ring-primary-700/20 outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Nomor WhatsApp *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      id="reg-whatsapp"
                      name="whatsapp_number"
                      type="tel"
                      required
                      value={form.whatsapp_number}
                      onChange={handleChange}
                      placeholder="08xxxxxxxxxx"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-primary-700 focus:ring-1 focus:ring-primary-700/20 outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Nama Perusahaan</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      id="reg-company"
                      name="company_name"
                      type="text"
                      value={form.company_name}
                      onChange={handleChange}
                      placeholder="Opsional"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-primary-700 focus:ring-1 focus:ring-primary-700/20 outline-none transition"
                    />
                  </div>
                </div>

                <button
                  id="reg-submit-btn"
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 bg-primary-700 text-white py-3 rounded-lg font-semibold text-sm hover:bg-primary-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Memproses...</>
                  ) : (
                    <><Send className="w-4 h-4" /> Daftar & Bayar</>
                  )}
                </button>
              </form>

              <p className="text-xs text-gray-400 mt-4 text-center">
                Anda akan diarahkan ke halaman pembayaran Xendit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
