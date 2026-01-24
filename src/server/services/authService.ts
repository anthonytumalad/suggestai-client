import api from "../api"
import type { AuthResponse, LoginCredentials, User } from "@/types/types"
import { setToken, removeToken, getToken } from "@/utils/userStorage"
import { API_ENDPOINTS } from "../api/endpoints"

export class authService {
  static async authenticate(data: LoginCredentials): Promise<AuthResponse> {
    const { data: response } = await api.post<AuthResponse>(API_ENDPOINTS.AUTH.AUTHENTICATE, data)

    if (!response.token){
      throw new Error("No token returned from server")
    }

    setToken(response.token)
    return response
  }

  static async destroy(): Promise<void> {
    await api.post(API_ENDPOINTS.AUTH.DESTROY)
    removeToken()
  }

  static async destroyAll(): Promise<void> {
    await api.post(API_ENDPOINTS.AUTH.DESTROY_ALL)
    removeToken()
  }

  static async user(): Promise<User | null> {
    const token = getToken()
    if (!token) return null

    const { data } = await api.post<User>(API_ENDPOINTS.AUTH.USER, {}, { headers: { Authorization: `Bearer ${token}` } } )
    return data
  }

  static getToken(): string | null {
    return getToken()
  }

  static isAuthenticated(): boolean {
    return !!getToken()
  }
}
