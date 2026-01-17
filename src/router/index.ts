import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { RouterGuard } from './guard'
import { appRoutes } from './app.routes'
import { authRoutes } from './auth.routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...authRoutes,
    ...appRoutes,
  ]
})

router.afterEach((to) => {
  document.title = (to.meta.title as string) || "SuggestAI"
})

RouterGuard(router)

export default router
