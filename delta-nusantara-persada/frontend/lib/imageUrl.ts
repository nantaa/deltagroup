/**
 * Generates an absolute or safe relative URL for backend post images.
 */
export function getPostImageUrl(imagePath?: string | null): string | null {
  if (!imagePath) return null
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }
  const cleanPath = imagePath.replace(/^\/+/, '')
  const apiBase = (process.env.NEXT_PUBLIC_API_URL || 'https://api.deltanusa.co.id/api').replace(/\/api\/?$/, '')
  return `${apiBase}/storage/${cleanPath}`
}
