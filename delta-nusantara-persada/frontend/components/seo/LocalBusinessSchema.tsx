import JsonLd from './JsonLd'

// ASSUMPTIONS (fill in before going live):
// - lat/lng: Suncity Square Bekasi approx coordinates
// - openingHours: Mon–Sat 08:00–17:00 (confirmed by user)
// - foundingDate: 2006 (PT entity, from COMPANY.md)
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://deltanusa.co.id'

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#localbusiness`,
  name: 'PT Delta Nusantara Persada',
  alternateName: 'Delta Nusantara Persada',
  description:
    'Perusahaan Jasa Keselamatan dan Kesehatan Kerja (PJK3) bidang Riksa Uji yang ditunjuk resmi Kemnaker RI. Melayani pemeriksaan dan pengujian K3 di seluruh Indonesia.',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/images/LOGO-DNP-Primary (1).png`,
  },
  image: `${SITE_URL}/images/og-dnp.png`,
  telephone: '+622188869010',
  email: 'marketing@deltanusa.co.id',
  foundingDate: '2006',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Suncity Square Blok H-20, Jl. M. Hasibuan',
    addressLocality: 'Margajaya, Bekasi',
    addressRegion: 'Jawa Barat',
    postalCode: '17113',           // TODO: confirm Bekasi postal code
    addressCountry: 'ID',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -6.2383,             // TODO: replace with exact lat/lng
    longitude: 106.9919,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '17:00',
    },
  ],
  areaServed: {
    '@type': 'Country',
    name: 'Indonesia',
  },
  serviceType: [
    'Riksa Uji Pesawat Angkat dan Angkut',
    'Riksa Uji Pesawat Uap dan Bejana Tekan',
    'Riksa Uji Elevator dan Eskalator',
    'Riksa Uji Instalasi Proteksi Kebakaran',
    'Riksa Uji Instalasi Listrik dan Penyalur Petir',
    'Riksa Uji Pesawat Tenaga dan Produksi',
  ],
  sameAs: [
    'https://www.instagram.com/deltaindonesia/',
    'https://www.facebook.com/deltaindonesiagroup',
    'https://deltanusa.co.id',
  ],
  hasMap: 'https://maps.google.com/?q=Suncity+Square+Blok+H-20+Bekasi',
}

export default function LocalBusinessSchema() {
  return <JsonLd data={localBusiness} />
}
