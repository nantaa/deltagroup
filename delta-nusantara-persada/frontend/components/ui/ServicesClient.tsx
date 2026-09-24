'use client'
import React from 'react'
import Link from 'next/link'
import {
  Truck, Flame, Cpu, ShieldAlert, Zap, Cog,
  CheckCircle2, ArrowRight, FileText, MessageCircle,
} from 'lucide-react'
import { useLang, translations } from '@/lib/LanguageContext'

interface ServiceItem {
  id: string
  icon: React.ComponentType<{ className?: string }>
  title: { ID: string; EN: string }
  tagline: { ID: string; EN: string }
  legal: string
  description: { ID: string; EN: string }
  items: {
    name: { ID: string; EN: string }
    detail: { ID: string; EN: string }
  }[]
  document: { ID: string; EN: string }
  color: string
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'pesawat-angkat-angkut',
    icon: Truck,
    title: {
      ID: 'Pesawat Angkat & Pesawat Angkut',
      EN: 'Lifting & Conveying Equipment',
    },
    tagline: {
      ID: 'Riksa Uji Pesawat Angkat',
      EN: 'Lifting Equipment Inspection',
    },
    legal: 'Permenaker No. 8 Tahun 2020',
    description: {
      ID: 'Pemeriksaan visual, uji tidak merusak (NDT), dan uji beban statis-dinamis pada seluruh jenis pesawat angkat dan angkut industri untuk memastikan kelaikan operasi sesuai regulasi Kemnaker RI.',
      EN: 'Visual inspection, non-destructive testing (NDT), and static/dynamic load testing on all types of industrial lifting and conveying machinery to guarantee statutory operational fitness.',
    },
    items: [
      {
        name: { ID: 'Hoist Crane & Overhead Crane', EN: 'Hoist Crane & Overhead Crane' },
        detail: {
          ID: 'Pemeriksaan struktural, uji NDT, dan uji beban statis-dinamis. Penerbitan Surat Keterangan Layak Operasi (SKLO).',
          EN: 'Structural inspection, NDT, and load testing with issuance of Operational Fitness Certificate (SKLO).',
        },
      },
      {
        name: { ID: 'Alat Bantu Angkat', EN: 'Lifting Tackles & Rigging Gear' },
        detail: {
          ID: 'Shackle, sling, spreader bar — inspeksi visual dan uji beban sebelum digunakan di lapangan.',
          EN: 'Shackles, wire slings, and spreader bars — thorough visual audits and load tests before deployment.',
        },
      },
      {
        name: { ID: 'Chain Conveyor & Belt Conveyor', EN: 'Chain & Belt Conveyors' },
        detail: {
          ID: 'Pengujian sistem penggerak, pengaman, dan kelistrikan. Memastikan perpindahan material berjalan aman tanpa risiko terjepit atau kegagalan struktur.',
          EN: 'Drive systems, safety guards, and electrical controls audit to ensure safe material handling.',
        },
      },
      {
        name: { ID: 'Forklift & Alat Berat', EN: 'Forklifts & Heavy Equipment' },
        detail: {
          ID: 'Pemeriksaan menyeluruh: rem, hidrolik, struktur, hingga uji beban. Penerbitan surat keterangan layak operasi.',
          EN: 'Comprehensive inspection: brakes, hydraulics, chassis integrity, and load capability tests.',
        },
      },
    ],
    document: {
      ID: 'Surat Keterangan Layak Operasi (SKLO) / SIO',
      EN: 'Statutory Certificate of Fitness (SKLO) / Operator License',
    },
    color: 'dnp-teal',
  },
  {
    id: 'pubt',
    icon: Flame,
    title: {
      ID: 'Pesawat Uap & Bejana Tekan (PUBT)',
      EN: 'Steam Boilers & Pressure Vessels (PUBT)',
    },
    tagline: {
      ID: 'Riksa Uji Pesawat Uap',
      EN: 'Boiler & Pressure Vessel Audit',
    },
    legal: 'UU Uap 1930 & Permenaker No. 37/2016',
    description: {
      ID: 'Pengujian tekanan, uji hidrostatik, pengukuran ketebalan pelat, dan verifikasi seluruh sistem pengaman pada pesawat uap dan bejana tekan sesuai standar nasional dan praktik internasional (API 653).',
      EN: 'Hydrostatic pressure testing, ultrasonic wall thickness measurement, and safety valve verification compliant with statutory codes and API 653 standards.',
    },
    items: [
      {
        name: { ID: 'Boiler & Thermal Oil Heater', EN: 'Boilers & Thermal Oil Heaters' },
        detail: {
          ID: 'Uji hidrostatik, pengukuran ketebalan pelat dengan UT, verifikasi katup pengaman (safety valve) dan seluruh fitting.',
          EN: 'Hydrostatic tests, ultrasonic thickness surveys, and safety valve pop-off pressure calibrations.',
        },
      },
      {
        name: { ID: 'Tangki Timbun Bahan Cair', EN: 'Liquid Storage Tanks' },
        detail: {
          ID: 'Pemeriksaan korosi, ketebalan dinding, sistem venting, dan pembumian. Mengacu pada praktik inspeksi API 653.',
          EN: 'Corrosion assessment, shell thickness gauging, venting, and earthing compliance based on API 653.',
        },
      },
      {
        name: { ID: 'Bejana Tekan (Pressure Vessel)', EN: 'Pressure Vessels & Gas Cylinders' },
        detail: {
          ID: 'Air receiver, tabung gas, dan pressure vessel — uji kekuatan dan kelengkapan pengaman agar tekanan kerja tetap dalam batas aman.',
          EN: 'Air receivers and compressed gas vessels — burst threshold and safety relief valve integrity testing.',
        },
      },
    ],
    document: {
      ID: 'Sertifikat Layak Operasi (SLO) Boiler / Bejana Tekan',
      EN: 'Statutory Operational Fitness Certificate (SLO)',
    },
    color: 'orange-500',
  },
  {
    id: 'elevator-eskalator',
    icon: Cpu,
    title: {
      ID: 'Elevator & Eskalator',
      EN: 'Elevators & Escalators',
    },
    tagline: {
      ID: 'Riksa Uji Elevator',
      EN: 'Vertical Mobility Inspection',
    },
    legal: 'Permenaker No. 6 Tahun 2017',
    description: {
      ID: 'Uji fungsi lengkap pada sistem rem, governor, safety gear, dan interlock pintu, dilengkapi uji beban penuh untuk memastikan keamanan penumpang dan barang.',
      EN: 'Full functional safety tests on braking systems, overspeed governors, safety gears, and landing door interlocks with full load trials.',
    },
    items: [
      {
        name: { ID: 'Elevator Penumpang & Cargo', EN: 'Passenger & Freight Elevators' },
        detail: {
          ID: 'Uji rem, governor, safety gear, interlock pintu, dan buffer. Uji beban 110% dari kapasitas nominal.',
          EN: 'Governor trip speed, safety gear grip, door interlocks, and 110% rated overload verification.',
        },
      },
      {
        name: { ID: 'Dumbwaiter', EN: 'Dumbwaiters & Service Lifts' },
        detail: {
          ID: 'Pemeriksaan fungsi mekanik, kelistrikan, dan pengaman darurat pada lift barang skala kecil.',
          EN: 'Mechanical, electrical, and emergency stop audit for commercial service lifts.',
        },
      },
      {
        name: { ID: 'Eskalator & Travelator', EN: 'Escalators & Moving Walks' },
        detail: {
          ID: 'Pemeriksaan anak tangga, handrail, comb plate, dan perangkat penghenti darurat di area publik berlalu-lintas padat.',
          EN: 'Step chains, handrails, comb plates, and emergency stop switches in high-traffic commercial environments.',
        },
      },
    ],
    document: {
      ID: 'Sertifikat Laik Fungsi (SLF) Elevator / Eskalator',
      EN: 'Certificate of Functional Fitness (SLF)',
    },
    color: 'blue-500',
  },
  {
    id: 'proteksi-kebakaran',
    icon: ShieldAlert,
    title: {
      ID: 'Instalasi Proteksi Kebakaran',
      EN: 'Fire Protection Systems',
    },
    tagline: {
      ID: 'Riksa Uji Proteksi Kebakaran',
      EN: 'Fire Protection Testing',
    },
    legal: 'Kepmenaker No. Kep.186/MEN/1999 & Permenakertrans No. Per.04/MEN/1980',
    description: {
      ID: 'Verifikasi dan pengujian menyeluruh pada seluruh sistem proteksi kebakaran — dari deteksi dini, pemadaman otomatis, hingga jalur evakuasi — agar berfungsi andal saat darurat.',
      EN: 'Comprehensive audits and flow tests across all fire protection layers — early detection, automatic suppression, and emergency egress.',
    },
    items: [
      {
        name: { ID: 'Sistem Hydrant', EN: 'Hydrant Systems' },
        detail: {
          ID: 'Uji tekanan dan debit air pada pompa jockey, main pump, pilar, dan box hydrant. Verifikasi volume tangki penampung.',
          EN: 'Pressure and discharge flow rate testing across jockey pumps, main engines, hydrants, and reservoirs.',
        },
      },
      {
        name: { ID: 'Fire Alarm Automatik', EN: 'Automatic Fire Alarm Networks' },
        detail: {
          ID: 'Pengujian detektor (asap, panas, nyala api), panel kontrol, notifikasi audio-visual per zona.',
          EN: 'Smoke, heat, and flame detector audits, master control panel checks, and zone alarm verification.',
        },
      },
      {
        name: { ID: 'Sprinkler System', EN: 'Automatic Sprinkler Systems' },
        detail: {
          ID: 'Pemeriksaan kepala sprinkler, jaringan pemipaan, dan katup kendali (flow switch, tamper switch).',
          EN: 'Sprinkler head condition, main riser pipe network, flow switches, and tamper valves testing.',
        },
      },
      {
        name: { ID: 'Clean Agent Fire Suppression', EN: 'Clean Agent Suppression (FM-200/NOVEC)' },
        detail: {
          ID: 'Verifikasi tekanan tabung gas (FM-200, CO2, NOVEC), nozzle, interlock dengan panel alarm dan sistem HVAC.',
          EN: 'Pressure gauge audits, discharge nozzles, and automated HVAC shutdown interlock validation.',
        },
      },
    ],
    document: {
      ID: 'Berita Acara Riksa Uji Proteksi Kebakaran',
      EN: 'Official Fire Protection Inspection Report & Certificate',
    },
    color: 'red-500',
  },
  {
    id: 'listrik-petir',
    icon: Zap,
    title: {
      ID: 'Instalasi Listrik & Penyalur Petir',
      EN: 'Electrical & Lightning Protection Systems',
    },
    tagline: {
      ID: 'Riksa Uji Instalasi Listrik',
      EN: 'Electrical & Lightning Safety Audit',
    },
    legal: 'Permenaker No. 12/2015 jo. No. 33/2015 & Permenaker No. 31/2015',
    description: {
      ID: 'Pengukuran dan verifikasi instalasi kelistrikan sesuai PUIL, mencegah kebakaran listrik dan gangguan produksi. Pengukuran tahanan pembumian penyalur petir memastikan sambaran tersalurkan aman ke tanah.',
      EN: 'Measurement and compliance verification against national PUIL codes to prevent electrical fires and power outages. Grounding resistance audits ensure safe dissipation.',
    },
    items: [
      {
        name: { ID: 'Instalasi Listrik Gedung & Industri', EN: 'Industrial & Building Electrical Systems' },
        detail: {
          ID: 'Pengukuran tahanan isolasi, grounding, keseimbangan beban, dan thermography scan panel. Sesuai PUIL 2011.',
          EN: 'Insulation resistance, phase balancing, and infrared thermography scans compliant with PUIL.',
        },
      },
      {
        name: { ID: 'Thermography Panel Listrik', EN: 'Panel Infrared Thermography' },
        detail: {
          ID: 'Deteksi titik panas (hot spot) pada panel MDP, SDP, dan MCB menggunakan kamera inframerah untuk pencegahan kebakaran.',
          EN: 'Hot-spot thermal imaging on MDP, SDP, and breaker panels for early fire hazard mitigation.',
        },
      },
      {
        name: { ID: 'Instalasi Penyalur Petir', EN: 'Lightning Protection & Grounding' },
        detail: {
          ID: 'Pemeriksaan terminal udara (air terminal), konduktor penyalur, dan pengukuran tahanan pembumian (earth resistance).',
          EN: 'Air terminal integrity, down-conductors, and precision earth resistance ohmic testing (< 5 Ohm).',
        },
      },
    ],
    document: {
      ID: 'Sertifikat Layak Operasi Instalasi Listrik / Penyalur Petir',
      EN: 'Certificate of Operational Fitness (SLO) for Electrical / Lightning Systems',
    },
    color: 'yellow-500',
  },
  {
    id: 'pesawat-tenaga-produksi',
    icon: Cog,
    title: {
      ID: 'Pesawat Tenaga & Produksi',
      EN: 'Power & Production Machinery',
    },
    tagline: {
      ID: 'Riksa Uji Pesawat Tenaga',
      EN: 'Production Machinery Safety Audit',
    },
    legal: 'Permenaker No. 38 Tahun 2016',
    description: {
      ID: 'Pemeriksaan sistem pengaman, getaran, kebisingan, dan interlock pada seluruh mesin penggerak dan peralatan produksi agar operasi tetap stabil dan aman bagi operator.',
      EN: 'Safety devices, vibration, noise levels, and interlock testing across prime movers and production machinery for operational continuity.',
    },
    items: [
      {
        name: { ID: 'Penggerak Mula (Prime Mover)', EN: 'Prime Movers & Diesel Generators' },
        detail: {
          ID: 'Genset, diesel, dan motor bakar — pemeriksaan sistem pengaman, getaran, dan tingkat kebisingan.',
          EN: 'Generator sets, diesel engines — safety trips, vibration analysis, and decibel noise emission testing.',
        },
      },
      {
        name: { ID: 'Mesin Perkakas & Lini Produksi', EN: 'Machine Tools & Production Lines' },
        detail: {
          ID: 'Mesin bubut, press, CNC — uji fungsi pelindung mesin, tombol darurat, dan interlock.',
          EN: 'Lathes, stamping presses, CNC lines — machine guarding, emergency stops, and safety light curtains.',
        },
      },
      {
        name: { ID: 'Turbin Uap & Gas', EN: 'Steam & Gas Turbines' },
        detail: {
          ID: 'Pemeriksaan kondisi poros, bantalan, governor, dan sistem trip pengaman pada beban operasional penuh.',
          EN: 'Shaft run-out, bearings, governing valves, and overspeed trip tests under operational load.',
        },
      },
      {
        name: { ID: 'Transmisi Tenaga & Tanur', EN: 'Power Transmission & Industrial Furnaces' },
        detail: {
          ID: 'Poros transmisi, kopling, sabuk, dan roda gigi — pemeriksaan kelurusan, pelumasan, dan penutup pengaman. Tanur dan oven industri — sistem bahan bakar, ventilasi, pengaman suhu.',
          EN: 'Shafts, belts, couplings, and gears — alignment and guarding. Furnaces — burners, ventilation, and thermal limiters.',
        },
      },
    ],
    document: {
      ID: 'Surat Keterangan Layak Operasi (SKLO) Pesawat Tenaga',
      EN: 'Statutory Operational Fitness Certificate (SKLO)',
    },
    color: 'purple-500',
  },
]

