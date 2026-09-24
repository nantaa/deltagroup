'use client'
import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, Lock, User, AlertCircle } from 'lucide-react'
import { login, isAuthenticated } from '@/lib/auth'

const MAX_ATTEMPTS = 5
const LOCKOUT_SECONDS = 30

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [lockoutSeconds, setLockoutSeconds] = useState(0)
  const lockoutRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated()) {
      router.replace('/admin/blog')
    }
  }, [router])

  // Cleanup lockout interval on unmount
  useEffect(() => () => {
    if (lockoutRef.current) clearInterval(lockoutRef.current)
  }, [])

  const startLockout = () => {
    setLockoutSeconds(LOCKOUT_SECONDS)
    lockoutRef.current = setInterval(() => {
      setLockoutSeconds((s) => {
        if (s <= 1) {
          if (lockoutRef.current) clearInterval(lockoutRef.current)
          setAttempts(0)
          return 0
        }
        return s - 1
      })
    }, 1000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (lockoutSeconds > 0) return
    setError('')
    setLoading(true)

    // Simulate network delay for UX feedback
    await new Promise((r) => setTimeout(r, 600))

    const ok = login(username.trim(), password)
    if (ok) {
      router.push('/admin/blog')
    } else {
      const newAttempts = attempts + 1
      setAttempts(newAttempts)
      if (newAttempts >= MAX_ATTEMPTS) {
        setError(`Terlalu banyak percobaan. Coba lagi dalam ${LOCKOUT_SECONDS} detik.`)
        startLockout()
      } else {
        setError(`Username atau password salah. (${newAttempts}/${MAX_ATTEMPTS} percobaan)`)
      }
      setLoading(false)
    }
  }

  const isLocked = lockoutSeconds > 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-700 via-blue-800 to-accent flex items-center justify-center px-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl px-8 pt-10 pb-8">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-primary-700 rounded-xl flex items-center justify-center mb-4 shadow-lg">
              <svg viewBox="0 0 40 40" className="w-10 h-10 fill-white">
                <polygon points="20,4 36,34 4,34" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
            <p className="text-sm text-gray-500 mt-1">Delta Indonesia Group</p>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-5 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5" id="admin-login-form">
            <div>
              <label htmlFor="admin-username" className="block text-sm font-medium text-gray-700 mb-1.5">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="admin-username"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="admin-password" className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="admin-password"
                  type={showPass ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  tabIndex={-1}
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              id="admin-login-submit"
              type="submit"
              disabled={loading || isLocked}
              className="w-full bg-accent text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Masuk...
                </>
              ) : isLocked ? `Tunggu ${lockoutSeconds}s...` : 'Masuk ke Dashboard'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-xs text-gray-400 hover:text-accent transition-colors">
              ← Kembali ke Website
            </Link>
          </div>
        </div>

        <p className="text-center text-white/50 text-xs mt-6">
          © 2026 PT. Delta Indonesia Group
        </p>
      </div>
    </div>
  )
}
