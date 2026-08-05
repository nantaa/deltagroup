import React from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface Crumb { label: string; href?: string }

export default function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
      <nav className="flex items-center gap-1.5 text-sm text-gray-500">
        <Link href="/" className="hover:text-accent transition-colors">Beranda</Link>
        {crumbs.map((c, i) => (
          <React.Fragment key={i}>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            {c.href ? (
              <Link href={c.href} className="hover:text-accent transition-colors">{c.label}</Link>
            ) : (
              <span className="font-semibold text-gray-800">{c.label}</span>
            )}
          </React.Fragment>
        ))}
      </nav>
    </div>
  )
}
