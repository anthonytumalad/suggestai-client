import { useMutation, useQueryClient, useQuery } from "@tanstack/vue-query"
import { AuthService } from "@/services/auth.service"
import type { AuthResponse, LoginCredentials, User } from "@/types/auth.types"
import { useRouter } from "vue-router"

const USER_QUERY_KEY = ['user']

export function UseAuth() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const setUser = (user: User | null) => queryClient.setQueryData(USER_QUERY_KEY, user)

  const clearUser = () => queryClient.setQueryData(USER_QUERY_KEY, null)

  const login = useMutation({
    mutationKey: ["login"],
    mutationFn: (data: LoginCredentials) => AuthService.authenticate(data),
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
    mutationFn: () => AuthService.destroy(),
    onSuccess: async () => {
      clearUser()
      await router.push("/auth/login")
    },
  })

  const logoutAll = useMutation({
    mutationKey: ["logoutAll"],
    mutationFn: () => AuthService.destroyAll(),
    onSuccess: async () => {
      clearUser()
      await router.push("/auth/login")
    },
  })

  const useUserQuery = () =>
    useQuery<User | null, Error>({
      queryKey: USER_QUERY_KEY,
      queryFn: () => AuthService.user(),
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      enabled: AuthService.isAuthenticated(),
      retry: false,
    })

  return {
    login,
    logout,
    logoutAll,
    useUserQuery
  }
}
