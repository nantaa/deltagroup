'use client'
import React, { useEffect, useState } from 'react'
import { Search, Users, CheckCircle2, Clock, AlertCircle, Send, Loader2, ExternalLink } from 'lucide-react'
import api from '@/lib/api'

interface Registration {
  id: number
  name: string
  email: string
  whatsapp_number: string
  company_name: string | null
  status: string
  whatsapp_invite_link: string | null
  whatsapp_link: string | null  // computed accessor from backend
  created_at: string
  course: { id: number; title: string; slug: string } | null
  transaction: {
    invoice_number: string
    amount: string
    status: string
    paid_at: string | null
  } | null
}

function formatIDR(amount: string | number): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num)
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    paid: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
    expired: 'bg-red-50 text-red-600 border-red-200',
    failed: 'bg-red-50 text-red-600 border-red-200',
  }
  const icons: Record<string, React.ReactNode> = {
    paid: <CheckCircle2 className="w-3 h-3" />,
    completed: <CheckCircle2 className="w-3 h-3" />,
    pending: <Clock className="w-3 h-3" />,
    expired: <AlertCircle className="w-3 h-3" />,
    failed: <AlertCircle className="w-3 h-3" />,
  }
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium border rounded-full ${styles[status] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
      {icons[status]} {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

export default function AdminRegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [linkInput, setLinkInput] = useState('')
  const [savingId, setSavingId] = useState<number | null>(null)

  const loadRegistrations = async (query = '') => {
    setLoading(true)
    try {
      const params: Record<string, string> = { limit: '50' }
      if (query) params.search = query
      const res = await api.get('/admin/registrations', { params })
      setRegistrations(res.data.data || [])
    } catch {
      setRegistrations([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadRegistrations() }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    loadRegistrations(search)
  }

  const startEditing = (reg: Registration) => {
    setEditingId(reg.id)
    setLinkInput(reg.whatsapp_invite_link || '')
  }

  const cancelEditing = () => {
    setEditingId(null)
    setLinkInput('')
  }

  const saveLink = async (id: number) => {
    setSavingId(id)
    try {
      await api.patch(`/admin/registrations/${id}/whatsapp-link`, {
        whatsapp_invite_link: linkInput,
      })
      // Update local state
      setRegistrations((prev) =>
        prev.map((r) => r.id === id ? { ...r, whatsapp_invite_link: linkInput, whatsapp_link: linkInput } : r)
      )
      setEditingId(null)
      setLinkInput('')
    } catch {
      alert('Gagal menyimpan link WhatsApp.')
    } finally {
      setSavingId(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-xl font-bold text-accent">Registrations</h1>
        <p className="text-xs text-gray-400 mt-0.5">Daftar pendaftar kursus dan status pembayaran</p>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search */}
        <form onSubmit={handleSearch} className="mb-6 flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              id="reg-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama, email, WhatsApp, atau perusahaan..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-accent/40 transition"
            />
          </div>
          <button type="submit" className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition">
            Cari
          </button>
        </form>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin w-6 h-6 border-4 border-accent border-t-transparent rounded-full" />
            </div>
          ) : registrations.length === 0 ? (
            <div className="text-center py-16">
              <Users className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">Belum ada pendaftar.</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Pendaftar</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Kursus</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Invoice</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-600">Payment</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 min-w-[280px]">WhatsApp Link</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Tanggal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {registrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-gray-50/50 transition-colors">
                    {/* Registrant Info */}
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{reg.name}</p>
                      <p className="text-xs text-gray-500">{reg.email}</p>
                      <p className="text-xs text-gray-400">{reg.whatsapp_number}</p>
                      {reg.company_name && (
                        <p className="text-xs text-gray-400 mt-0.5">🏢 {reg.company_name}</p>
                      )}
                    </td>

                    {/* Course */}
                    <td className="px-4 py-3">
                      <p className="text-gray-900 font-medium text-xs">{reg.course?.title || '-'}</p>
                    </td>

                    {/* Invoice */}
                    <td className="px-4 py-3">
                      <p className="font-mono text-xs text-gray-600">{reg.transaction?.invoice_number || '-'}</p>
                      {reg.transaction && (
                        <p className="text-xs font-semibold text-gray-900 mt-0.5">{formatIDR(reg.transaction.amount)}</p>
                      )}
                    </td>

                    {/* Payment Status */}
                    <td className="px-4 py-3 text-center">
                      <StatusBadge status={reg.transaction?.status || reg.status} />
                    </td>

                    {/* WhatsApp Link Assignment */}
                    <td className="px-4 py-3">
                      {editingId === reg.id ? (
                        <div className="flex items-center gap-1.5">
                          <input
                            id={`wa-link-input-${reg.id}`}
                            type="url"
                            value={linkInput}
                            onChange={(e) => setLinkInput(e.target.value)}
                            placeholder="https://chat.whatsapp.com/xxx"
                            className="flex-1 px-2.5 py-1.5 border border-gray-200 rounded text-xs focus:border-accent/40 outline-none"
                          />
                          <button
                            onClick={() => saveLink(reg.id)}
                            disabled={savingId === reg.id}
                            className="p-1.5 bg-accent text-white rounded hover:bg-purple-700 transition disabled:opacity-50"
                            title="Simpan"
                          >
                            {savingId === reg.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                          </button>
                          <button
                            onClick={cancelEditing}
                            className="p-1.5 text-gray-400 hover:text-gray-600 transition"
                            title="Batal"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          {reg.whatsapp_invite_link ? (
                            <a
                              href={reg.whatsapp_invite_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-emerald-600 hover:underline truncate max-w-[200px] inline-flex items-center gap-1"
                            >
                              <ExternalLink className="w-3 h-3 shrink-0" />
                              {reg.whatsapp_invite_link.replace('https://chat.whatsapp.com/', '...')}
                            </a>
                          ) : reg.whatsapp_link ? (
                            <span className="text-xs text-gray-400 italic">Default dari kursus</span>
                          ) : (
                            <span className="text-xs text-gray-300">—</span>
                          )}
                          <button
                            onClick={() => startEditing(reg)}
                            className="ml-auto text-xs text-accent hover:underline font-medium shrink-0"
                          >
                            {reg.whatsapp_invite_link ? 'Ubah' : 'Assign'}
                          </button>
                        </div>
                      )}
                    </td>

                    {/* Date */}
                    <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">
                      {new Date(reg.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric', month: 'short', year: 'numeric',
                      })}
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
