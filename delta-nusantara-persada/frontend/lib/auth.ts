import api from '@/lib/api'

export const ADMIN_TOKEN_KEY = 'delta_admin_token'
export const ADMIN_USER_KEY  = 'delta_admin_user'

export interface AuthResponse {
  user: {
    id: number
    name: string
    email: string
  }
  access_token: string
  token_type: string
}

export async function login(
  emailOrUsername: string,
  password: string
): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await api.post<AuthResponse>('/auth/login', {
      email: emailOrUsername.trim(),
      password,
    })

    if (res.data?.access_token) {
      if (typeof window !== 'undefined') {
        localStorage.setItem(ADMIN_TOKEN_KEY, res.data.access_token)
        localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(res.data.user))
      }
      return { success: true }
    }
    return { success: false, message: 'Token tidak valid dari server' }
  } catch (err: unknown) {
    let message = 'Email atau password salah'
    if (typeof err === 'object' && err !== null && 'response' in err) {
      const resp = (err as { response?: { data?: { message?: string; errors?: Record<string, string[]> } } }).response
      if (resp?.data?.message) {
        message = resp.data.message
      } else if (resp?.data?.errors?.email?.[0]) {
        message = resp.data.errors.email[0]
      }
    }
    return { success: false, message }
  }
}

export async function logout(): Promise<void> {
  try {
    await api.post('/auth/logout')
  } catch {
    // Ignore network error on logout
  } finally {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(ADMIN_TOKEN_KEY)
      localStorage.removeItem(ADMIN_USER_KEY)
    }
  }
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  const token = localStorage.getItem(ADMIN_TOKEN_KEY)
  return Boolean(token && token.length > 10)
}
