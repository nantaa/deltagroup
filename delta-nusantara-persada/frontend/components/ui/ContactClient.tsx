'use client'
import React from 'react'
import {
  Phone, Mail, MapPin, Clock, MessageCircle,
  Building2, ExternalLink,
} from 'lucide-react'
import { useLang, translations } from '@/lib/LanguageContext'

const REPRESENTATIVE_OFFICES = [
  'Karawang', 'Purwokerto', 'Surabaya', 'Gresik',
  'Pelalawan', 'Pekanbaru', 'Medan', 'Balikpapan',
]

export default function ContactClient() {
  const { lang, t } = useLang()

  return (
    <>
      {/* Page Hero */}
      <header className="bg-dnp-navy text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-dnp-cyan text-xs font-bold uppercase tracking-widest mb-2">
            {t('contactPage', 'hero', 'eyebrow')}
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">
            {t('contactPage', 'hero', 'title')}
          </h1>
          <p className="text-gray-300 text-sm max-w-2xl">
            {t('contactPage', 'hero', 'subtitle')}
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-14">
        {/* Primary contact cards */}
        <section>
          <h2 className="text-lg font-bold text-dnp-navy mb-6">
            {t('contactPage', 'howToContact')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* WhatsApp */}
            <div className="flex flex-col items-center text-center gap-4 p-8 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-300 text-gray-700 relative overflow-hidden">
              <span className="absolute top-3 right-3 bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {t('contactPage', 'comingSoon')}
              </span>
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <MessageCircle className="w-7 h-7" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">WhatsApp Business</p>
                <p className="text-base font-bold text-dnp-navy">Kanal Chat Resmi</p>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                  {t('contactPage', 'waDesc')}
                </p>
              </div>
            </div>

            {/* Phone */}
            <a
              href="tel:+622188869010"
              className="group flex flex-col items-center text-center gap-4 p-8 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
            >
              <div className="w-14 h-14 rounded-2xl bg-dnp-navy text-dnp-cyan flex items-center justify-center">
                <Phone className="w-7 h-7" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                  {t('contactPage', 'phoneLabel')}
                </p>
                <p className="text-lg font-extrabold text-dnp-navy">(021) 88869010</p>
                <p className="text-xs text-gray-400 mt-1">(021) 88869021</p>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:marketing@deltanusa.co.id"
              className="group flex flex-col items-center text-center gap-4 p-8 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
            >
              <div className="w-14 h-14 rounded-2xl bg-dnp-navy text-dnp-cyan flex items-center justify-center">
                <Mail className="w-7 h-7" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                  {t('contactPage', 'emailLabel')}
                </p>
                <p className="text-base font-extrabold text-dnp-navy">marketing@deltanusa.co.id</p>
                <p className="text-xs text-gray-400 mt-1">
                  {t('contactPage', 'emailResponse')}
                </p>
              </div>
            </a>
          </div>
        </section>

        {/* Office info + hours */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Head office */}
          <div className="bg-white border border-gray-200 rounded-2xl p-7 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-dnp-navy text-dnp-cyan flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <h2 className="font-bold text-dnp-navy">
                {t('contactPage', 'headOffice')}
              </h2>
            </div>
            <address className="not-italic text-sm text-gray-600 leading-relaxed mb-4">
              Komplek Suncity Square Blok H–20<br />
              Jl. M. Hasibuan, Margajaya<br />
              Bekasi, Jawa Barat
            </address>
            <a
              href="https://maps.google.com/?q=Suncity+Square+Blok+H-20+Jl+M+Hasibuan+Bekasi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-dnp-teal hover:text-dnp-navy transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              {t('contactPage', 'mapsLink')}
            </a>
          </div>

          {/* Operating hours */}
          <div className="bg-white border border-gray-200 rounded-2xl p-7 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-dnp-navy text-dnp-cyan flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <h2 className="font-bold text-dnp-navy">
                {t('contactPage', 'hoursTitle')}
              </h2>
            </div>
            <table className="text-sm text-gray-600 w-full">
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2.5 font-medium text-gray-700">
                    {t('contactPage', 'monFri')}
                  </td>
                  <td className="py-2.5 text-right font-bold text-dnp-navy">08.00 – 17.00 WIB</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2.5 font-medium text-gray-700">
                    {t('contactPage', 'sat')}
                  </td>
                  <td className="py-2.5 text-right font-bold text-dnp-navy">08.00 – 17.00 WIB</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-medium text-gray-400">
                    {t('contactPage', 'sunHolidays')}
                  </td>
                  <td className="py-2.5 text-right text-gray-400">
                    {t('contactPage', 'closed')}
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="text-xs text-gray-400 mt-4">
              {t('contactPage', 'hoursNote')}
            </p>
          </div>
        </section>

        {/* Representative offices */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="w-5 h-5 text-dnp-teal" />
            <h2 className="text-lg font-bold text-dnp-navy">
              {t('contactPage', 'repOfficesTitle')}
            </h2>
          </div>
          <p className="text-sm text-gray-500 mb-5">
            {t('contactPage', 'repOfficesDesc')}
          </p>
          <div className="flex flex-wrap gap-3">
            {REPRESENTATIVE_OFFICES.map((city) => (
              <span
                key={city}
                className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 text-gray-700 text-sm font-semibold px-4 py-2 rounded-full"
              >
                <MapPin className="w-3.5 h-3.5 text-dnp-teal" />
                {city}
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-4">
            {t('contactPage', 'repOfficesNote')}
          </p>
        </section>
      </main>
    </>
  )
}
