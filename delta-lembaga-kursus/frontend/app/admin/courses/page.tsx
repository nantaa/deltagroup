'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Pencil, Trash2, GraduationCap, Search, ToggleLeft, ToggleRight } from 'lucide-react'
import api from '@/lib/api'

interface Course {
  id: number
  title: string
  slug: string
  price: string
  is_active: boolean
  created_at: string
}

function formatIDR(amount: string | number): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num)
}

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  const loadCourses = async (query = '') => {
    setLoading(true)
    try {
      const params: Record<string, string> = { limit: '50' }
      if (query) params.search = query
      const res = await api.get('/courses', { params })
      setCourses(res.data.data || [])
    } catch {
      setCourses([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadCourses() }, [])

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Hapus kursus "${title}"?`)) return
    try {
      await api.delete(`/courses/${id}`)
      setCourses((prev) => prev.filter((c) => c.id !== id))
    } catch {
      alert('Gagal menghapus kursus.')
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    loadCourses(search)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-accent">Course Management</h1>
          <p className="text-xs text-gray-400 mt-0.5">Kelola daftar kursus dan pelatihan</p>
        </div>
        <Link
          href="/admin/courses/new"
          id="add-course-btn"
          className="flex items-center gap-1.5 bg-accent text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" /> Tambah Kursus
        </Link>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Search */}
        <form onSubmit={handleSearch} className="mb-6 flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              id="admin-course-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari kursus..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-accent/40 transition"
            />
          </div>
          <button type="submit" className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition">
            Cari
          </button>
        </form>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin w-6 h-6 border-4 border-accent border-t-transparent rounded-full" />
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-16">
              <GraduationCap className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">Belum ada kursus.</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-5 py-3 font-semibold text-gray-600">Kursus</th>
                  <th className="text-right px-5 py-3 font-semibold text-gray-600">Harga</th>
                  <th className="text-center px-5 py-3 font-semibold text-gray-600">Status</th>
                  <th className="text-right px-5 py-3 font-semibold text-gray-600">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {courses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <p className="font-medium text-gray-900">{course.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">/{course.slug}</p>
                    </td>
                    <td className="px-5 py-4 text-right font-semibold text-gray-900">
                      {formatIDR(course.price)}
                    </td>
                    <td className="px-5 py-4 text-center">
                      {course.is_active ? (
                        <span className="inline-flex items-center gap-1 text-emerald-600 text-xs font-medium">
                          <ToggleRight className="w-4 h-4" /> Aktif
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-gray-400 text-xs font-medium">
                          <ToggleLeft className="w-4 h-4" /> Nonaktif
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <Link
                          href={`/admin/courses/${course.id}/edit`}
                          className="p-2 text-gray-400 hover:text-accent transition-colors rounded-lg hover:bg-gray-100"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(course.id, course.title)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
