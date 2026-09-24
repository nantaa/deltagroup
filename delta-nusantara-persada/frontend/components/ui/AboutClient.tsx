'use client'
import React from 'react'
import PageHero from '@/components/ui/PageHero'
import { CheckCircle2, UserCheck } from 'lucide-react'
import { useLang, translations } from '@/lib/LanguageContext'

const mitra = [
  { id: 1, name: 'LSP-PK Delta Indonesia', desc: { ID: 'Lembaga Sertifikasi Profesi', EN: 'Professional Certification Body' } },
  { id: 2, name: 'Delta Nusantara Persada', desc: { ID: 'Perusahaan Jasa K3 (PJK3) Riksa Uji', EN: 'Statutory Inspection & Testing PJK3' } },
  { id: 3, name: 'Biro Sertifikasi Indonesia', desc: { ID: 'Lembaga Sertifikasi Profesi', EN: 'Professional Certification Body' } },
  { id: 4, name: 'Delta Indonesia Pranenggar', desc: { ID: 'Mitra Pelatihan & Konsultasi K3', EN: 'HSE Training & Consultation Partner' } },
]

const LEADERSHIP_TEAM = [
  {
    role: { ID: 'Direktur Utama', EN: 'President Director' },
    name: 'Pranan Jaya Barus, ST',
    desc: { ID: 'Direktur Utama', EN: 'President Director' },
  },
  {
    role: { ID: 'Komisaris', EN: 'Commissioner' },
    name: 'S. Enggarwati, SE., MBA',
    desc: { ID: 'Komisaris Perusahaan', EN: 'Company Commissioner' },
  },
  {
    role: { ID: 'Direktur', EN: 'Director' },
    name: 'Terzha R. Perdanawan, SE',
    desc: { ID: 'Direktur Operasional & Kemitraan', EN: 'Director of Operations & Partnerships' },
  },
  {
    role: { ID: 'Manager Operasional', EN: 'Operations Manager' },
    name: 'Deka P. Rudianto, SE., MM.',
    desc: { ID: 'Manajer Operasional Riksa Uji', EN: 'Inspection Operations Manager' },
  },
  {
    role: { ID: 'Manager Adm. & Keuangan', EN: 'Finance & Admin Manager' },
    name: 'Sri Purnomo',
    desc: { ID: 'Manajer Administrasi & Keuangan', EN: 'Finance & Administrative Manager' },
  },
  {
    role: { ID: 'Kadiv Riksa Uji', EN: 'Head of Inspection & Testing' },
    name: 'Drs. H. Supriyadi, MM',
    desc: { ID: 'Kepala Divisi Pemeriksaan & Pengujian', EN: 'Head of Statutory Inspection Division' },
  },
]

export default function AboutClient() {
  const { lang, t } = useLang()
  const policies = translations.aboutPage.policies[lang]
  const pillarLabel = translations.aboutPage.pillarPrefix[lang]

  return (
    <>
      <PageHero
        title={t('aboutPage', 'hero', 'title')}
        subtitle={t('aboutPage', 'hero', 'subtitle')}
      />

      {/* About Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-l-4 border-accent pl-5 mb-6">
          <h2 className="text-lg font-bold text-primary-700 uppercase tracking-wide">
            {t('aboutPage', 'companyName')}
          </h2>
        </div>
        <div className="max-w-3xl text-sm text-gray-700 leading-relaxed space-y-3">
          <p>{t('aboutPage', 'p1')}</p>
          <p>{t('aboutPage', 'p2')}</p>
          <p>{t('aboutPage', 'p3')}</p>
        </div>
      </section>

      {/* Kebijakan Mutu Section (Anchored for footer link) */}
      <section id="kebijakan-mutu" className="py-16 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-l-4 border-accent pl-5 mb-6">
            <h2 className="text-xl font-bold text-primary-700 uppercase tracking-wide">
              {t('aboutPage', 'qualityTitle')}
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              {t('aboutPage', 'qualitySubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {policies.map((policy, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-start gap-3.5 hover:border-primary-700/40 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-primary-50 text-primary-700 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-primary-700" />
                </div>
                <div>
                  <span className="text-xs font-bold text-primary-700 uppercase tracking-wider block mb-0.5">
                    {pillarLabel} 0{idx + 1}
                  </span>
                  <p className="text-sm text-gray-700 leading-relaxed font-medium">{policy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Struktur Organisasi Section (Anchored for footer link) */}
      <section id="struktur-organisasi" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-l-4 border-accent pl-5 mb-6">
          <h2 className="text-xl font-bold text-primary-700 uppercase tracking-wide">
            {t('aboutPage', 'leadershipTitle')}
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            {t('aboutPage', 'leadershipSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {LEADERSHIP_TEAM.map((member, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-md hover:border-primary-700/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-700 flex items-center justify-center mb-4 group-hover:bg-primary-700 group-hover:text-white transition-colors">
                <UserCheck className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold text-accent uppercase tracking-wider mb-1">
                {member.role[lang]}
              </p>
              <h3 className="text-base font-bold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-xs text-gray-500">{member.desc[lang]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mitra Section */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-100">
        <div className="border-l-4 border-accent pl-5 mb-3">
          <h2 className="text-lg font-bold text-primary-700 uppercase tracking-wide">
            {t('aboutPage', 'partnersTitle')}
          </h2>
        </div>
        <p className="text-sm text-gray-600 mb-8 max-w-2xl">
          {t('aboutPage', 'partnersSubtitle')}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {mitra.map((m) => (
            <div
              key={m.id}
              className="border border-gray-200 rounded-xl p-6 flex items-center gap-4 hover:shadow-sm transition-shadow"
            >
              <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                <svg viewBox="0 0 40 40" className="w-9 h-9 fill-primary-700" aria-hidden="true">
                  <polygon points="20,4 36,34 4,34" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-primary-700 leading-tight">{m.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{m.desc[lang]}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
