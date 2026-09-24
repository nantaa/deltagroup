'use client'
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Language = 'ID' | 'EN'

export const translations = {
  nav: {
    about: { ID: 'TENTANG KAMI', EN: 'ABOUT US' },
    brand: { ID: 'BRAND KAMI', EN: 'OUR BRANDS' },
    services: { ID: 'LAYANAN', EN: 'SERVICES' },
    whyChooseUs: { ID: 'KEUNGGULAN', EN: 'WHY US' },
    process: { ID: 'ALUR KERJA', EN: 'PROCESS' },
    team: { ID: 'TIM AHLI', EN: 'TEAM' },
    news: { ID: 'BERITA', EN: 'NEWS' },
    contact: { ID: 'HUBUNGI KAMI', EN: 'CONTACT US' },
    brandChildren: {
      pranenggar: { ID: 'Delta Indonesia Pranenggar', EN: 'Delta Indonesia Pranenggar' },
      nusa: { ID: 'Delta Nusantara Persada', EN: 'Delta Nusantara Persada' },
      bsi: { ID: 'Biro Sertifikasi Indonesia', EN: 'Biro Sertifikasi Indonesia' },
    },
  },
  hero: {
    eyebrow: { ID: 'INSPEKSI | KONSULTAN', EN: 'INSPECTION | CONSULTANT' },
    headline1: { ID: 'Membangun Kepercayaan Melalui Layanan', EN: 'Building Trust Through Professional' },
    headlineHighlight: { ID: 'Inspeksi', EN: 'Inspection' },
    headline2: { ID: 'Profesional', EN: 'Services' },
    subtitle: {
      ID: 'Kami memberikan layanan inspeksi dan konsultasi berstandar nasional & internasional untuk mendukung keselamatan, kualitas dan keberlanjutan industri anda',
      EN: 'We deliver inspection and consultation services to national & international standards to support the safety, quality and sustainability of your industry',
    },
    ctaContact: { ID: 'HUBUNGI KAMI', EN: 'CONTACT US' },
    ctaServices: { ID: 'PELAJARI LAYANAN', EN: 'EXPLORE SERVICES' },
  },
  topBar: {
    announcements: {
      ID: [
        'Dapatkan Suket/Sertifikat Laik Operasi (SLO)/Surat Lainnya — Info selengkapnya di deltanusa.co.id',
        'Pemeriksaan dan Pengujian Alat 2026 — Info selengkapnya di deltanusa.co.id',
        'Jadwalkan Riksa Uji Alat — Hubungi kami sekarang!',
        'PT. Delta Nusantara Persada melayani Riksa Uji Alat seluruh Indonesia',
      ],
      EN: [
        'Obtain your Operational Permit / Certificate of Fitness (SLO) — learn more at deltanusa.co.id',
        'Equipment Inspection & Testing 2026 — learn more at deltanusa.co.id',
        'Schedule a Statutory Inspection — Contact us now!',
        'PT. Delta Nusantara Persada serves nationwide statutory inspections across Indonesia',
      ],
    },
    badge: { ID: 'INFO K3', EN: 'K3 INFO' },
  },
  homeClient: {
    eyebrow: { ID: 'DIPERCAYA OLEH', EN: 'TRUSTED BY' },
    title: { ID: '200+ Perusahaan', EN: '200+ Companies' },
    subtitle: { ID: 'Di Seluruh Indonesia', EN: 'Across Indonesia' },
  },
  whyChooseUs: {
    eyebrow: { ID: 'KENAPA HARUS MEMILIH KAMI', EN: 'WHY CHOOSE US' },
    title: { ID: 'Komitmen Kami, Nilai Untuk Anda', EN: 'Our Commitment, Value For You' },
    pillars: {
      standar: {
        title: { ID: 'Standar Internasional', EN: 'International Standards' },
        desc: { ID: 'Ribuan Klien Puas Di Berbagai Industri', EN: 'Thousands of Satisfied Clients Across Industries' },
      },
      ahli: {
        title: { ID: 'Tenaga Ahli', EN: 'Expert Team' },
        desc: { ID: 'Ribuan Klien Puas Di Berbagai Industri', EN: 'Thousands of Satisfied Clients Across Industries' },
      },
      solusi: {
        title: { ID: 'Solusi Terintegrasi', EN: 'Integrated Solutions' },
        desc: { ID: 'Ribuan Klien Puas Di Berbagai Industri', EN: 'Thousands of Satisfied Clients Across Industries' },
      },
      kepuasan: {
        title: { ID: 'Kepuasan Klien', EN: 'Client Satisfaction' },
        desc: { ID: 'Ribuan Klien Puas Di Berbagai Industri', EN: 'Thousands of Satisfied Clients Across Industries' },
      },
    },
  },
  teamSection: {
    eyebrow: { ID: 'TIM KAMI', EN: 'OUR TEAM' },
    title: { ID: 'Tim Profesional Kami', EN: 'Our Professional Team' },
    subtitle: {
      ID: 'Didukung oleh tenaga ahli bersertifikasi resmi dan berpengalaman luas dalam memastikan keselamatan serta kepatuhan industri Anda.',
      EN: 'Backed by officially certified and extensively experienced experts ensuring the safety and compliance of your industry.',
    },
    members: {
      pranan: {
        title: { ID: 'Direktur Utama', EN: 'President Director' },
        bio: {
          ID: 'Berpengalaman lebih dari 15 tahun dalam manajemen strategis, tata kelola inspeksi teknik, dan kepatuhan regulasi K3 nasional untuk sektor migas dan manufaktur.',
          EN: 'Over 15 years of experience in strategic management, technical inspection governance, and national K3 regulatory compliance for the oil & gas and manufacturing sectors.',
        },
      },
      terzha: {
        title: { ID: 'Direktur', EN: 'Director' },
        bio: {
          ID: 'Fokus pada keunggulan operasional, akselerasi kemitraan industri, dan efisiensi pelaksanaan sertifikasi riksa uji alat di seluruh wilayah Indonesia.',
          EN: 'Focused on operational excellence, accelerating industrial partnerships, and efficient execution of statutory inspection certifications across Indonesia.',
        },
      },
      ricky: {
        title: { ID: 'Tim Ahli', EN: 'Expert Specialist' },
        bio: {
          ID: 'Ahli K3 spesialis berlisensi Kemnaker RI dengan rekam jejak audit teknis pada pesawat angkat angkut, bejana tekan, elevator, dan instalasi proteksi kebakaran.',
          EN: 'Licensed K3 specialist from the Indonesian Ministry of Manpower with a track record of technical audits on lifting equipment, pressure vessels, elevators, and fire protection installations.',
        },
      },
    },
  },
  workProcess: {
    eyebrow: { ID: 'ALUR PROSES', EN: 'WORK FLOW' },
    title: { ID: 'Proses Kerja Kami', EN: 'Our Work Process' },
    riksaEyebrow: { ID: 'BERITA TERBARU', EN: 'LATEST NEWS' },
    riksaTitle: { ID: 'Jasa Riksa Uji Populer', EN: 'Popular Inspection Services' },
    riksaDetail: { ID: 'Lihat Detail', EN: 'View Details' },
    riksaLocation: { ID: 'Seluruh Indonesia', EN: 'Nationwide' },
    riksaSchedule: { ID: 'Sesuai Kebutuhan', EN: 'On Demand' },
    riksaItems: {
      angkat: {
        title: { ID: 'Pesawat Angkat & Angkut', EN: 'Lifting & Conveying Equipment' },
        desc: {
          ID: 'Pemeriksaan dan pengujian untuk memastikan keamanan dan kelayakan operasional pesawat angkat dan angkut sesuai regulasi yang berlaku.',
          EN: 'Inspection and testing to ensure the safety and operational fitness of lifting and conveying equipment in accordance with applicable regulations.',
        },
      },
      eskalator: {
        title: { ID: 'Eskalator', EN: 'Escalator' },
        desc: {
          ID: 'Pemeriksaan dan pengujian untuk memastikan keamanan dan kelayakan operasional pesawat angkat dan angkut sesuai regulasi yang berlaku.',
          EN: 'Inspection and testing to ensure the safety and operational fitness of escalators in accordance with applicable regulations.',
        },
      },
      uap: {
        title: { ID: 'Pesawat Uap & Bejana Tekan', EN: 'Boilers & Pressure Vessels' },
        desc: {
          ID: 'Uji hidrostatik, verifikasi katup pengaman, dan pemeriksaan visual ketebalan pelat boiler dan tangki timbun.',
          EN: 'Hydrostatic testing, safety valve verification, and visual plate-thickness inspection of boilers and storage tanks.',
        },
      },
    },
  },
  testimonialCTA: {
    testimonialEyebrow: { ID: 'TESTIMONIAL', EN: 'TESTIMONIAL' },
    testimonialTitle: { ID: 'Apa Kata Klien Kami', EN: 'What Our Clients Say' },
    ctaTitle: {
      ID: 'Siap Meningkatkan Standar Keselamatan & Kinerja Industri Anda?',
      EN: 'Ready to Elevate Your Industry Safety Standards & Performance?',
    },
    ctaSubtitle: {
      ID: 'Hubungi kami sekarang untuk konsultasi gratis dan solusi terbaik sesuai kebutuhan Anda.',
      EN: 'Contact us now for a free consultation and the best solution tailored to your needs.',
    },
    ctaContact: { ID: 'HUBUNGI KAMI', EN: 'CONTACT US' },
    ctaFree: { ID: 'KONSULTASI GRATIS', EN: 'FREE CONSULTATION' },
    testimonials: [
      {
        quote: {
          ID: 'Layanan Delta Nusantara Persada sangat profesional. Timnya kompeten, responsif, dan hasil kerjanya melebihi ekspektasi kami.',
          EN: 'Delta Nusantara Persada\'s service is highly professional. Their team is competent, responsive, and the results exceeded our expectations.',
        },
        client: 'PT. Astra International Tbk',
        division: 'Procurement Division',
        rating: 5,
      },
      {
        quote: {
          ID: 'Inspeksi berkala bejana tekan dan boiler pabrik kami dilaksanakan teliti sesuai regulasi Kemnaker. Suket terbit tepat waktu.',
          EN: 'Periodic inspections of our pressure vessels and factory boilers were carried out thoroughly in accordance with Kemnaker regulations. Certificates issued on time.',
        },
        client: 'PT. Pertamina Lubricants',
        division: 'HSE & Maintenance Plant',
        rating: 5,
      },
      {
        quote: {
          ID: 'Pengujian load test overhead crane dan elevator berlangsung aman tanpa mengganggu lini produksi pabrik yang sedang berjalan.',
          EN: 'Load testing of overhead crane and elevator was conducted safely without disrupting the ongoing production line.',
        },
        client: 'PT. Waskita Karya (Persero) Tbk',
        division: 'Divisi Alat Berat & K3L',
        rating: 5,
      },
    ],
  },
  home: {
    brandSection: { ID: 'Brand Kami', EN: 'Our Brands' },
    brandSubtitle: { ID: 'Kami telah bekerja sama dengan berbagai perusahaan', EN: 'We have been working with 500+ clients' },
    clientSection: { ID: 'PERUSAHAAN YANG SUDAH BEKERJA SAMA DENGAN PT. DELTA NUSANTARA PERSADA', EN: 'COMPANIES THAT HAVE PARTNERED WITH PT. DELTA NUSANTARA PERSADA' },
    clientSubtitle: { ID: 'Dipercaya lebih dari 100+ perusahaan', EN: 'Trusted by more than 100+ companies' },
    newsSection: { ID: 'Blog & Berita', EN: 'Blog & News' },
    viewMore: { ID: 'Lihat Semua', EN: 'View More' },
    servicesSection: {
      eyebrow: { ID: 'LAYANAN KAMI', EN: 'OUR SERVICES' },
      title: { ID: 'Solusi Terintegrasi Untuk Kebutuhan Industri Anda', EN: 'Integrated Solutions For Your Industrial Needs' },
      cta: { ID: 'Selengkapnya', EN: 'View Details' },
      prevAria: { ID: 'Layanan sebelumnya', EN: 'Previous service' },
      nextAria: { ID: 'Layanan berikutnya', EN: 'Next service' },
      items: {
        'pesawat-angkat-angkut': {
          title: { ID: 'Pesawat Angkat & Pesawat Angkut', EN: 'Lifting & Conveying Equipment' },
          bullets: {
            ID: [
              'Hoist Crane, Overhead Crane, dll',
              'Chain Conveyor, Belt Conveyor, dll',
              'Pesawat Angkut di atas Landasan & Permukaan',
            ],
            EN: [
              'Hoist Crane, Overhead Crane, etc.',
              'Chain Conveyor, Belt Conveyor, etc.',
              'Transport Equipment on Tracks & Surfaces',
            ],
          },
        },
        'pubt': {
          title: { ID: 'Pesawat Uap & Bejana Tekan', EN: 'Boilers & Pressure Vessels' },
          bullets: {
            ID: [
              'Pesawat Uap',
              'Tangki Timbun',
              'Bejana Tekan',
            ],
            EN: [
              'Steam Boilers',
              'Storage Tanks',
              'Pressure Vessels',
            ],
          },
        },
        'elevator-eskalator': {
          title: { ID: 'Elevator & Eskalator', EN: 'Elevators & Escalators' },
          bullets: {
            ID: [
              'Elevator / Lift',
              'Eskalator',
            ],
            EN: [
              'Elevator / Passenger Lift',
              'Escalator',
            ],
          },
        },
        'proteksi-kebakaran': {
          title: { ID: 'Instalasi Proteksi Kebakaran', EN: 'Fire Protection Installations' },
          bullets: {
            ID: [
              'Sistem Alarm Kebakaran Otomatis',
              'Instalasi Hydrant & Springkler',
              'Pemeriksaan APAR & Fire Suppression',
            ],
            EN: [
              'Automatic Fire Alarm Systems',
              'Hydrant & Sprinkler Installations',
              'Extinguisher & Fire Suppression Audit',
            ],
          },
        },
        'listrik-petir': {
          title: { ID: 'Instalasi Penyalur Petir & Listrik', EN: 'Electrical & Lightning Protection' },
          bullets: {
            ID: [
              'Instalasi Penyalur Petir (Lightning Arrester)',
              'Pengukuran Tahanan Pembumian (Grounding)',
              'Pemeriksaan Instalasi Listrik & Panel Daya',
            ],
            EN: [
              'Lightning Arrester Installation & Testing',
              'Grounding Resistance Measurement',
              'Electrical Installation & Power Panel Audit',
            ],
          },
        },
        'pesawat-tenaga-produksi': {
          title: { ID: 'Pesawat Tenaga & Produksi', EN: 'Power & Production Machinery' },
          bullets: {
            ID: [
              'Pengujian Genset & Motor Bakar',
              'Mesin Perkakas & Produksi Industri',
              'Transmisi Tenaga Mekanik & Turbin',
            ],
            EN: [
              'Generator & Combustion Engine Testing',
              'Machine Tools & Industrial Production Units',
              'Mechanical Power Transmission & Turbines',
            ],
          },
        },
      },
    },
  },
  footer: {
    description: {
      ID: 'Delta Nusantara Persada menyelenggarakan Sertifikasi dan pembinaan pelatihan K3 untuk para karyawan maupun calon karyawan di seluruh Indonesia.',
      EN: 'Delta Nusantara Persada provides K3 certification, statutory inspection, and training programs across Indonesia.',
    },
    services: { ID: 'Layanan', EN: 'Services' },
    menu: { ID: 'Menu', EN: 'Menu' },
    contactUs: { ID: 'Hubungi Kami', EN: 'Contact Us' },
    followUs: { ID: 'Ikuti Kami', EN: 'Follow Us' },
    copyright: { ID: '© 2026 PT. Delta Nusantara Persada. Hak cipta dilindungi.', EN: '© 2026 PT. Delta Nusantara Persada. All rights reserved.' },
    serviceItems: {
      k3: { ID: 'Pelatihan K3', EN: 'K3 Training' },
      kompetensi: { ID: 'Pelatihan Berbasis Kompetensi', EN: 'Competency-Based Training' },
      lpk: { ID: 'Lembaga Pelatihan Kerja', EN: 'Vocational Training Institute' },
      konsultan: { ID: 'Konsultan Manajemen', EN: 'Management Consultant' },
      riksa: { ID: 'Riksa Uji', EN: 'Inspection & Testing' },
      audit: { ID: 'Audit & Sertifikasi', EN: 'Audit & Certification' },
    },
    menuItems: {
      about: { ID: 'Tentang Kami', EN: 'About Us' },
      privacy: { ID: 'Kebijakan Privasi', EN: 'Privacy Policy' },
      terms: { ID: 'Syarat & Ketentuan', EN: 'Terms & Conditions' },
      contact: { ID: 'Hubungi Kami', EN: 'Contact Us' },
    },
  },
  about: {
    title: { ID: 'Tentang Kami', EN: 'About Us' },
    subtitle: { ID: 'PT. Delta Nusantara Persada', EN: 'PT. Delta Nusantara Persada' },
  },
  berita: {
    title: { ID: 'Berita & Artikel', EN: 'News & Articles' },
    subtitle: { ID: 'Informasi terkini seputar K3 dan dunia industri', EN: 'Latest news on K3 and the industrial world' },
    readMore: { ID: 'Baca Selengkapnya', EN: 'Read More' },
    loadMore: { ID: 'Muat Lebih Banyak', EN: 'Load More' },
  },
  breadcrumb: {
    home: { ID: 'Beranda', EN: 'Home' },
    about: { ID: 'Tentang Kami', EN: 'About Us' },
    services: { ID: 'Layanan Riksa Uji', EN: 'Statutory Inspection Services' },
    news: { ID: 'Berita', EN: 'News' },
    contact: { ID: 'Hubungi Kami', EN: 'Contact Us' },
    brands: { ID: 'Brand Kami', EN: 'Our Brands' },
    courses: { ID: 'Kursus & Pelatihan', EN: 'Courses & Training' },
    privacy: { ID: 'Kebijakan Privasi', EN: 'Privacy Policy' },
    terms: { ID: 'Syarat & Ketentuan', EN: 'Terms & Conditions' },
  },
  serviceModal: {
    badge: { ID: 'Layanan K3', EN: 'K3 Services' },
    legalBasisTitle: { ID: 'Dasar Hukum', EN: 'Legal Basis' },
    servicesTitle: { ID: 'Jenis Layanan', EN: 'Service Scope' },
    closeAria: { ID: 'Tutup detail layanan', EN: 'Close service details' },
    items: {
      'pesawat-angkat-angkut': {
        title: {
          ID: 'Pesawat Angkat & Pesawat Angkut',
          EN: 'Lifting & Conveying Equipment',
        },
        description: {
          ID: 'Pemeriksaan dan pengujian untuk memastikan peralatan angkat dan angkut beroperasi dengan aman, efisien, dan sesuai standar.',
          EN: 'Inspection and testing to ensure lifting and conveying equipment operates safely, efficiently, and in full compliance with statutory standards.',
        },
        dasarHukum: {
          ID: 'Permenaker No. 8 Tahun 2020 tentang Keselamatan dan Kesehatan Kerja Pesawat Angkat dan Pesawat Angkut.',
          EN: 'Ministry of Manpower Regulation No. 8 of 2020 on Occupational Safety and Health for Lifting and Conveying Equipment.',
        },
        jenisLayanan: {
          ID: [
            'Overhead Crane',
            'Belt Conveyor',
            'Pesawat Angkut di atas Landasan',
            'Pesawat Angkut di Permukaan',
          ],
          EN: [
            'Overhead Crane',
            'Belt Conveyor',
            'Track-mounted Transport Equipment',
            'Surface Transport Equipment',
          ],
        },
      },
      pubt: {
        title: {
          ID: 'Pesawat Uap & Bejana Tekan',
          EN: 'Steam Boilers & Pressure Vessels',
        },
        description: {
          ID: 'Boiler dan bejana tekan wajib diperiksa secara berkala agar bebas dari risiko kebocoran, tekanan berlebih, dan potensi ledakan.',
          EN: 'Boilers and pressure vessels require statutory periodic inspection to prevent leaks, overpressure, and explosion hazards.',
        },
        dasarHukum: {
          ID: 'Undang-Undang Uap 1930 dan Peraturan Uap 1930; Permenaker No. 37 Tahun 2016 tentang Keselamatan dan Kesehatan Kerja Bejana Tekanan dan Tangki Timbun.',
          EN: 'Steam Act 1930 & Steam Regulations 1930; Manpower Regulation No. 37/2016 on OSH for Pressure Vessels and Storage Tanks.',
        },
        jenisLayanan: {
          ID: ['Pesawat Uap', 'Tangki Timbun', 'Bejana Tekan'],
          EN: ['Steam Boilers', 'Storage Tanks', 'Pressure Vessels'],
        },
      },
      'elevator-eskalator': {
        title: {
          ID: 'Elevator & Eskalator',
          EN: 'Elevators & Escalators',
        },
        description: {
          ID: 'Mobilitas vertikal yang aman dimulai dari pengujian rutin — memastikan elevator dan eskalator layak dan nyaman digunakan setiap hari.',
          EN: 'Safe vertical transportation begins with routine testing — ensuring elevators and escalators are certified fit and reliable for daily operation.',
        },
        dasarHukum: {
          ID: 'Permenaker No. 6 Tahun 2017 tentang Keselamatan dan Kesehatan Kerja Elevator dan Eskalator.',
          EN: 'Ministry of Manpower Regulation No. 6 of 2017 on Occupational Safety and Health for Elevators and Escalators.',
        },
        jenisLayanan: {
          ID: ['Elevator / Lift', 'Eskalator'],
          EN: ['Passenger & Freight Elevators', 'Escalators & Moving Walks'],
        },
      },
      'proteksi-kebakaran': {
        title: {
          ID: 'Proteksi Kebakaran',
          EN: 'Fire Protection Installations',
        },
        description: {
          ID: 'Kesiapan sistem proteksi kebakaran adalah kunci penyelamatan. Kami periksa detektor, alarm, dan alat pemadam agar selalu siap saat dibutuhkan.',
          EN: 'Fire protection readiness is essential for life safety. We inspect detectors, alarm systems, and suppression equipment for reliable emergency performance.',
        },
        dasarHukum: {
          ID: 'Permenakertrans No. Per.02/MEN/1983 tentang Instalasi Alarm Kebakaran Automatik; Permenakertrans No. Per.04/MEN/1980 tentang APAR; Kepmenaker No. Kep.186/MEN/1999; Instruksi Menaker No. Ins.11/M/BW/1997.',
          EN: 'Ministry of Manpower Regulations No. Per.02/MEN/1983 (Automatic Fire Alarms), No. Per.04/MEN/1980 (Extinguishers), and Decree No. Kep.186/MEN/1999.',
        },
        jenisLayanan: {
          ID: ['Hydrant', 'Alarm', 'Sprinkler', 'Fire Suppression System'],
          EN: ['Hydrant Systems', 'Fire Alarms', 'Sprinkler Networks', 'Clean Agent Fire Suppression Systems'],
        },
      },
      'listrik-petir': {
        title: {
          ID: 'Instalasi Listrik & Penyalur Petir',
          EN: 'Electrical & Lightning Protection Installations',
        },
        description: {
          ID: 'Dari korsleting hingga sambaran petir — pengujian instalasi listrik dan penyalur petir kami dirancang untuk mencegah bahaya sebelum terjadi.',
          EN: 'From short circuits to lightning strikes — our statutory testing protects personnel and industrial assets against severe electrical hazards.',
        },
        dasarHukum: {
          ID: 'Permenaker No. 12 Tahun 2015 jo. Permenaker No. 33 Tahun 2015 tentang K3 Listrik di Tempat Kerja; Permenaker No. Per.02/MEN/1989 jo. Permenaker No. 31 Tahun 2015 tentang Pengawasan Instalasi Penyalur Petir.',
          EN: 'Manpower Regulation No. 12/2015 & No. 33/2015 (Electrical OSH); Regulation No. Per.02/MEN/1989 & No. 31/2015 (Lightning Protection).',
        },
        jenisLayanan: {
          ID: ['Listrik', 'Penyalur Petir'],
          EN: ['Electrical Power Panels & Wiring', 'Lightning Arresters & Grounding Resistance'],
        },
      },
      'pesawat-tenaga-produksi': {
        title: {
          ID: 'Pesawat & Tenaga Produksi',
          EN: 'Power & Production Machinery',
        },
        description: {
          ID: 'Mesin produksi yang andal berawal dari perawatan yang tepat. Pemeriksaan menyeluruh kami memastikan unit produksi Anda aman dan minim downtime.',
          EN: 'Reliable production machinery requires rigorous inspection. Our comprehensive audits ensure safe operation and minimize downtime.',
        },
        dasarHukum: {
          ID: 'Permenaker No. 38 Tahun 2016 tentang Keselamatan dan Kesehatan Kerja Pesawat Tenaga dan Produksi.',
          EN: 'Ministry of Manpower Regulation No. 38 of 2016 on OSH for Power and Production Machinery.',
        },
        jenisLayanan: {
          ID: [
            'Penggerak Mula',
            'Mesin Perkakas Dan Produksi',
            'Turbin',
            'Transmisi Tenaga',
            'Tanur (Furnace) Dan Lainnya',
          ],
          EN: [
            'Prime Movers (Diesel & Generators)',
            'Machine Tools & Production Lines',
            'Turbines',
            'Mechanical Power Transmission',
            'Industrial Furnaces & Ovens',
          ],
        },
      },
    },
  },
  servicesPage: {
    hero: {
      eyebrow: { ID: 'PEMERIKSAAN · PENGUJIAN · SERTIFIKASI K3', EN: 'INSPECTION · TESTING · K3 CERTIFICATION' },
      title: { ID: 'Layanan Riksa Uji Pesawat & Alat K3', EN: 'Statutory Inspection Services for Industrial Machinery' },
      subtitle: {
        ID: 'PT Delta Nusantara Persada adalah Perusahaan Jasa Keselamatan dan Kesehatan Kerja (PJK3) bidang Riksa Uji yang ditunjuk resmi oleh Kementerian Ketenagakerjaan RI. Seluruh riksa uji dilaksanakan oleh Ahli K3 Spesialis berpenunjukan resmi, didukung kompetensi NDT dan Welding Inspector.',
        EN: 'PT Delta Nusantara Persada is an officially appointed Inspection & Testing Company (PJK3) by the Indonesian Ministry of Manpower. All statutory inspections are conducted by licensed K3 specialists backed by NDT and Welding Inspector certifications.',
      },
      ctaConsult: { ID: 'Konsultasi Riksa Uji', EN: 'Request Inspection Consultation' },
    },
    docIssued: { ID: 'Dokumen diterbitkan:', EN: 'Issued Document:' },
    requestQuote: { ID: 'Minta Penawaran Riksa Uji Ini', EN: 'Request a Quote for this Inspection' },
    ctaStrip: {
      title: { ID: 'Butuh Riksa Uji Pesawat atau Alat K3?', EN: 'Need Statutory Equipment Inspection or Certification?' },
      desc: {
        ID: 'Tim Ahli K3 Spesialis kami siap melakukan survei awal dan memberikan estimasi biaya tanpa kewajiban. Hubungi kami sekarang untuk jadwal riksa uji.',
        EN: 'Our licensed K3 specialist team is ready to conduct preliminary surveys and provide competitive quotations with zero obligations. Contact us now to schedule an inspection.',
      },
      btnContact: { ID: 'Hubungi Tim Kami', EN: 'Contact Our Team' },
    },
  },
  aboutPage: {
    hero: {
      title: { ID: 'Tentang Kami', EN: 'About Us' },
      subtitle: {
        ID: 'PJK3 Riksa Uji yang Ditunjuk Resmi oleh Kementerian Ketenagakerjaan RI',
        EN: 'Statutory Inspection & Testing Company (PJK3) Officially Appointed by the Ministry of Manpower RI',
      },
    },
    companyName: { ID: 'PT. DELTA NUSANTARA PERSADA', EN: 'PT. DELTA NUSANTARA PERSADA' },
    p1: {
      ID: 'DELTA NUSANTARA PERSADA bermula dari Perusahaan Jasa Pengembangan SDM bidang Keselamatan Kesehatan Kerja (K3) dan bidang lain dengan menyesuaikan kebutuhan para pelanggan.',
      EN: 'DELTA NUSANTARA PERSADA originated as an HR development & HSE training provider tailored to the evolving needs of industrial clients.',
    },
    p2: {
      ID: 'Berdiri sejak Tahun 1999 berbadan hukum Yayasan, pada Tahun 2006 berubah menjadi Perseroan Terbatas (PT) untuk meningkatkan profesionalitas usaha. Hingga saat ini kami terus berkembang sebagai Perusahaan Jasa Keselamatan dan Kesehatan Kerja (PJK3) bidang Pemeriksaan dan Pengujian yang ditunjuk resmi oleh Kementerian Ketenagakerjaan RI.',
      EN: 'Founded in 1999 as a foundation, we restructured into a Limited Liability Company (PT) in 2006 to elevate our business professionalism. Today we have grown into an officially appointed Statutory Inspection & Testing Company (PJK3) under the Indonesian Ministry of Manpower.',
    },
    p3: {
      ID: 'Berkedudukan di Bekasi, kami melayani klien di seluruh Indonesia — dari kawasan industri Jabodetabek hingga lokasi remote seperti Morowali, Pekanbaru, dan Balikpapan.',
      EN: 'Headquartered in Bekasi, we serve clients across Indonesia — from the industrial corridors of Jabodetabek to remote industrial hubs such as Morowali, Pekanbaru, and Balikpapan.',
    },
    qualityTitle: { ID: 'Kebijakan Mutu & K3', EN: 'Quality & OSH Policy' },
    qualitySubtitle: { ID: 'Komitmen Integritas, Standar Teknis, dan Pelayanan Prima', EN: 'Commitment to Integrity, Technical Rigor, and Service Excellence' },
    pillarPrefix: { ID: 'Pilar', EN: 'Pillar' },
    policies: {
      ID: [
        'Memastikan kepuasan pelanggan dan mitra kerja secara berkesinambungan.',
        'Melakukan perbaikan sistem dan kualitas layanan secara konsisten.',
        'Jujur, transparan, dan profesional dalam setiap pelaksanaan pekerjaan pemeriksaan.',
        'Tepat waktu dalam pelaksanaan survei teknis hingga penerbitan laporan riksa uji.',
        'Informatif serta edukatif terhadap standar kepatuhan regulasi K3 klien.',
        'Mematuhi seluruh persyaratan perundang-undangan keselamatan kerja yang berlaku.',
        'Tanggap dan proaktif dalam melihat peluang perbaikan mutu operasional.',
        'Pendidikan dan pelatihan terencana untuk peningkatan kompetensi Ahli K3 Spesialis.',
      ],
      EN: [
        'Ensuring continuous satisfaction for clients and industrial partners.',
        'Driving consistent improvement in our inspection workflows and service quality.',
        'Demonstrating honesty, transparency, and high professionalism in all inspection duties.',
        'Ensuring punctual execution from on-site technical surveys to certificate issuance.',
        'Providing informative, educational guidance regarding statutory OSH compliance standards.',
        'Strictly complying with all applicable occupational health and safety laws and regulations.',
        'Being responsive and proactive in identifying opportunities for operational quality enhancement.',
        'Conducting structured training and education to advance our licensed K3 Specialists.',
      ],
    },
    leadershipTitle: { ID: 'Struktur Organisasi & Manajemen', EN: 'Organizational Structure & Leadership' },
    leadershipSubtitle: { ID: 'Jajaran Pimpinan dan Penanggung Jawab Teknis PT Delta Nusantara Persada', EN: 'Executive Leadership and Technical Directors of PT Delta Nusantara Persada' },
    partnersTitle: { ID: 'MITRA KAMI', EN: 'OUR PARTNERS' },
    partnersSubtitle: {
      ID: 'Dalam merespon kebutuhan sertifikasi kompetensi personal, DELTA NUSANTARA PERSADA bekerjasama dengan Lembaga Sertifikasi Profesi (LSP):',
      EN: 'In response to personnel competency certification needs, DELTA NUSANTARA PERSADA collaborates with accredited Professional Certification Bodies (LSP):',
    },
  },
  contactPage: {
    hero: {
      eyebrow: { ID: 'KONTAK & LOKASI', EN: 'CONTACT & LOCATION' },
      title: { ID: 'Hubungi Kami', EN: 'Contact Us' },
      subtitle: {
        ID: 'Tim Ahli K3 Spesialis kami siap membantu Anda merencanakan jadwal riksa uji dan memberikan estimasi biaya. Senin – Sabtu, 08.00 – 17.00 WIB.',
        EN: 'Our licensed K3 specialist team is ready to help you plan inspection schedules and provide cost estimates. Monday – Saturday, 08:00 – 17:00 WIB.',
      },
    },
    howToContact: { ID: 'Cara Menghubungi Kami', EN: 'How to Reach Us' },
    comingSoon: { ID: 'Segera Hadir', EN: 'Coming Soon' },
    waDesc: {
      ID: 'Layanan WhatsApp Business sedang dalam proses registrasi. Untuk konsultasi langsung, silakan hubungi telepon kantor atau email kami.',
      EN: 'WhatsApp Business channel is currently undergoing registration. For immediate assistance, please call our office or reach out via email.',
    },
    phoneLabel: { ID: 'Telepon', EN: 'Telephone' },
    emailLabel: { ID: 'Email', EN: 'Email' },
    emailResponse: { ID: 'Balasan dalam 1 hari kerja', EN: 'Response within 1 business day' },
    headOffice: { ID: 'Kantor Pusat', EN: 'Headquarters' },
    mapsLink: { ID: 'Buka di Google Maps', EN: 'Open in Google Maps' },
    hoursTitle: { ID: 'Jam Operasional', EN: 'Working Hours' },
    monFri: { ID: 'Senin – Jumat', EN: 'Monday – Friday' },
    sat: { ID: 'Sabtu', EN: 'Saturday' },
    sunHolidays: { ID: 'Minggu & Libur Nasional', EN: 'Sunday & Public Holidays' },
    closed: { ID: 'Tutup', EN: 'Closed' },
    hoursNote: {
      ID: '* Riksa uji lapangan dapat dijadwalkan di luar jam kantor atas permintaan khusus.',
      EN: '* On-site field inspections can be scheduled outside regular office hours upon request.',
    },
    repOfficesTitle: { ID: 'Kantor Perwakilan', EN: 'Representative Offices' },
    repOfficesDesc: {
      ID: 'PT Delta Nusantara Persada memiliki kantor perwakilan di 8 kota industri strategis di Indonesia.',
      EN: 'PT Delta Nusantara Persada maintains representative branches across 8 strategic industrial cities in Indonesia.',
    },
    repOfficesNote: {
      ID: 'Untuk alamat dan kontak kantor perwakilan, silakan hubungi kantor pusat.',
      EN: 'For branch addresses and direct contact points, please contact our headquarters.',
    },
  },
  aboutModal: {
    badge: { ID: 'PROFIL PERUSAHAAN', EN: 'COMPANY PROFILE' },
    title: { ID: 'PT Delta Nusantara Persada', EN: 'PT Delta Nusantara Persada' },
    subtitle: {
      ID: 'Perusahaan Jasa Keselamatan dan Kesehatan Kerja (PJK3) Riksa Uji Resmi Kemnaker RI',
      EN: 'Statutory HSE Inspection & Testing Company (PJK3) Officially Appointed by Ministry of Manpower RI',
    },
    tabs: {
      overview: { ID: 'Tentang Kami', EN: 'About Us' },
      visionMission: { ID: 'Visi & Misi', EN: 'Vision & Mission' },
      qualityPolicy: { ID: 'Kebijakan Mutu', EN: 'Quality Policy' },
      hsePolicy: { ID: 'Kebijakan K3', EN: 'HSE Policy' },
    },
    overviewText: {
      p1: {
        ID: 'PT. Delta Nusantara Persada adalah Perusahaan Jasa Keselamatan dan Kesehatan Kerja (PJK3) bidang pemeriksaan dan pengujian teknik yang berdedikasi tinggi dalam menjamin kelaikan peralatan industri dan keselamatan kerja di seluruh Indonesia.',
        EN: 'PT. Delta Nusantara Persada is an Occupational Health & Safety Services Company (PJK3) specializing in technical inspection and testing, dedicated to ensuring industrial equipment safety and operational compliance throughout Indonesia.',
      },
      p2: {
        ID: 'Didirikan sejak tahun 1999 dan berbadan hukum PT pada tahun 2006, kami berkedudukan di Bekasi dan melayani berbagai kawasan industri strategis dari Jabodetabek hingga area remote seperti Morowali, Cilegon, dan Lampung.',
        EN: 'Established in 1999 and incorporated as a PT in 2006, headquartered in Bekasi, we serve strategic industrial hubs ranging from Greater Jakarta to remote operations including Morowali, Cilegon, and Lampung.',
      },
      p3: {
        ID: 'Didukung oleh Ahli K3 Spesialis berlisensi resmi Kemnaker RI, Welding Inspector, serta personil NDT bersertifikat, kami memberikan hasil riksa uji yang presisi, independen, dan berintegritas.',
        EN: 'Empowered by certified HSE Inspection Specialists licensed by the Ministry of Manpower RI, Welding Inspectors, and certified NDT personnel, we provide rigorous, independent, and high-integrity statutory assessments.',
      },
    },
    vision: {
      title: { ID: 'Visi Kami', EN: 'Our Vision' },
      desc: {
        ID: 'Menjadi yang terdepan dalam Penyediaan Pelayanan Jasa Konsultan dan Jasa Pemeriksaan Pengujian peralatan kerja yang dapat diandalkan serta terpercaya.',
        EN: 'To be at the forefront of providing reliable and trustworthy Consulting Services and Work Equipment Testing & Inspection Services.',
      },
    },
    mission: {
      title: { ID: 'Misi Kami', EN: 'Our Missions' },
      items: {
        ID: [
          'Menyediakan berbagai layanan dalam bidang konsultasi, pemeriksaan dan pengujian peralatan kerja guna mendukung peningkatan produktivitas dan keselamatan kerja baik di sektor pemerintah maupun swasta.',
          'Memberikan pelayanan terbaik bagi semua pelanggan dan menjadi mitra kerja yang dapat diandalkan serta terpercaya.',
        ],
        EN: [
          'Provide a comprehensive range of services in consulting, equipment testing and inspection to support productivity enhancement and occupational safety across government and private sectors.',
          'Deliver first-class service to all clients and become an enduring, trustworthy business partner.',
        ],
      },
    },
    qualityPolicy: {
      title: { ID: 'Kebijakan Mutu', EN: 'Quality Policy' },
      items: {
        ID: [
          'Menjamin kepuasan pelanggan dan mitra kerja.',
          'Melakukan perbaikan pelayanan secara berkelanjutan.',
          'Jujur dan profesional dalam setiap pelaksanaan tugas.',
          'Tepat waktu dalam melaksanakan seluruh pekerjaan riksa uji.',
          'Informatif dan transparan dalam pelaporan teknis.',
          'Taat pada persyaratan pelanggan dan perundang-undangan yang berlaku.',
          'Jeli dalam melihat peluang penyempurnaan sistem kerja.',
          'Pendidikan terencana untuk meningkatkan kompetensi karyawan.',
        ],
        EN: [
          'Ensure total satisfaction of clients and working partners.',
          'Execute continuous and sustainable service improvements.',
          'Maintain honesty and high professionalism across all inspections.',
          'Adhere strictly to project timelines and prompt delivery.',
          'Provide clear, informative, and transparent technical reports.',
          'Strictly comply with regulatory frameworks and statutory laws.',
          'Proactively identify opportunities for systematic optimization.',
          'Conduct planned training to constantly upgrade inspector competence.',
        ],
      },
    },
    hsePolicy: {
      title: { ID: 'Kebijakan Keselamatan & Kesehatan Kerja (K3)', EN: 'Health, Safety & Environment (HSE) Policy' },
      items: {
        ID: [
          'Menaati peraturan perundang-undangan dan persyaratan K3 lainnya yang berlaku.',
          'Meningkatkan kinerja keselamatan dan kesehatan kerja secara berkelanjutan.',
          'Mencegah kecelakaan kerja dan penyakit akibat kerja dalam setiap proses bisnis.',
          'Menyediakan pelatihan dan fasilitas kerja yang aman serta nyaman bagi seluruh personil.',
        ],
        EN: [
          'Comply strictly with statutory legislation and applicable HSE standards.',
          'Continuously improve workplace health and safety performance.',
          'Prevent occupational accidents, hazards, and work-related illnesses.',
          'Provide thorough safety training and ergonomic, secure work facilities.',
        ],
      },
    },
    closeButton: { ID: 'Tutup', EN: 'Close' },
    ctaConsult: { ID: 'Konsultasi Riksa Uji', EN: 'Schedule Inspection' },
  },
}


