import type { RouteRecordRaw } from "vue-router"
import AppLayout from "@/layouts/AppLayout.vue"

export const appRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '',
        redirect: { name: 'dashboard' }
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/ViewDashboard.vue'),
        meta: {
          title: 'Dashboard',
        }
      }
    ],
    meta: {
      requiresAuth: true,
    }
  }
]
