export interface Post {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  image?: string
  status: 'published' | 'draft'
  tags: string[]
  category: string
  created_at: string
  updated_at: string
}

export interface Brand {
  id: number
  name: string
  slug?: string
  logo?: string
  description?: string
  website?: string
}

export interface Client {
  id: number
  name: string
  logo?: string
}

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

export interface HeroSlide {
  id: number
  title: string
  subtitle: string
  image: string
  stats?: { value: string; label: string }[]
}
