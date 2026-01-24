export interface User{
  id: number
  name: string
  username: string
  email: string
  email_verified_at: string | null
  created_at: string
  updated_at: string
}

export interface AuthResponse{
  message: string
  user: User
  token: string
}

export interface LoginCredentials{
  identity: string
  password: string
}

export interface AuthState{
  user: User | null
  token: string | null
  isAuthenticated: boolean
  initialized: | boolean
}

export interface ApiError {
  message?: string
  errors?: Record<string, string[]>
}
