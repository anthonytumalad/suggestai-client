import type { Router } from 'vue-router'
import { authService } from '@/server/services/authService'
import { errorHandler } from '@/lib/errorHandler'

export function routerGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    let isAuth = false
    const token = authService.getToken()

    if (token) {
      try {
        const user = await authService.user()
        isAuth = !!user
      } catch {
        authService.destroy()
        isAuth = false
      }
    }

    if (to.meta.requiresAuth && !isAuth) {
      return next('/auth/login')
    }

    if (to.meta.guest && isAuth) {
      return next('/')
    }

    next()
  })

  router.onError((error) => {
    errorHandler.handle(error)
  })
}
