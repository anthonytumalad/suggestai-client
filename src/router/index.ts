import { createRouter, createWebHistory } from 'vue-router'
import { routerGuard } from './guard'
import ViewLogin from '@/pages/ViewLogin.vue'
import ViewDashboard from '@/pages/ViewDashboard.vue'
import ViewFormList from '@/pages/forms/ViewFormList.vue'
import ViewFormSummary from '@/pages/forms/ViewFormSummary.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/AppLayout.vue'),
      children: [
        {
          path: '',
          redirect: { name: 'dashboard' }
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: ViewDashboard,

        },
        {
          path: 'forms',
          name: 'forms',
          redirect: '/forms/list',
          component: () => import('@/layouts/FormLayout.vue'),
          children: [
            {
              path: 'list',
              name: 'forms-list',
              component: ViewFormList
            },
            {
              path: 'summary',
              name: 'forms-summary',
              component: ViewFormSummary,
            }
          ]

        }
      ],
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/auth/login',
      name: 'login',
      component: ViewLogin,
      meta: {
        title: 'Login',
        guest: true,
      }
    },
  ],
})

routerGuard(router)

export default router
