import { useMutation, useQueryClient, useQuery } from "@tanstack/vue-query"
import { authService } from "@/server/services/authService"
import type { LoginCredentials, User } from "@/types/types"
import { useRouter } from "vue-router"

const USER_QUERY_KEY = ['user']

export function useAuth() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const setUser = (user: User | null) => queryClient.setQueryData(USER_QUERY_KEY, user)

  const clearUser = () => queryClient.setQueryData(USER_QUERY_KEY, null)

  const login = useMutation({
    mutationKey: ["login"],
    mutationFn: (data: LoginCredentials) => authService.authenticate(data),
    onSuccess: async (data) => {
      setUser(data.user ?? null)
      await router.push("/")
    },
    onError: (err) => {
      console.error("Login failed", err)
    },
  })

  const logout = useMutation({
    mutationKey: ["logout"],
    mutationFn: () => authService.destroy(),
    onSuccess: async () => {
      clearUser()
      await router.push("/auth/login")
    },
  })

  const logoutAll = useMutation({
    mutationKey: ["logoutAll"],
    mutationFn: () => authService.destroyAll(),
    onSuccess: async () => {
      clearUser()
      await router.push("/auth/login")
    },
  })

  const useUserQuery = () =>
    useQuery<User | null, Error>({
      queryKey: USER_QUERY_KEY,
      queryFn: () => authService.user(),
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      enabled: authService.isAuthenticated(),
      retry: false,
    })

  return {
    login,
    logout,
    logoutAll,
    useUserQuery
  }
}
