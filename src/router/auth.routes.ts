import type { RouteRecordRaw } from "vue-router"

export const authRoutes: RouteRecordRaw[] = [
  {
    path: '/auth/login',
    name: 'login',
    component: () => import('@/views/auth/ViewLogin.vue'),
    meta: {
      title: "Login",
      guest: true,
    }
  }
]
