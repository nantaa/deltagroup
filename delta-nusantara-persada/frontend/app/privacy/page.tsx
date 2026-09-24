import type { Metadata } from 'next'
import React from 'react'
import SiteHeader from '@/components/layout/SiteHeader'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'

export const metadata: Metadata = {
  title: 'Kebijakan Privasi',
  description:
    'Kebijakan privasi PT Delta Nusantara Persada mengenai pengumpulan, penggunaan, dan perlindungan data pribadi pengguna layanan dan peserta pelatihan K3.',
  alternates: { canonical: '/privacy' },
  robots: { index: true, follow: false }, // Legal pages: index but don’t pass link equity
}

const LAST_UPDATED = '1 September 2026'

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <Breadcrumb crumbs={[{ label: 'Kebijakan Privasi' }]} />

      <header className="bg-gray-50 border-b border-gray-200 py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-dnp-navy mb-2">Kebijakan Privasi</h1>
          <p className="text-sm text-gray-500">Terakhir diperbarui: {LAST_UPDATED}</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-dnp prose-sm sm:prose max-w-none">

          <p>
            PT Delta Nusantara Persada (“Perusahaan”, “kami”) berkomitmen melindungi data pribadi
            Anda sesuai dengan Undang-Undang No. 27 Tahun 2022 tentang Perlindungan Data Pribadi
            (UU PDP), Undang-Undang No. 11 Tahun 2008 tentang Informasi dan Transaksi Elektronik
            (UU ITE), dan Peraturan Pemerintah No. 71 Tahun 2019.
          </p>

          <h2>1. Data Pribadi yang Kami Kumpulkan</h2>
          <p>Kami hanya mengumpulkan data yang diperlukan untuk menjalankan layanan, yaitu:</p>
          <ul>
            <li>
              <strong>Data Identitas:</strong> Nama lengkap, jabatan, dan nama perusahaan —
              dikumpulkan saat pendaftaran kursus atau permintaan riksa uji.
            </li>
            <li>
              <strong>Data Kontak:</strong> Nomor telepon dan alamat email —
              untuk konfirmasi pendaftaran, pengiriman jadwal, dan sertifikat.
            </li>
            <li>
              <strong>Data Pembayaran:</strong> Nomor invoice dan status transaksi —
              diproses oleh Xendit (payment gateway). Kami tidak menyimpan nomor kartu kredit
              atau informasi rekening bank Anda.
            </li>
            <li>
              <strong>Data Teknis:</strong> Alamat IP, tipe browser, dan halaman yang dikunjungi —
              dikumpulkan secara anonim melalui log server untuk keamanan dan peningkatan layanan.
            </li>
          </ul>

          <h2>2. Tujuan Penggunaan Data</h2>
          <p>Data pribadi Anda digunakan semata-mata untuk:</p>
          <ul>
            <li>Memproses pendaftaran dan pembayaran kursus/pelatihan K3</li>
            <li>Mengirimkan konfirmasi, jadwal, dan sertifikat kompetensi</li>
            <li>Menjadwalkan dan melaksanakan layanan riksa uji di lokasi Anda</li>
            <li>Berkomunikasi mengenai perubahan jadwal atau kebijakan layanan</li>
            <li>Memenuhi kewajiban hukum dan regulasi Kemnaker RI</li>
          </ul>
          <p>
            <strong>Kami tidak menjual, menyewakan, atau membagikan data Anda kepada pihak ketiga
            untuk tujuan pemasaran.</strong>
          </p>

          <h2>3. Berbagi Data dengan Pihak Ketiga</h2>
          <p>Kami berbagi data hanya kepada pihak-pihak berikut, sejauh diperlukan:</p>
          <ul>
            <li>
              <strong>Xendit</strong> — payment gateway untuk pemrosesan pembayaran kursus.
              Data yang dibagikan: nama, email, nomor telepon, dan jumlah tagihan.
              Lihat kebijakan privasi Xendit di{' '}
              <a href="https://www.xendit.co/id/kebijakan-privasi/" target="_blank" rel="noopener noreferrer">
                xendit.co/id/kebijakan-privasi
              </a>.
            </li>
            <li>
              <strong>Kementerian Ketenagakerjaan RI</strong> — laporan riksa uji
              dan sertifikat kelaikan operasi diterbitkan dan dilaporkan kepada Kemnaker RI
              sesuai kewajiban regulasi sebagai perusahaan PJK3.
            </li>
            <li>
              <strong>Otoritas hukum</strong> — jika diwajibkan oleh perintah pengadilan
              atau peraturan perundang-undangan yang berlaku.
            </li>
          </ul>

          <h2>4. Penyimpanan dan Retensi Data</h2>
          <ul>
            <li>
              Data klien riksa uji disimpan selama <strong>5 tahun</strong> sejak tanggal inspeksi,
              sesuai dengan ketentuan dokumentasi K3 berdasarkan regulasi Kemnaker RI.
            </li>
            <li>
              Data pendaftaran kursus disimpan selama <strong>3 tahun</strong> sejak tanggal kursus.
            </li>
            <li>
              Data teknis (log server) dihapus secara otomatis setelah <strong>90 hari</strong>.
            </li>
          </ul>
          <p>
            Data disimpan di server yang berlokasi di Indonesia dan dilindungi dengan enkripsi
            standar industri.
          </p>

          <h2>5. Hak Anda atas Data Pribadi</h2>
          <p>Sesuai UU PDP, Anda memiliki hak untuk:</p>
          <ul>
            <li><strong>Akses</strong> — meminta salinan data pribadi yang kami simpan</li>
            <li><strong>Koreksi</strong> — meminta perbaikan data yang tidak akurat</li>
            <li><strong>Penghapusan</strong> — meminta penghapusan data (sepanjang tidak bertentangan dengan kewajiban hukum kami)</li>
            <li><strong>Pembatasan</strong> — meminta pembatasan pemrosesan data dalam kondisi tertentu</li>
          </ul>
          <p>
            Untuk mengajukan permintaan, kirimkan email ke{' '}
            <a href="mailto:marketing@deltanusa.co.id">marketing@deltanusa.co.id</a>{' '}
            dengan subjek “Permintaan Data Pribadi”. Kami akan merespons dalam <strong>14 hari kerja</strong>.
          </p>

          <h2>6. Keamanan Data</h2>
          <p>
            Kami menerapkan langkah-langkah teknis dan organisasi yang wajar untuk melindungi data Anda,
            termasuk enkripsi HTTPS/TLS pada seluruh halaman website, pembatasan akses database,
            dan audit keamanan berkala. Namun, tidak ada sistem yang 100% aman — jika terjadi
            pelanggaran keamanan yang berdampak pada data Anda, kami akan memberitahu Anda dalam
            waktu 14 hari sesuai ketentuan UU PDP.
          </p>

          <h2>7. Cookie</h2>
          <p>
            Website ini menggunakan cookie sesi teknis yang diperlukan agar website berfungsi dengan benar.
            Kami tidak menggunakan cookie pelacakan pihak ketiga (seperti Google Analytics atau Meta Pixel)
            saat ini. Jika di masa mendatang kami menggunakan layanan analitik, kebijakan ini akan diperbarui.
          </p>

          <h2>8. Perubahan Kebijakan Ini</h2>
          <p>
            Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Perubahan material
            akan diberitahukan melalui email atau pemberitahuan di website minimal 14 hari sebelum
            berlaku. Tanggal “Terakhir diperbarui” di bagian atas halaman ini mencerminkan versi
            terbaru.
          </p>

          <h2>9. Hubungi Kami</h2>
          <p>
            Jika Anda memiliki pertanyaan mengenai kebijakan privasi ini atau cara kami mengelola
            data Anda, silakan hubungi:
          </p>
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