type ContextType = {
  lang: Language
  setLang: (l: Language) => void
  t: (section: string, key: string, subKey?: string) => string
}

const STORAGE_KEY = 'delta_language'

const LanguageContext = createContext<ContextType>({
  lang: 'ID',
  setLang: () => { },
  t: (s, k) => k,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('ID')

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Language | null
      if (stored === 'ID' || stored === 'EN') {
        setLangState(stored)
      }
    } catch { }
  }, [])

  const setLang = (l: Language) => {
    setLangState(l)
    try {
      localStorage.setItem(STORAGE_KEY, l)
    } catch { }
  }

  // Type-safe translation lookup: t('nav', 'about') or t('nav', 'brandChildren', 'pranenggar')
  const t = (section: string, key: string, subKey?: string): string => {
    const sec = (translations as Record<string, unknown>)[section]
    if (!sec || typeof sec !== 'object') return key
    const entry = (sec as Record<string, unknown>)[key]
    if (!entry || typeof entry !== 'object') return key
    if (subKey) {
      const sub = (entry as Record<string, unknown>)[subKey]
      if (!sub || typeof sub !== 'object') return subKey
      return ((sub as Record<string, string>)[lang]) ?? subKey
    }
    return ((entry as Record<string, string>)[lang]) ?? key
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}
