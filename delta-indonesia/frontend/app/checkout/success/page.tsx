'use client'
import React, { useEffect, useState, useRef, useCallback, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle2, Clock, AlertCircle, MessageCircle, Loader2 } from 'lucide-react'
import api from '@/lib/api'
import Link from 'next/link'

type Status = 'loading' | 'pending' | 'paid' | 'expired' | 'failed' | 'error'

interface StatusData {
  invoice_number: string
  amount: string
  status: string
  paid_at: string | null
  course_title: string | null
  whatsapp_link: string | null
}

function formatIDR(amount: string | number): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num)
}

function CheckoutSuccessContent() {
  const searchParams = useSearchParams()
  const invoiceNumber = searchParams?.get('invoice_number') ?? ''

  const [status, setStatus] = useState<Status>('loading')
  const [data, setData] = useState<StatusData | null>(null)
  const retriesRef = useRef(0)
  const maxRetries = 20
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const pollStatus = useCallback(async () => {
    if (!invoiceNumber) {
      setStatus('error')
      return
    }

    try {
      const res = await api.get(`/transactions/status/${invoiceNumber}`)
      const result: StatusData = res.data
      setData(result)

      if (result.status === 'paid') {
        setStatus('paid')
        if (intervalRef.current) clearInterval(intervalRef.current)
      } else if (result.status === 'expired') {
        setStatus('expired')
        if (intervalRef.current) clearInterval(intervalRef.current)
      } else if (result.status === 'failed') {
        setStatus('failed')
        if (intervalRef.current) clearInterval(intervalRef.current)
      } else {
        // Still pending
        retriesRef.current += 1
        if (retriesRef.current >= maxRetries) {
          setStatus('pending')
          if (intervalRef.current) clearInterval(intervalRef.current)
        } else {
          setStatus('pending')
        }
      }
    } catch {
      setStatus('error')
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [invoiceNumber])

  useEffect(() => {
    if (!invoiceNumber) {
      setStatus('error')
      return
    }

    // Initial check
    pollStatus()

    // Poll every 3 seconds
    intervalRef.current = setInterval(pollStatus, 3000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [invoiceNumber, pollStatus])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Success Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Status Banner */}
          <div className={`py-8 px-6 text-center ${
            status === 'paid' ? 'bg-gradient-to-br from-emerald-500 to-emerald-600' :
            status === 'expired' || status === 'failed' ? 'bg-gradient-to-br from-red-500 to-red-600' :
            status === 'error' ? 'bg-gradient-to-br from-gray-500 to-gray-600' :
            'bg-gradient-to-br from-amber-500 to-amber-600'
          } text-white`}>
            {status === 'paid' && (
              <>
                <CheckCircle2 className="w-14 h-14 mx-auto mb-3 animate-bounce" />
                <h1 className="text-xl font-bold">Pembayaran Berhasil!</h1>
                <p className="text-white/80 text-sm mt-1">Terima kasih telah mendaftar.</p>
              </>
            )}
            {status === 'pending' && (
              <>
                <Clock className="w-14 h-14 mx-auto mb-3" />
                <h1 className="text-xl font-bold">Menunggu Pembayaran</h1>
                <p className="text-white/80 text-sm mt-1">Silakan selesaikan pembayaran Anda.</p>
              </>
            )}
            {status === 'loading' && (
              <>
                <Loader2 className="w-14 h-14 mx-auto mb-3 animate-spin" />
                <h1 className="text-xl font-bold">Memverifikasi...</h1>
                <p className="text-white/80 text-sm mt-1">Mengecek status pembayaran Anda.</p>
              </>
            )}
            {(status === 'expired' || status === 'failed') && (
              <>
                <AlertCircle className="w-14 h-14 mx-auto mb-3" />
                <h1 className="text-xl font-bold">
                  {status === 'expired' ? 'Pembayaran Kedaluwarsa' : 'Pembayaran Gagal'}
                </h1>
                <p className="text-white/80 text-sm mt-1">Silakan coba daftar kembali.</p>
              </>
            )}
            {status === 'error' && (
              <>
                <AlertCircle className="w-14 h-14 mx-auto mb-3" />
                <h1 className="text-xl font-bold">Terjadi Kesalahan</h1>
                <p className="text-white/80 text-sm mt-1">Tidak dapat memverifikasi pembayaran.</p>
              </>
            )}
          </div>

          {/* Details */}
          <div className="p-6 space-y-4">
            {data && (
              <>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">No. Invoice</span>
                  <span className="font-mono font-medium text-gray-900">{data.invoice_number}</span>
                </div>
                {data.course_title && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Kursus</span>
                    <span className="font-medium text-gray-900 text-right max-w-[200px]">{data.course_title}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Jumlah</span>
                  <span className="font-bold text-gray-900">{formatIDR(data.amount)}</span>
                </div>
                {data.paid_at && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Dibayar pada</span>
                    <span className="text-gray-900">{new Date(data.paid_at).toLocaleString('id-ID')}</span>
                  </div>
                )}
                <hr className="border-gray-100" />
              </>
            )}

            {/* WhatsApp CTA */}
            {status === 'paid' && data?.whatsapp_link && (
              <a
                id="wa-group-btn"
                href={data.whatsapp_link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-emerald-500 text-white py-3 rounded-lg font-semibold text-sm hover:bg-emerald-600 transition"
              >
                <MessageCircle className="w-5 h-5" />
                Gabung Grup WhatsApp
              </a>
            )}

            {status === 'paid' && !data?.whatsapp_link && (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                <MessageCircle className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <p className="text-sm text-purple-700 font-medium">
                  Pembayaran berhasil!
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  PIC kami sedang memproses link WhatsApp Anda. Halaman ini akan terupdate otomatis, atau Anda akan dihubungi langsung.
                </p>
              </div>
            )}

            {(status === 'pending' || status === 'loading') && (
              <div className="flex items-center gap-2 justify-center text-sm text-amber-600">
                <Loader2 className="w-4 h-4 animate-spin" />
                Mengecek status pembayaran...
              </div>
            )}

            <Link
              href="/courses"
              className="block text-center text-sm text-primary-700 font-medium hover:underline mt-2"
            >
              ← Kembali ke Daftar Kursus
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="flex items-center gap-2 justify-center text-sm text-primary-700 font-medium">
          <Loader2 className="w-6 h-6 animate-spin" />
          Memuat halaman...
        </div>
      </div>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  )
}
