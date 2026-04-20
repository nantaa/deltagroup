'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { isAuthenticated, logout } from '@/lib/auth'
import {
  LayoutDashboard,
  FileText,
  LogOut,
  ChevronRight,
  Megaphone,
} from 'lucide-react'
import clsx from 'clsx'

const navLinks = [
  { label: 'Blog Management', href: '/admin/blog',    icon: FileText      },
  { label: 'TopBar Settings', href: '/admin/topbar',  icon: Megaphone     },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router   = useRouter()
  const pathname = usePathname()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    // Skip auth check on login page
    if (pathname === '/admin/login') { setChecked(true); return }
    if (!isAuthenticated()) {
      router.replace('/admin/login')
    } else {
      setChecked(true)
    }
  }, [pathname, router])

  // Don't render admin chrome on the login page
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  if (!checked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin w-8 h-8 border-4 border-accent border-t-transparent rounded-full" />
      </div>
    )
  }

  const handleLogout = () => {
    logout()
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-gray-200 flex flex-col shrink-0">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-primary-700 rounded-lg flex items-center justify-center shrink-0">
              <svg viewBox="0 0 40 40" className="w-6 h-6 fill-white">
                <polygon points="20,4 36,34 4,34" />
              </svg>
            </div>
            <div>
              <p className="text-primary-700 font-bold text-xs leading-tight">DELTA INDONESIA</p>
              <p className="text-gray-400 text-[10px]">Admin Panel</p>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold px-2 mb-3">
            Management
          </p>
          {navLinks.map(({ label, href, icon: Icon }) => {
            const active = pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className={clsx(
                  'flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group',
                  active
                    ? 'bg-accent text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {label}
                {active && <ChevronRight className="w-3.5 h-3.5 ml-auto" />}
              </Link>
            )
          })}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t border-gray-100 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-all"
          >
            <LayoutDashboard className="w-4 h-4" />
            View Website
          </Link>
          <button
            id="admin-logout-btn"
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
