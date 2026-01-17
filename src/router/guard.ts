import type { Router } from 'vue-router'
import { AuthService } from '@/services/auth.service'
import { ErrorHandler } from '@/lib/error.handler'

export function RouterGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const isAuth = AuthService.isAuthenticated()

    if (to.meta.requiresAuth && !isAuth) {
      return next("/auth/login")
    }

    if (to.meta.guest && isAuth) {
      return next('/')
    }

    next()
  })

  router.onError((error) => {
    ErrorHandler.handle(error)
  })
}