const COLOR_MAP: Record<string, string> = {
  'dnp-teal': 'text-dnp-teal bg-cyan-50 border-cyan-100',
  'orange-500': 'text-orange-500 bg-orange-50 border-orange-100',
  'blue-500': 'text-blue-500 bg-blue-50 border-blue-100',
  'red-500': 'text-red-500 bg-red-50 border-red-100',
  'yellow-500': 'text-yellow-600 bg-yellow-50 border-yellow-100',
  'purple-500': 'text-purple-500 bg-purple-50 border-purple-100',
}
const ICON_MAP: Record<string, string> = {
  'dnp-teal': 'bg-dnp-navy text-dnp-cyan',
  'orange-500': 'bg-orange-500 text-white',
  'blue-500': 'bg-blue-500 text-white',
  'red-500': 'bg-red-500 text-white',
  'yellow-500': 'bg-yellow-500 text-white',
  'purple-500': 'bg-purple-500 text-white',
}

export default function ServicesClient() {
  const { lang, t } = useLang()

  return (
    <>
      {/* Page Hero */}
      <header className="bg-dnp-navy text-white py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-dnp-cyan text-xs font-bold uppercase tracking-widest mb-3">
            {t('servicesPage', 'hero', 'eyebrow')}
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 leading-tight">
            {t('servicesPage', 'hero', 'title')}
          </h1>
          <p className="text-gray-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            {t('servicesPage', 'hero', 'subtitle')}
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-dnp-cyan text-dnp-navy font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-full shadow-lg hover:bg-white transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              {t('servicesPage', 'hero', 'ctaConsult')}
            </Link>
          </div>
        </div>
      </header>

      {/* Services List */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {SERVICES_DATA.map((svc, idx) => {
          const Icon = svc.icon
          const tagColor = COLOR_MAP[svc.color] ?? COLOR_MAP['dnp-teal']
          const iconColor = ICON_MAP[svc.color] ?? ICON_MAP['dnp-teal']
          const isEven = idx % 2 === 0
          const titleText = svc.title[lang]
          const taglineText = svc.tagline[lang]
          const descriptionText = svc.description[lang]
          const documentText = svc.document[lang]

          return (
            <section key={svc.id} id={svc.id} className="scroll-mt-24">
              {/* Section header */}
              <div className={`flex flex-col lg:flex-row gap-8 items-start ${isEven ? '' : 'lg:flex-row-reverse'}`}>

                {/* Description block */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${iconColor}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{taglineText}</p>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-dnp-navy leading-tight">{titleText}</h2>
                    </div>
                  </div>

                  <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider border px-3 py-1 rounded-full mb-4 ${tagColor}`}>
                    <FileText className="w-3 h-3" />
                    {svc.legal}
                  </span>

                  <p className="text-gray-600 text-sm leading-relaxed mb-6">{descriptionText}</p>

                  {/* Document issued */}
                  <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 w-fit">
                    <FileText className="w-3.5 h-3.5 text-dnp-teal shrink-0" />
                    <span>{t('servicesPage', 'docIssued')} <strong className="text-gray-700">{documentText}</strong></span>
                  </div>

                  <Link
                    href={`/contact?service=${encodeURIComponent(titleText)}`}
                    className="inline-flex items-center gap-1.5 mt-5 text-xs font-bold text-dnp-teal hover:text-dnp-navy transition-colors"
                  >
                    {t('servicesPage', 'requestQuote')}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Sub-service cards */}
                <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {svc.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-2 mb-2">
                        <CheckCircle2 className="w-4 h-4 text-dnp-cyan shrink-0 mt-0.5" />
                        <h3 className="text-sm font-bold text-dnp-navy leading-snug">{item.name[lang]}</h3>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed pl-6">{item.detail[lang]}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider between services */}
              {idx < SERVICES_DATA.length - 1 && (
                <div className="mt-16 border-b border-gray-100" />
              )}
            </section>
          )
        })}
      </main>

      {/* CTA Strip */}
      <section className="bg-dnp-navy text-white py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
            {t('servicesPage', 'ctaStrip', 'title')}
          </h2>
          <p className="text-gray-300 text-sm mb-8 max-w-xl mx-auto">
            {t('servicesPage', 'ctaStrip', 'desc')}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-dnp-cyan text-dnp-navy font-bold text-sm px-8 py-3.5 rounded-full shadow-lg hover:bg-white transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              {t('servicesPage', 'ctaStrip', 'btnContact')}
            </Link>
            <a
              href="tel:+622188869010"
              className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-white/20 transition-all"
            >
              (021) 88869010
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
