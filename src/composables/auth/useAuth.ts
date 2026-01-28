import { useMutation, useQueryClient } from "@tanstack/vue-query"
import { authService } from "@/server/services/authService"
import { queryKeys } from "@/lib/queryKeys"
import { createSingletonQuery } from "../_queryHelpers"
import type { LoginCredentials, User } from "@/types/types"
import { useRouter } from "vue-router"

export function useAuth() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const setUser = (user: User | null) => queryClient.setQueryData(queryKeys.user.base, user)
  const clearUser = () => setUser(null)

  const goHome = () => router.push('/')
  const goToLogin = () => router.push('/auth/login')

  const login = useMutation({
    mutationKey: ['auth', 'login'],
    mutationFn: (credentials: LoginCredentials) => authService.authenticate(credentials),
    onSuccess: (data) => {
      setUser(data.user ?? null)
      goHome()
    },
    onError: (err) => console.error('Login failed:', err),
  })

  const logout = useMutation({
    mutationKey: ['auth', 'logout'],
    mutationFn: () => authService.destroy(),
    onSuccess: () => {
      clearUser()
      queryClient.clear()
      goToLogin()
    },
    onError: (err) => console.error('Logout failed:', err),
  })

  const logoutAll = useMutation({
    mutationKey: ['auth', 'logout-all'],
    mutationFn: () => authService.destroyAll(),
    onSuccess: () => {
      clearUser()
      queryClient.clear()
      goToLogin()
    },
  })

  const useCurrentUser = () => createSingletonQuery<User | null, Error>(
    queryKeys.user.base,
    () => authService.user(),
    authService.isAuthenticated,
    {
      staleTime: 10 * 60 * 1000,
      retry: 1,
    }
  )

  return {
    login,
    logout,
    logoutAll,
    useCurrentUser,
  }
}
