// Simple client-side auth helpers (no backend required yet)
// Replace credentials check with API call when backend is ready.

export const ADMIN_TOKEN_KEY = 'delta_admin_token'
const VALID_TOKEN = 'delta-admin-2025'

export function login(username: string, password: string): boolean {
  // TODO: Replace with API call: POST /api/admin/login
  if (username === 'admin' && password === 'delta2025') {
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
