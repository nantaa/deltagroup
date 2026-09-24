// Admin auth helpers.
// Credentials are read from environment variables — never hardcode them here.
// Set NEXT_PUBLIC_ADMIN_USER and NEXT_PUBLIC_ADMIN_PASS in .env.local (not committed to git).
// TODO: Replace with a real backend API call (POST /api/admin/login) when backend is ready.

export const ADMIN_TOKEN_KEY = 'delta_admin_token'
const VALID_TOKEN = 'delta-admin-2025'

export function login(username: string, password: string): boolean {
  const validUser = process.env.NEXT_PUBLIC_ADMIN_USER ?? ''
  const validPass = process.env.NEXT_PUBLIC_ADMIN_PASS ?? ''

  if (!validUser || !validPass) {
    console.error('[auth] NEXT_PUBLIC_ADMIN_USER or NEXT_PUBLIC_ADMIN_PASS is not set.')
    return false
  }

  if (username === validUser && password === validPass) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(ADMIN_TOKEN_KEY, VALID_TOKEN)
    }
    return true
  }
  return false
}

export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(ADMIN_TOKEN_KEY)
  }
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(ADMIN_TOKEN_KEY) === VALID_TOKEN
}
