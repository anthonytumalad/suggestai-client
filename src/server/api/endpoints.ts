export const API_ENDPOINTS = {
  AUTH: {
    AUTHENTICATE: '/auth/authenticate',
    DESTROY: '/auth/destroy',
    DESTROY_ALL: '/auth/destroy_all',
    USER: '/auth/user'
  },
  FORMS: {
    INDEX: '/forms',
    ACTIVE: '/forms/active',
    STORE: '/forms',
    UPDATE: (id: string | number) => `/forms/${id}`,
    DESTROY: (id: string | number) => `/forms/${id}`,
    RESTORE: (id: string | number) => `/forms/${id}/restore`
  }
}
