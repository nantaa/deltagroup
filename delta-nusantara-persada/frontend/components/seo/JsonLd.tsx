/**
 * Generic JSON-LD injector — renders a <script type="application/ld+json"> tag.
 * Pass any valid Schema.org object via the `data` prop.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data, null, 0) }}
    />
  )
}
