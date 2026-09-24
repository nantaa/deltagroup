import type { Metadata } from 'next'
import React from 'react'
import SiteHeader from '@/components/layout/SiteHeader'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'

export const metadata: Metadata = {
  title: 'Syarat & Ketentuan',
  description:
    'Syarat dan ketentuan layanan PT Delta Nusantara Persada mencakup lingkup layanan riksa uji K3, kewajiban klien, ketentuan pembayaran, dan batasan tanggung jawab.',
  alternates: { canonical: '/terms' },
  robots: { index: true, follow: false },
}

const LAST_UPDATED = '1 September 2026'

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <Breadcrumb crumbs={[{ label: 'Syarat & Ketentuan' }]} />

      <header className="bg-gray-50 border-b border-gray-200 py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-dnp-navy mb-2">Syarat &amp; Ketentuan Layanan</h1>
          <p className="text-sm text-gray-500">Terakhir diperbarui: {LAST_UPDATED}</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-dnp prose-sm sm:prose max-w-none">

          <p>
            Syarat dan Ketentuan ini (“Perjanjian”) mengatur penggunaan layanan yang disediakan oleh
            PT Delta Nusantara Persada (“Perusahaan”, “kami”), sebuah Perusahaan Jasa Keselamatan
            dan Kesehatan Kerja (PJK3) bidang Pemeriksaan dan Pengujian yang berkedudukan di Bekasi,
            Indonesia. Dengan menggunakan layanan kami, Anda (“Klien”) menyetujui ketentuan ini
            secara penuh.
          </p>

          <h2>1. Lingkup Layanan</h2>
          <p>Perusahaan menyediakan layanan berikut:</p>
          <ul>
            <li>
              <strong>Riksa Uji Peralatan Kerja</strong> — pemeriksaan dan pengujian kelaikan
              operasional pesawat angkat-angkut, pesawat uap dan bejana tekan, elevator dan eskalator,
              instalasi proteksi kebakaran, instalasi listrik dan penyalur petir, serta pesawat tenaga
              dan produksi, sesuai peraturan Kemnaker RI yang berlaku.
            </li>
            <li>
              <strong>Audit Alat</strong> — inspeksi sistem dan proses peralatan untuk keperluan
              audit internal dan due diligence.
            </li>
            <li>
              <strong>Kajian Teknis Bangunan</strong> — studi kesesuaian antara desain dan
              kondisi aktual bangunan mencakup aspek arsitektur, konstruksi, mekanikal, elektrikal,
              dan plumbing.
            </li>
          </ul>

          <h2>2. Penunjukan Resmi</h2>
          <p>
            Perusahaan beroperasi sebagai PJK3 yang ditunjuk resmi oleh Kementerian Ketenagakerjaan RI.
            Nomor Surat Keputusan Penunjukan dan lingkup penunjukan tersedia untuk diverifikasi oleh Klien.
            Seluruh inspector dan Ahli K3 Spesialis memiliki sertifikasi dan penunjukan resmi sesuai bidangnya.
          </p>

          <h2>3. Kewajiban Klien</h2>
          <p>Untuk kelancaran pelaksanaan riksa uji, Klien wajib:</p>
          <ul>
            <li>Memberikan akses yang memadai ke lokasi dan peralatan yang akan diinspeksi</li>
            <li>Menyediakan dokumen teknis peralatan (gambar konstruksi, spesifikasi, riwayat perawatan) jika tersedia</li>
            <li>Memastikan peralatan dalam kondisi dapat dioperasikan pada saat inspeksi berlangsung</li>
            <li>
              Menerapkan prosedur Keselamatan dan Kesehatan Kerja (K3) di lokasi selama inspector kami
              bertugas, termasuk menyediakan Alat Pelindung Diri (APD) tambahan jika diperlukan
            </li>
            <li>Memberikan informasi yang akurat mengenai kapasitas, spesifikasi teknis, dan riwayat operasional peralatan</li>
          </ul>

          <h2>4. Batasan Tanggung Jawab dan Disclaimer Riksa Uji</h2>
          <p>
            Laporan riksa uji diterbitkan berdasarkan kondisi peralatan pada <strong>tanggal dan waktu
            inspeksi dilaksanakan</strong>. Perusahaan tidak bertanggung jawab atas:
          </p>
          <ul>
            <li>
              Kerusakan, kegagalan, atau kecelakaan yang terjadi akibat perubahan kondisi peralatan,
              modifikasi, atau penggunaan yang tidak sesuai <em>setelah</em> tanggal inspeksi
            </li>
            <li>
              Cacat tersembunyi yang tidak dapat terdeteksi melalui metode inspeksi yang disepakati
              (visual, NDT, uji beban) tanpa pembongkaran lengkap peralatan
            </li>
            <li>Penundaan atau ketidakmampuan melaksanakan riksa uji akibat force majeure, termasuk bencana alam, kebakaran, atau kondisi cuaca ekstrem</li>
            <li>Kerugian tidak langsung (consequential loss) yang timbul dari hasil atau rekomendasi laporan riksa uji</li>
          </ul>
          <p>
            Laporan riksa uji merupakan dokumen teknis yang mencerminkan kondisi aktual peralatan
            pada saat inspeksi dan bukan merupakan jaminan performa peralatan di masa mendatang.
          </p>

          <h2>5. Ketentuan Pembayaran</h2>
          <ul>
            <li>Pembayaran dilakukan berdasarkan Surat Penawaran (quotation) yang telah disetujui kedua pihak</li>
            <li>Invoice diterbitkan setelah selesainya pekerjaan riksa uji di lapangan</li>
            <li>Pembayaran jatuh tempo dalam <strong>14 hari kalender</strong> sejak tanggal invoice, kecuali disepakati lain secara tertulis</li>
            <li>Keterlambatan pembayaran dapat dikenakan denda keterlambatan sebesar 2% per bulan dari nilai yang belum terbayarkan</li>
            <li>Laporan riksa uji final hanya diterbitkan setelah pembayaran lunas diterima</li>
          </ul>

          <h2>6. Pembatalan dan Penjadwalan Ulang</h2>
          <ul>
            <li>
              Pembatalan oleh Klien lebih dari <strong>3 hari kerja</strong> sebelum jadwal inspeksi:
              tidak dikenakan biaya pembatalan
            </li>
            <li>
              Pembatalan oleh Klien kurang dari <strong>3 hari kerja</strong> atau pada hari pelaksanaan:
              dapat dikenakan biaya mobilisasi yang telah dikeluarkan
            </li>
            <li>Penjadwalan ulang dapat dilakukan maksimal 2 kali tanpa biaya tambahan, dengan pemberitahuan minimal 2 hari kerja sebelumnya</li>
          </ul>

          <h2>7. Kerahasiaan</h2>
          <p>
            Perusahaan menjaga kerahasiaan seluruh informasi teknis, data operasional, dan dokumen
            peralatan Klien yang diperoleh selama pelaksanaan layanan. Informasi tersebut tidak akan
            diungkapkan kepada pihak ketiga tanpa persetujuan tertulis Klien, kecuali diwajibkan
            oleh hukum atau regulasi yang berlaku (termasuk pelaporan kepada Kemnaker RI sebagai
            kewajiban PJK3).
          </p>

          <h2>8. Hukum yang Berlaku dan Penyelesaian Sengketa</h2>
          <p>
            Perjanjian ini diatur oleh dan ditafsirkan sesuai dengan hukum Republik Indonesia.
            Sengketa yang timbul diselesaikan terlebih dahulu melalui musyawarah mufakat dalam
            jangka waktu 30 hari. Apabila tidak tercapai kesepakatan, sengketa diserahkan kepada
            Pengadilan Negeri Bekasi sebagai domisili hukum yang dipilih.
          </p>

          <h2>9. Perubahan Syarat dan Ketentuan</h2>
          <p>
            Perusahaan berhak memperbarui Syarat dan Ketentuan ini sewaktu-waktu. Klien yang telah
            menandatangani kontrak sebelum perubahan tidak terikat pada perubahan tersebut untuk
            pekerjaan yang sedang berjalan. Syarat dan Ketentuan terbaru berlaku untuk pekerjaan baru
            yang dimulai setelah tanggal perubahan.
          </p>

          <h2>10. Hubungi Kami</h2>
          <address className="not-italic">
            <strong>PT Delta Nusantara Persada</strong><br />
            Komplek Suncity Square Blok H–20, Jl. M. Hasibuan, Margajaya, Bekasi<br />
            Email: <a href="mailto:marketing@deltanusa.co.id">marketing@deltanusa.co.id</a><br />
            Telepon: <a href="tel:+622188869010">(021) 88869010</a>
          </address>

        </div>
      </main>

      <Footer />
    </>
  )
}
