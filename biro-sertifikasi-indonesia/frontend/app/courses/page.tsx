'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { GraduationCap, ArrowRight, Search } from 'lucide-react'
import api from '@/lib/api'

interface Course {
  id: number
  title: string
  slug: string
  description: string
  price: string
  cover_image: string | null
  is_active: boolean
}

function formatIDR(amount: string | number): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num)
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    loadCourses()
  }, [])

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    loadCourses(search)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <section className="bg-primary-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-1.5 rounded-full text-sm mb-6">
            <GraduationCap className="w-4 h-4" />
            Kursus & Pelatihan
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Program Pelatihan Kami</h1>
          <p className="text-white/70 max-w-xl mx-auto mb-8">
            Pilih program pelatihan yang sesuai dengan kebutuhan Anda. Daftar sekarang dan tingkatkan kompetensi Anda.
          </p>

          {/* Search */}
          <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                id="course-search-input"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari kursus..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg text-gray-900 text-sm outline-none focus:ring-2 focus:ring-white/30"
              />
            </div>
            <button
              id="course-search-btn"
              type="submit"
              className="px-5 py-2.5 bg-white/20 backdrop-blur text-white rounded-lg text-sm font-semibold hover:bg-white/30 transition"
            >
              Cari
            </button>
          </form>
        </div>
      </section>

      {/* Course Grid */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin w-8 h-8 border-4 border-primary-700 border-t-transparent rounded-full" />
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-20">
            <GraduationCap className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Belum ada kursus yang tersedia.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Link
                key={course.id}
                href={`/courses/${course.slug}`}
                className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-primary-700/30 transition-all duration-300"
              >
                {/* Cover Image */}
                <div className="aspect-video bg-gray-100 relative overflow-hidden">
                  {course.cover_image ? (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}/storage/${course.cover_image}`}
                      alt={course.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-700/10 to-primary-700/5">
                      <GraduationCap className="w-12 h-12 text-primary-700/30" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">{course.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary-700">{formatIDR(course.price)}</span>
                    <span className="inline-flex items-center gap-1 text-sm text-primary-700 font-medium group-hover:gap-2 transition-all">
                      Lihat Detail <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
