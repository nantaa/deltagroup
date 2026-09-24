import JsonLd from './JsonLd'

interface Crumb {
  label: string
  href?: string
}

interface BreadcrumbSchemaProps {
  crumbs: Crumb[]
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://deltanusa.co.id'

/**
 * Renders a BreadcrumbList JSON-LD schema from the same `crumbs` array
 * used by the visual Breadcrumb UI component. Inject alongside <Breadcrumb />.
 */
export default function BreadcrumbSchema({ crumbs }: BreadcrumbSchemaProps) {
  const allCrumbs = [{ label: 'Beranda', href: '/' }, ...crumbs]

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allCrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.label,
      item: crumb.href ? `${SITE_URL}${crumb.href}` : undefined,
    })),
  }

  return <JsonLd data={schema} />
}
