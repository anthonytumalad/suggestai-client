export interface User {
  id: number
  name: string
  username: string
  email: string
  email_verified_at: string | null
  created_at: string
  updated_at: string
}

export interface AuthResponse {
  message: string
  user: User
  token: string
}

export interface PaginationMeta {
  current_page: number
  per_page: number
  last_page: number
  total: number
  from?: number
  to?: number
}

export interface LoginCredentials {
  identity: string
  password: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  initialized: | boolean
}

export interface ApiError {
  message?: string
  errors?: Record<string, string[]>
}

export interface Form {
  id: number
  title: string
  slug: string
  description?: string | null
  img_path?: string | null
  is_active: boolean
  created_at: string
  updated_at: string
  suggestions_count?: number
}

export interface FormListItem {
  id: number
  title: string
  suggestions_count: number
  is_active: boolean
}

export interface FormListResponse {
  data: Form[]
  meta: PaginationMeta | undefined
}

export interface FormCreatePayload {
  title: string
  slug?: string
  description?: string
  img?: File | null
  is_active?: boolean
}

export interface FormUpdatePayload {
  title?: string
  slug?: string
  description?: string
  img?: File | null
  is_active?: boolean
}
