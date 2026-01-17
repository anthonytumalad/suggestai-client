import type { RouteRecordRaw } from "vue-router"

export const appRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('@/views/ViewDashboard.vue'),
    meta: {
      title: 'Dashboard',
      requiresAuth: true,
    }
  }
]
